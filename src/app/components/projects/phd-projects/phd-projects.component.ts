import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-phd-projects",
    templateUrl: "./phd-projects.component.html",
    styleUrls: ["./phd-projects.component.css"]
})
export class PhdProjectsComponent implements AfterViewInit, OnInit {
    protected projects: any[] = [];

    constructor(private readonly route: ActivatedRoute) {}

    public ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.projects = data["projects"];
        });
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
