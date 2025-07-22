import { Injectable } from "@angular/core";
import axios from "axios";
import { backendRoutes } from "../../assets/backend-routes";
import { ProjectsSummaryDto } from "../dtos/projects-summary-dto";
import { ProjectSummaryDto } from "../dtos/project-summary-dto";
import { ProjectCategoryDto } from "../dtos/project-category.dto";

@Injectable({
    providedIn: "root"
})
export class ProjectService {
    #projectsSummary: ProjectsSummaryDto = { categories: [], projectsSummaries: [] };
    #categoriesWithImages: ProjectCategoryDto[] | null = null;

    constructor() {}

    async getProjectsSummary(): Promise<ProjectSummaryDto[]> {
        if (this.#projectsSummary.categories.length === 0) {
            this.#projectsSummary = (await axios.get(backendRoutes.baseUrl + "/" + backendRoutes.projectsSummary)).data;
        }
        return this.#projectsSummary.projectsSummaries;
    }

    async getProjectCategories(): Promise<ProjectCategoryDto[]> {
        if (this.#projectsSummary.projectsSummaries.length === 0) {
            this.#projectsSummary = (await axios.get(backendRoutes.baseUrl + "/" + backendRoutes.projectsSummary)).data;
        }
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
