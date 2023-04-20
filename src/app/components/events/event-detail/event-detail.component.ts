import { Component, OnInit } from '@angular/core';
import { EventsService } from "../../../services/events.service";
import { EventParsedInterface } from "../../../interfaces/event-parsed.interface";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  public event: EventParsedInterface = {
    id: -1,
    name: "",
    date: new Date(),
    location: "",
    eventUrl: "",
    description: "",
    coverUrl: "",
    active: false
  };

  constructor(private readonly eventsService: EventsService, private readonly route: ActivatedRoute) {}

  public async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.queryParamMap.get('id') ?? "-1";
    const active = this.route.snapshot.queryParamMap.get('active') === 'true';
    await this.eventsService.initEventsService();
    if (active) {
      this.event = await this.eventsService.getCurrentEventById(Number(id));
    } else {
      this.event = await this.eventsService.getPastEventById(Number(id));
    }
  }
}
