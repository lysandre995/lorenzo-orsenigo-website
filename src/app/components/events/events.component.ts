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
  public offset: number | undefined;
  public ongoing: boolean | undefined;

  constructor(private readonly eventsService: EventsService) {}

  async ngOnInit() {
    this.offset = this.eventsService.currentOffset;
    this.ongoing = this.eventsService.isCurrentPageOngoing;
    await this.eventsService.initEventsService();
    this.currentEvents = (await this.eventsService.getCurrentEvents()).sort((a, b) => {
      return a.date.getTime() - b .date.getTime()
    });
    this.pastEvents = await this.eventsService.getPastEvents(this.offset);
  }

  public toggleOngoing() {
    this.ongoing = this.eventsService.toggleIsCurrentOngoing();
  }

  public async getMorePastEvents() {
    this.offset = this.eventsService.offsetAdd();
    const pastEvents = await this.eventsService.getPastEvents(this.offset);
    if (pastEvents.length === 0) {
      this.offset = this.eventsService.offsetRemove();
    }
  }
}
