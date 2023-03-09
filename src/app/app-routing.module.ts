import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BioComponent } from "./bio/bio.component";
import { MediaComponent } from "./media/media.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { EventsComponent } from "./events/events.component";
import { PhdComponent } from "./phd/phd.component";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'bio', component: BioComponent, pathMatch: 'full'},
  { path: 'media', component: MediaComponent, pathMatch: 'full'},
  { path: 'contacts', component: ContactsComponent, pathMatch: 'full'},
  { path: 'events', component: EventsComponent, pathMatch: 'full'},
  { path: 'phd', component: PhdComponent, pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
