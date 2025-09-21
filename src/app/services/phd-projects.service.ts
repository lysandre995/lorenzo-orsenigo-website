import { Injectable } from "@angular/core";
import { backendRoutes } from "src/assets/backend-routes";

@Injectable({
    providedIn: "root"
})
export class PhdProjectsService {
    private phdProjects = null;

    constructor() {}

    async getPhdProjects() {
        const response = await fetch(`${backendRoutes.baseUrl}/${backendRoutes.phdProjects}`);

        let result;
        if (response.ok) {
            result = response.json();
            return result;
        }
    }

    async getPhdProjectsWithImages() {
        if (this.phdProjects) {
            return this.phdProjects;
        }

        const projects = await this.getPhdProjects();
        await Promise.all(projects.map((p: any) => this.preloadImage(p.pictureUrl)));
        this.phdProjects = projects;
        return projects;
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
