import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-bio",
    templateUrl: "./bio.component.html",
    styleUrls: ["./bio.component.css"]
})
export class BioComponent implements OnInit, AfterViewInit {
    public title = "";
    public text = "";
    public pictureUrl = "";
    protected imageLoaded = false;
    protected textLoaded = false;

    constructor(private readonly route: ActivatedRoute) {}
    public ngOnInit() {
        const data = this.route.snapshot.data["contentData"];
        this.title = data.title;
        this.text = data.text;
        this.pictureUrl = data.picture;

        this.imageLoaded = true;
        this.textLoaded = true;
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
