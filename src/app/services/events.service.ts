import { Injectable } from '@angular/core';
import axios from "axios";
import { EventSummaryInterface } from "../interfaces/event-summary.interface";
import { EventInteface } from "../interfaces/event.inteface";
import { EventParsedInterface } from "../interfaces/event-parsed.interface";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private eventsSummary: EventSummaryInterface[] = [];
  constructor() { }

  private async getEventsSummary(): Promise<void> {
    this.eventsSummary = (await axios.get('https://raw.githubusercontent.com/lorenzoorsenigo/lorenzo-orsenigo-website-data/main/events-summary.json')).data;
  }

  public async getLatestEvents(offset: number): Promise<EventParsedInterface[]>{
    await this.getEventsSummary();
    const latestEvents: EventParsedInterface[] = [];
    const sortedEventReferences = this.eventsSummary.sort((a, b) => {
      if (a > b) {
        return -1;
      } else if (a < b) {
        return 1;
      }
      return 0;
    });
    const slicedEventReferences = sortedEventReferences.slice(offset, offset + 10);

    let currentEventFileId = slicedEventReferences[0].fileId;
    let currentEventsData: EventInteface[] = (
      await axios.get(`https://raw.githubusercontent.com/lorenzoorsenigo/lorenzo-orsenigo-website-data/main/events-${currentEventFileId}.json`)
    ).data;
    for (const eventReference of slicedEventReferences) {
      if (eventReference.fileId !== currentEventFileId) {
        currentEventFileId = eventReference.fileId;
        currentEventsData = (
          await axios.get(`https://raw.githubusercontent.com/lorenzoorsenigo/lorenzo-orsenigo-website-data/main/events-${eventReference.fileId}.json`)
        ).data;
      }
      const currentEvent = currentEventsData.filter((event) => event.id === eventReference.eventId)[0];
      const currentParsedEvent: EventParsedInterface = {
        id: currentEvent.id,
        name: currentEvent.name,
        date: new Date(currentEvent.date),
        location: currentEvent.location,
        eventUrl: currentEvent.eventUrl,
        description: currentEvent.description,
        coverUrl: currentEvent.coverUrl,
      }
      latestEvents.push(currentParsedEvent);
    }
    return latestEvents;
  }
}
