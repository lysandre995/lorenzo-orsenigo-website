import { AfterViewInit, Component, HostListener, OnInit } from "@angular/core";
import { ProjectCategoryDto } from "../../dtos/project-category.dto";
import { OmniService } from "src/app/services/omni.service";

@Component({
    selector: "app-projects",
    templateUrl: "./projects.component.html",
    styleUrls: ["./projects.component.css"],
    standalone: false
})
export class ProjectsComponent implements OnInit, AfterViewInit {
    public isLoading = false;
    public categories: ProjectCategoryDto[] = [];

    constructor(private readonly omniService: OmniService) {}

    public async ngOnInit(): Promise<void> {
        this.isLoading = true;
        this.categories = await this.omniService.getProjectCategoriesWithImages();
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
