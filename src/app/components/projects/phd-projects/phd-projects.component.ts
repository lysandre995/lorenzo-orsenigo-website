import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PhdProjectsService } from "src/app/services/phd-projects.service";

@Component({
    selector: "app-phd-projects",
    templateUrl: "./phd-projects.component.html",
    styleUrls: ["./phd-projects.component.css"],
    standalone: false
})
export class PhdProjectsComponent implements AfterViewInit, OnInit {
    public isLoading = false;
    protected projects: any[] = [];

    constructor(private readonly service: PhdProjectsService) {}

    public async ngOnInit(): Promise<void> {
        // this.route.data.subscribe(data => {
        //     this.projects = data["projects"];
        // });
        this.isLoading = true;
        this.projects = await this.service.getPhdProjectsWithImages();
        this.isLoading = false;
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
