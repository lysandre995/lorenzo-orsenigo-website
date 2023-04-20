import { Component, Input, OnInit } from '@angular/core';
import { EventInteface } from "../../../interfaces/event.inteface";
import { EventParsedInterface } from "../../../interfaces/event-parsed.interface";
import { constants } from "../../../constants";
import { Params } from "@angular/router";

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
    coverUrl: '',
    active: true
  };

  get day(): string {
    return this.twoDigitsString(this.event.date.getDate());
  }

  get month(): string {
    return constants.months[this.event.date.getMonth()];
  }

  get hours(): string {
    return this.twoDigitsString(this.event.date.getHours());
  }
  get minutes(): string {
    return this.twoDigitsString(this.event.date.getMinutes());
  }

  public getEventDetailsParam(): Params {
    return {id: this.event.id, active: this.event.active};
  }

  private twoDigitsString(n: number) {
    if (Math.floor(n / 10) === 0) {
      return '0' + String(n);
    } else {
      return String(n);
    }
  }

  private justifyEventName() {
    return this.event.name.toLowerCase()
      .trim()
      .replaceAll(' ', '-')
  }
}
