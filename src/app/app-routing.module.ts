import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { ContactsComponent } from "./components/contacts/contacts.component";
import { EventsComponent } from "./components/events/events.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { BioComponent } from "./components/bio/bio.component";
import { SoloProjectsComponent } from "./components/projects/solo-projects/solo-projects.component";
import { DuoProjectsComponent } from "./components/projects/duo-projects/duo-projects.component";
import { PhdProjectsComponent } from "./components/projects/phd-projects/phd-projects.component";
import { BioResolver } from "./components/bio/bio.resolver";
import { ProjectPageLobbyComponent } from "./components/projects/project-page-lobby/project-page-lobby.component";
import { ProjectPageComponent } from "./components/projects/project-page/project-page.component";
import { PhdProjectsResolver } from "./components/projects/phd-projects/phd-projects.resolver";
import { ProjectsResolver } from "./components/projects/projects.resolver";
import { ProjectPageLobbyResolver } from "./components/projects/project-page-lobby/project-page-lobby.resolver";

const routes: Routes = [
    { path: "", component: HomeComponent, pathMatch: "full" },
    { path: "bio", component: BioComponent, pathMatch: "full", resolve: { contentData: BioResolver } },
    { path: "projects", component: ProjectsComponent, pathMatch: "full", resolve: {categories: ProjectsResolver} },
    { path: "contacts", component: ContactsComponent, pathMatch: "full" },
    { path: "events", component: EventsComponent, pathMatch: "full" },
    { path: "projects/solo", component: SoloProjectsComponent, pathMatch: "full" },
    { path: "projects/duo", component: DuoProjectsComponent, pathMatch: "full" },
    { path: "projects/research", component: PhdProjectsComponent, pathMatch: "full", resolve: {projects: PhdProjectsResolver} },
    { path: "projects/research/globokar-oliveros", component: ProjectPageLobbyComponent, pathMatch: "full", resolve: {lobbyProjects: ProjectPageLobbyResolver} },
    { path: "projects/research/globokar-oliveros/:subproject", component: ProjectPageComponent, pathMatch: "full" },
    { path: "**", component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
