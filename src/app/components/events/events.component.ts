import {Component, OnInit} from '@angular/core';
import {EventDto} from "../../dtos/event.dto";
import {EventService} from "../../services/event.service";
import {constants} from "../../constants";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  public upcoming: EventDto[] = [];
  public past: EventDto[] = [];
  private page = 0;
  private readonly pageSize: number;

  constructor(private readonly eventService: EventService) {
    this.pageSize = constants.pastEventsPageSize;
  }

  public async ngOnInit() {
    this.upcoming = await this.eventService.getUpComingEvents();
    this.past = await this.eventService.getPastEvents(this.page, this.pageSize);
  }

  public async morePastEvents() {
    this.past = [...this.past, ...(await this.eventService.getPastEvents(++this.page, this.pageSize))];
  }
}


