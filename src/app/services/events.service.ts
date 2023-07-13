import { Injectable } from '@angular/core';
import axios from "axios";
import { EventSummaryInterface } from "../interfaces/event-summary.interface";
import { EventInteface } from "../interfaces/event.inteface";
import { EventParsedInterface } from "../interfaces/event-parsed.interface";
import { constants } from "../constants";

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private _isCurrentPageOngoing = true;
  private currentOffset = 0;
  private eventsSummary: EventSummaryInterface[] = [];
  private currentEvents: EventParsedInterface[] = [];
  private pastEvents: EventParsedInterface[] = [];
  private firstPastEventIndex = 0;

  constructor() {}

  public async initEventsService() {
    await this.loadEventsSummary();
    this.setFirstPastEventIndex();
  }

  public get isCurrentPageOngoing(): boolean {
    return this._isCurrentPageOngoing;
  }

  public offsetAdd(): void {
    this.currentOffset++;
  }

  public offsetRemove(): void {
    this.currentOffset--;
  }

  public toggleIsCurrentOngoing(): boolean {
    this._isCurrentPageOngoing = !this._isCurrentPageOngoing;
    return this._isCurrentPageOngoing;
  }

  public async getCurrentEvents(): Promise<EventParsedInterface[]> {
    if (this.currentEvents.length === 0) {
      await this.fillCurrentEvents();
    }
    return this.currentEvents;
  }

  public async getPastEvents(): Promise<EventParsedInterface[]> {
    if (this.pastEvents.length === 0) {
      await this.fillPastEvents(this.currentOffset);
    }
    return this.pastEvents;
  }

  public async getCurrentEventById(id: number): Promise<EventParsedInterface> {
    return this.currentEvents.filter(event => event.id === id)[0];
  }

  public async getPastEventById(id: number): Promise<EventParsedInterface> {
    return this.pastEvents.filter(event => event.id === id)[0];
  }

  private async fillCurrentEvents(): Promise<void>{
    const currentEvents: EventParsedInterface[] = [];
    const filteredEventReferences = this.eventsSummary.slice(0, this.firstPastEventIndex);

    let currentEventFileId = filteredEventReferences[0].fileId;
    let currentEventsData: EventInteface[] = (await axios.get(`${constants.baseUrl}events-${currentEventFileId}.json`)).data;
    for (const eventReference of filteredEventReferences) {
      if (eventReference.fileId !== currentEventFileId) {
        currentEventFileId = eventReference.fileId;
        currentEventsData = (await axios.get(`${constants.baseUrl}events-${eventReference.fileId}.json`)).data;
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
        active: true
      }
      currentEvents.push(currentParsedEvent);
    }
    this.currentEvents = currentEvents;
  }

  private async fillPastEvents(offset: number): Promise<void> {
    const pastEvents: EventParsedInterface[] = [];
    const startIndex = this.firstPastEventIndex + 10 * offset;
    const endIndex = startIndex + 10;
    const pastEventReferences= this.eventsSummary.slice(startIndex, endIndex);
    if (pastEventReferences.length > 0) {
      let currentEventFileId = pastEventReferences[0]?.fileId;
      let currentEventsData: EventInteface[] = (await axios.get(`${constants.baseUrl}events-${currentEventFileId}.json`)).data;
      for (const eventReference of pastEventReferences) {
        if (eventReference.fileId !== currentEventFileId) {
          currentEventFileId = eventReference.fileId;
          currentEventsData = (await axios.get(`${constants.baseUrl}/events-${eventReference.fileId}.json`)).data;
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
          active: false
        }
        pastEvents.push(currentParsedEvent);
      }
    }
    this.pastEvents = pastEvents;
  }

  private async loadEventsSummary(): Promise<void> {
    if (this.eventsSummary.length === 0) {
      this.eventsSummary = (await axios.get(`${constants.baseUrl}${constants.eventsSummaryFile}`)).data
        .sort((a: EventInteface, b: EventInteface) => (new Date(b.date)).getTime() - (new Date(a.date)).getTime());
    }
  }

  private setFirstPastEventIndex(): void {
    if (this.firstPastEventIndex === 0 && this.eventsSummary.length !== 0) {
      for (let index = 0; index < this.eventsSummary.length; index++) {
        if (new Date(this.eventsSummary[index].date).getTime() < new Date().getTime()) {
          this.firstPastEventIndex = index;
          break;
        } else {
          this.firstPastEventIndex = this.eventsSummary.length
        }
      }
    }
  }
}
