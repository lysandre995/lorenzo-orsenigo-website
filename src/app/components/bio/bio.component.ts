import { AfterViewInit, Component, OnInit } from "@angular/core";
import { OmniService } from "src/app/services/omni.service";

@Component({
    selector: "app-bio",
    templateUrl: "./bio.component.html",
    styleUrls: ["./bio.component.css"],
    standalone: false
})
export class BioComponent implements OnInit, AfterViewInit {
    protected title = "";
    protected paragraphs: string[] = [];
    protected pictureUrl = "";
    protected isLoading = false;

    constructor(private readonly omniService: OmniService) {}

    public async ngOnInit() {
        this.isLoading = true;
        const data = await this.omniService.getBio();
        this.title = data?.title ?? "";
        this.pictureUrl = data?.picture ?? "";

        // Split text into paragraphs for better formatting
        const text = data?.text ?? "";
        this.paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);

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
