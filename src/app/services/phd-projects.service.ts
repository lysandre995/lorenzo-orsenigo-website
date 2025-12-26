import { Injectable } from "@angular/core";
import phdProjectsData from "src/assets/data/phd-projects.json";

@Injectable({
    providedIn: "root"
})
export class PhdProjectsService {
    private phdProjects: any = null;

    constructor() {}

    async getPhdProjects() {
        return phdProjectsData;
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
