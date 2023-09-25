import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  public title = 'lorenzo-orsenigo-website';
  public isHomePage = false;

  constructor(private readonly  router: Router) {
  }

  public ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof  NavigationEnd) {
        this.isHomePage = this.router.url === '/';
      }
    });
  }
}
