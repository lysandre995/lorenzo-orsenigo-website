import { Component, OnInit } from '@angular/core';
import { EventsService } from "../../services/events.service";
import { EventInteface } from "../../interfaces/event.inteface";
import { EventParsedInterface } from "../../interfaces/event-parsed.interface";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  public currentEvents: EventParsedInterface[] = [];
  public pastEvents: EventParsedInterface[] = [];
  public offset = 0;
  public ongoing = true;

  constructor(private readonly eventsService: EventsService) {}

  async ngOnInit() {
    await this.eventsService.loadEventsSummaryAndSetFirstPastEventIndex();
    this.currentEvents = (await this.eventsService.getCurrentEvents()).sort((a, b) => {
      return a.date.getTime() - b .date.getTime()
    });
    this.pastEvents = await this.eventsService.getPastEvents(this.offset);
  }

  public toggleOngoing() {
    this.ongoing = !this.ongoing;
  }

  public async getMorePastEvents() {
    const pastEvents = await this.eventsService.getPastEvents(++this.offset);
    if (pastEvents.length === 0) {
      this.offset--;
    }
  }
}
