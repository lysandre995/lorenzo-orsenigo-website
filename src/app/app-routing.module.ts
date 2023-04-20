import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BioComponent } from "./components/bio/bio.component";
import { ContactsComponent } from "./components/contacts/contacts.component";
import { EventsComponent } from "./components/events/events.component";
import { HomeComponent } from "./components/home/home.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { EventDetailComponent } from './components/events/event-detail/event-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'bio', component: BioComponent, pathMatch: 'full'},
  { path: 'projects', component: ProjectsComponent, pathMatch: 'full'},
  { path: 'contacts', component: ContactsComponent, pathMatch: 'full'},
  { path: 'events', component: EventsComponent, pathMatch: 'full'},
  { path: 'events/event-details', component: EventDetailComponent, pathMatch: 'prefix'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
