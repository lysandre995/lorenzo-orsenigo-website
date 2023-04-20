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
  public ongoing: boolean | undefined;

  constructor(private readonly eventsService: EventsService) {}

  async ngOnInit() {
    this.ongoing = this.eventsService.isCurrentPageOngoing;
    await this.eventsService.initEventsService();
    this.currentEvents = (await this.eventsService.getCurrentEvents()).sort((a, b) => {
      return a.date.getTime() - b .date.getTime()
    });
    this.pastEvents = await this.eventsService.getPastEvents();
  }

  public toggleOngoing() {
    this.ongoing = this.eventsService.toggleIsCurrentOngoing();
  }

  public async getMorePastEvents() {
    this.eventsService.offsetAdd();
    const pastEvents = await this.eventsService.getPastEvents();
    if (pastEvents.length === 0) {
      this.eventsService.offsetRemove();
    }
  }
}
