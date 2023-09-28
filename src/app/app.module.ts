import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { BioComponent } from './components/bio/bio.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { EventsComponent } from './components/events/events.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SoloProjectsComponent } from './components/projects/solo-projects/solo-projects.component';
import { DuoProjectsComponent } from './components/projects/duo-projects/duo-projects.component';
import { PhdProjectsComponent } from './components/projects/phd-projects/phd-projects.component';
import { EventComponent } from './components/events/event/event.component';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    BioComponent,
    ProjectsComponent,
    ContactsComponent,
    EventsComponent,
    PageNotFoundComponent,
    SoloProjectsComponent,
    DuoProjectsComponent,
    PhdProjectsComponent,
    EventComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
