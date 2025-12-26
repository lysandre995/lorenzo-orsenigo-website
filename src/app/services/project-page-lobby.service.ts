import { Injectable } from "@angular/core";
import lobbyProjectsData from "src/assets/data/globokar-oliveros-projects-0.json";

@Injectable({
    providedIn: "root"
})
export class ProjectPageLobbyService {
    private lobbyProjects: any[] = lobbyProjectsData as any[];

    constructor() {}

    public async getLobbyProjects() {
        return this.lobbyProjects;
    }

    public async getStoredLobbyProjects() {
        return this.lobbyProjects;
    }

    public async getStoredLobbyProjectsWithImages() {
        this.lobbyProjects = await this.getStoredLobbyProjects();
        await Promise.all(this.lobbyProjects.map((p: any) => this.preloadImage(p.pictureUrl)));
        return this.lobbyProjects;
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
