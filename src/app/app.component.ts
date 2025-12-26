import { Component, OnInit } from "@angular/core";
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";
import { LoaderService } from "./services/loader.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
    standalone: false
})
export class AppComponent implements OnInit {
    public title = "lorenzo-orsenigo-website";
    public isHomePage = false;

    constructor(
        private readonly router: Router,
        readonly loader: LoaderService
    ) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) this.loader.register();
            if (
                event instanceof NavigationEnd ||
                event instanceof NavigationCancel ||
                event instanceof NavigationError
            ) {
                this.waitForImagesToLoad().then(() => this.loader.resolve());
            }
        });
    }

    public ngOnInit(): void {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.isHomePage = this.router.url === "/";
            }
        });
    }

    public async waitForImagesToLoad(): Promise<void> {
        const images = Array.from(document.images);
        const promises = images.map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => (img.onload = img.onerror = resolve));
        });
        await Promise.all(promises);
    }
}
