import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @Input()
  public date: string = "";
  @Input()
  public location: string = "";
  @Input()
  public link: string = "";
  @Input()
  public title: string = "";
  @Input()
  public description: string = "";
  @Input()
  public pictureUrl: string = "";

  public time = "";

  public isDialogOpen = false

  public ngOnInit() {
    const dateObject = new Date(this.date);
    this.date = this.getTwoDigitsString(dateObject.getDate()) + "-" + this.getTwoDigitsString(dateObject.getMonth() + 1) + "-" + dateObject.getFullYear();
    this.time = this.getTwoDigitsString(dateObject.getHours()) + ":" + this.getTwoDigitsString(dateObject.getMinutes());
  }

  private getTwoDigitsString(n: number): string {
    return n > 9 ? n.toString() : "0" + n.toString();
  }

  public openDialog() {
    document.body.classList.add("dialog-opened");
    this.isDialogOpen = true;
  }

  public closeDialog() {
    document.body.classList.remove("dialog-opened");
    this.isDialogOpen = false;
  }
}
