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
  public events: EventParsedInterface[] = [];
  public offset = 0;

  constructor(private readonly eventsService: EventsService) {}

  async ngOnInit() {
    this.events = await this.eventsService.getLatestEvents(this.offset);
  }
}
