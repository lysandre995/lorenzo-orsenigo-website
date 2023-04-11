import { Component } from '@angular/core';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  public faCameraRetro = faCameraRetro;
  public faUser = faUser;
  public faCirclePlay = faCirclePlay;
  public faBook = faBook;
}
