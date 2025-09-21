import { Injectable } from "@angular/core";
import { EventsSummaryDto } from "../dtos/events-summary.dto";
import axios from "axios";
import { backendRoutes } from "../../assets/backend-routes";
import { EventDto } from "../dtos/event.dto";

@Injectable({
    providedIn: "root"
})
export class EventService {
    private eventSummary: EventsSummaryDto[] = [];

    public async getUpComingEvents(): Promise<EventDto[]> {
        if (this.eventSummary.length === 0) {
            await this.getEventsSummary();
        }
        const upComingEventsSummary = this.getUpComingEventsSummary();
        return this.getEvents(upComingEventsSummary);
    }

    public async getPastEvents(page: number, pageSize: number): Promise<EventDto[]> {
        if (this.eventSummary.length === 0) {
            await this.getEventsSummary();
        }
        const pastEventsSummary = this.getPastEventsSummary(page, pageSize);
        return this.getEvents(pastEventsSummary);
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
}
