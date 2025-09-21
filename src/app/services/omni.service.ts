import { Injectable } from "@angular/core";
import { backendRoutes } from "../../assets/backend-routes";
import { BioDto } from "../dtos/bio.dto";
import { ProjectCategoryDto } from "../dtos/project-category.dto";
import { ProjectsSummaryDto } from "../dtos/projects-summary-dto";
import axios from "axios";
import { EventsSummaryDto } from "../dtos/events-summary.dto";
import { EventDto } from "../dtos/event.dto";

@Injectable({
    providedIn: "root"
})
export class OmniService {
    private bioData?: BioDto;
    private projectCategoriesData?: ProjectCategoryDto[];
    private projectsSummary: ProjectsSummaryDto = { categories: [], projectsSummaries: [] };
    private eventSummary: EventsSummaryDto[] = [];
    private phdProjects = null;
    private lobbyProjects = [];

    constructor() {}

    public async getBio(): Promise<BioDto | undefined> {
        if (!this.bioData) {
            this.bioData = (await axios.get(backendRoutes.baseUrl + "/" + backendRoutes.bio)).data;

            if (this.bioData?.picture) {
                await this.preloadImage(this.bioData?.picture);
            }
        }

        return this.bioData;
    }

    public async getProjectCategoriesWithImages(): Promise<ProjectCategoryDto[]> {
        if (this.projectCategoriesData) return this.projectCategoriesData;

        const categories = await this.getProjectCategories();
        await Promise.all(categories.map(cat => this.preloadImage(cat.pictureUrl)));
        this.projectCategoriesData = categories;
        return categories;
    }

    public async getUpComingEvents(): Promise<EventDto[]> {
        if (this.eventSummary.length === 0) {
            await this.getEventsSummary();
        }
        const upComingEventsSummary = this.getUpComingEventsSummary();
        const upComingEvents = await this.getEvents(upComingEventsSummary);
        await Promise.all(upComingEvents.map(e => this.preloadImage(e.coverUrl)));
        return upComingEvents;
    }

    public async getPastEvents(page: number, pageSize: number): Promise<EventDto[]> {
        if (this.eventSummary.length === 0) {
            await this.getEventsSummary();
        }
        const pastEventsSummary = this.getPastEventsSummary(page, pageSize);
        const pastEvents = await this.getEvents(pastEventsSummary);
        await Promise.all(pastEvents.map(e => this.preloadImage(e.coverUrl)));
        return pastEvents;
    }

    public async getPhdProjects() {
        const response = await fetch(`${backendRoutes.baseUrl}/${backendRoutes.phdProjects}`);

        let result;
        if (response.ok) {
            result = response.json();
            return result;
        }
    }

    public async getPhdProjectsWithImages() {
        if (this.phdProjects) {
            return this.phdProjects;
        }

        const projects = await this.getPhdProjects();
        await Promise.all(projects.map((p: any) => this.preloadImage(p.pictureUrl)));
        this.phdProjects = projects;
        return projects;
    }

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
            const cache = localStorage.getItem("lobby-projects-cache");
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

    private async getEventsSummary(): Promise<void> {
        this.eventSummary = (await axios.get(backendRoutes.baseUrl + "/" + backendRoutes.eventsSummary)).data;
    }

    private getUpComingEventsSummary(): EventsSummaryDto[] {
        return this.eventSummary
            .filter(event => event.date >= new Date().toISOString())
            .sort((a, b) => {
                if (a.date > b.date) {
                    return 1;
                } else if (a.date < b.date) {
                    return -1;
                }
                return 0;
            });
    }

    private getPastEventsSummary(page: number, pageSize: number): EventsSummaryDto[] {
        const start = pageSize * page;
        const end = start + pageSize;
        return this.eventSummary
            .filter(event => event.date < new Date().toISOString())
            .sort((a, b) => {
                if (a.date > b.date) {
                    return -1;
                } else if (a.date < b.date) {
                    return 1;
                }
                return 0;
            })
            .slice(start, end);
    }

    private async getEvents(eventsSummaryDto: EventsSummaryDto[]) {
        let events: EventDto[] = [];
        let previousFileId: number = -1;
        let currentFileId: number;
        let currentFileContent: EventDto[] = [];
        for (const eventSummaryDto of eventsSummaryDto) {
            currentFileId = eventSummaryDto.fileId;
            if (currentFileId != previousFileId) {
                previousFileId = currentFileId;
                currentFileContent = (
                    await axios.get(
                        backendRoutes.baseUrl + "/" + backendRoutes.event.replace("%d", currentFileId.toString())
                    )
                ).data;
            }
            events.push(currentFileContent.filter(event => event.id === eventSummaryDto.eventId)[0]);
        }
        return events;
    }

    private async getProjectCategories(): Promise<ProjectCategoryDto[]> {
        if (this.projectsSummary.projectsSummaries.length === 0) {
            this.projectsSummary = (await axios.get(backendRoutes.baseUrl + "/" + backendRoutes.projectsSummary)).data;
        }
        return this.projectsSummary.categories;
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
