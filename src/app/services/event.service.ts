import { Injectable } from "@angular/core";
import { EventsSummaryDto } from "../dtos/events-summary.dto";
import { EventDto } from "../dtos/event.dto";
import eventsSummaryData from "../../assets/data/events-summary.json";
import eventsData from "../../assets/data/events-0.json";

@Injectable({
    providedIn: "root"
})
export class EventService {
    private eventSummary: EventsSummaryDto[] = eventsSummaryData as EventsSummaryDto[];
    private eventsContent: EventDto[] = eventsData as EventDto[];

    public async getUpComingEvents(): Promise<EventDto[]> {
        const upComingEventsSummary = this.getUpComingEventsSummary();
        return this.getEvents(upComingEventsSummary);
    }

    public async getPastEvents(page: number, pageSize: number): Promise<EventDto[]> {
        const pastEventsSummary = this.getPastEventsSummary(page, pageSize);
        return this.getEvents(pastEventsSummary);
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
}
