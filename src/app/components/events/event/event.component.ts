import { Component } from '@angular/core';
import { faTicket } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  public faTicket = faTicket;
}
