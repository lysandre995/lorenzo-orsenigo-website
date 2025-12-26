import { Injectable } from "@angular/core";
import { BioDto } from "../dtos/bio.dto";
import { ProjectCategoryDto } from "../dtos/project-category.dto";
import { ProjectsSummaryDto } from "../dtos/projects-summary-dto";
import { EventsSummaryDto } from "../dtos/events-summary.dto";
import { EventDto } from "../dtos/event.dto";
import bioData from "../../assets/data/bio.json";
import projectsSummaryData from "../../assets/data/projects-summary.json";
import eventsSummaryData from "../../assets/data/events-summary.json";
import eventsData from "../../assets/data/events-0.json";
import phdProjectsData from "../../assets/data/phd-projects.json";
import lobbyProjectsData from "../../assets/data/globokar-oliveros-projects-0.json";

@Injectable({
    providedIn: "root"
})
export class OmniService {
    private bioDataCache?: BioDto;
    private projectCategoriesData?: ProjectCategoryDto[];
    private projectsSummary: ProjectsSummaryDto = projectsSummaryData as ProjectsSummaryDto;
    private eventSummary: EventsSummaryDto[] = eventsSummaryData as EventsSummaryDto[];
    private eventsContent: EventDto[] = eventsData as EventDto[];
    private phdProjects: any = null;
    private lobbyProjects: any[] = lobbyProjectsData as any[];

    constructor() {}

    public async getBio(): Promise<BioDto | undefined> {
        if (!this.bioDataCache) {
            this.bioDataCache = bioData as BioDto;

            if (this.bioDataCache?.picture) {
                await this.preloadImage(this.bioDataCache?.picture);
            }
        }

        return this.bioDataCache;
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
        return phdProjectsData;
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

    private async getEventsSummary(): Promise<void> {
        // Event summary is already loaded in the constructor
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
        const events: EventDto[] = [];
        for (const eventSummaryDto of eventsSummaryDto) {
            const event = this.eventsContent.find(e => e.id === eventSummaryDto.eventId);
            if (event) {
                events.push(event);
            }
        }
        return events;
    }

    private async getProjectCategories(): Promise<ProjectCategoryDto[]> {
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
