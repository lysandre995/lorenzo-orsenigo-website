import { Injectable } from "@angular/core";
import { backendRoutes } from "src/assets/backend-routes";

@Injectable({
    providedIn: "root"
})
export class ProjectPageLobbyService {
    private lobbyProjects = [];

    constructor() {}

    public async getLobbyProjects() {
        const response = await fetch(`${backendRoutes.baseUrl}/${backendRoutes.projectPageLobby}`);

        let result;
        if (response.ok) {
            result = await response.json();
            localStorage.setItem("lobby-projects-cache", JSON.stringify(result));
            (this.lobbyProjects as any) = result;
            return result;
        }
    }

    public async getStoredLobbyProjects() {
        if (!this.lobbyProjects || this.lobbyProjects.length === 0) {
            const cache = localStorage.getItem("lobby-projects-cache")
            if (cache) {
                const prjs = JSON.parse(cache);
                (this.lobbyProjects as any) = prjs;
                return this.lobbyProjects;
            }
            return await this.getLobbyProjects();
        }
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
