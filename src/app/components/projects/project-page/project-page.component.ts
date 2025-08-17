import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { every } from "rxjs";
import { ProjectPageLobbyService } from "src/app/services/project-page-lobby.service";

@Component({
    selector: "app-project-page",
    templateUrl: "./project-page.component.html",
    styleUrls: ["./project-page.component.css"]
})
export class ProjectPageComponent implements OnInit, AfterViewInit {
    protected subproject?: string;
    protected project?: any;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly projectPageLobbyService: ProjectPageLobbyService
    ) {}

    public async ngOnInit(): Promise<void> {
        this.subproject = this.route.snapshot.paramMap.get("subproject") || "";
        if (this.subproject === "") {
            this.subproject = localStorage.getItem("subproject") || "";
        } else {
            localStorage.setItem("subproject", this.subproject);
        }

        const projects = await this.projectPageLobbyService.getStoredLobbyProjects();
        this.project = projects.filter((prj: any) => (prj as any).id === this.subproject)[0];
        console.log(this.project);
    }

    public ngAfterViewInit(): void {
        this.updateHeights();
    }

    private updateHeights(): void {
        const navbar = document.querySelector(".navbar") as HTMLElement;
        const footer = document.querySelector("footer") as HTMLElement;

        if (navbar && footer) {
            document.documentElement.style.setProperty("--navbar-height", `${navbar.offsetHeight}px`);
            document.documentElement.style.setProperty("--footer-height", `${footer.offsetHeight}px`);
        }
    }
}
