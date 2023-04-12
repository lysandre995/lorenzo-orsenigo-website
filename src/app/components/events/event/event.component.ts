import { Component, Input, OnInit } from '@angular/core';
import { EventInteface } from "../../../interfaces/event.inteface";
import { EventParsedInterface } from "../../../interfaces/event-parsed.interface";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  @Input()
  public event: EventParsedInterface = {
    id: 0,
    name: '',
    date: new Date(),
    location: '',
    eventUrl: '',
    description: '',
    coverUrl: ''
  };
}
