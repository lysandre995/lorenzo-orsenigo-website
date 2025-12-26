import { Injectable } from "@angular/core";
import { ProjectsSummaryDto } from "../dtos/projects-summary-dto";
import { ProjectSummaryDto } from "../dtos/project-summary-dto";
import { ProjectCategoryDto } from "../dtos/project-category.dto";
import projectsSummaryData from "../../assets/data/projects-summary.json";

@Injectable({
    providedIn: "root"
})
export class ProjectService {
    #projectsSummary: ProjectsSummaryDto = projectsSummaryData as ProjectsSummaryDto;
    #categoriesWithImages: ProjectCategoryDto[] | null = null;

    constructor() {}

    async getProjectsSummary(): Promise<ProjectSummaryDto[]> {
        return this.#projectsSummary.projectsSummaries;
    }

    async getProjectCategories(): Promise<ProjectCategoryDto[]> {
        return this.#projectsSummary.categories;
    }

    async getProjectCategoriesWithImages(): Promise<ProjectCategoryDto[]> {
        if (this.#categoriesWithImages) return this.#categoriesWithImages;

        const categories = await this.getProjectCategories();
        await Promise.all(categories.map(cat => this.preloadImage(cat.pictureUrl)));
        this.#categoriesWithImages = categories;
        return categories;
    }

    private preloadImage(url: string): Promise<void> {
        return new Promise(resolve => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve();
            img.onerror = () => resolve(); // ignora errori di caricamento
        });
    }
}
