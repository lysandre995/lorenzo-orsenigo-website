import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BioComponent } from "./bio/bio.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { EventsComponent } from "./events/events.component";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ProjectsComponent } from "./projects/projects.component";

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'bio', component: BioComponent, pathMatch: 'full'},
  { path: 'projects', component: ProjectsComponent, pathMatch: 'full'},
  { path: 'contacts', component: ContactsComponent, pathMatch: 'full'},
  { path: 'events', component: EventsComponent, pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
