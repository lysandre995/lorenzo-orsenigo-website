import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {ContactsComponent} from "./components/contacts/contacts.component";
import {EventsComponent} from "./components/events/events.component";
import {ProjectsComponent} from "./components/projects/projects.component";
import {BioComponent} from "./components/bio/bio.component";
import {SoloProjectsComponent} from "./components/projects/solo-projects/solo-projects.component";
import {DuoProjectsComponent} from "./components/projects/duo-projects/duo-projects.component";
import {PhdProjectsComponent} from "./components/projects/phd-projects/phd-projects.component";
import { BioResolver } from './components/bio/bio.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'bio', component: BioComponent, pathMatch: 'full', resolve: { contentData: BioResolver }},
  { path: 'projects', component: ProjectsComponent, pathMatch: 'full'},
  { path: 'contacts', component: ContactsComponent, pathMatch: 'full'},
  { path: 'events', component: EventsComponent, pathMatch: 'full'},
  {path: 'projects/solo', component: SoloProjectsComponent, pathMatch: 'full'},
  {path: 'projects/duo', component: DuoProjectsComponent, pathMatch: 'full'},
  {path: 'projects/phd', component: PhdProjectsComponent, pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
