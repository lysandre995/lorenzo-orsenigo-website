import { Component, OnInit } from "@angular/core";
import { HomeService } from "src/app/services/home.service";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
    protected imageUrl = "";
    protected imgLoaded = false;

    constructor(private readonly homeService: HomeService) {}

    public ngOnInit() {
        this.imageUrl =
            "https://raw.githubusercontent.com/lorenzoorsenigo/lorenzo-orsenigo-website-data/main/img/cover.jpeg";

        this.homeService.loadImage(this.imageUrl).subscribe({
            next: () => {
                this.imgLoaded = true;
            },
            error: err => {
                console.error(err);
            }
        });
    }
}
