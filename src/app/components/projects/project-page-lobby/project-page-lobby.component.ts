import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { backendRoutes } from 'src/assets/backend-routes';

@Component({
  selector: 'app-project-page-lobby',
  templateUrl: './project-page-lobby.component.html',
  styleUrls: ['./project-page-lobby.component.css']
})
export class ProjectPageLobbyComponent implements AfterViewInit, OnInit {
    protected projects: {pictureUrl: string,  id: string; name: string}[] = [];
    protected basePicsUrls = `${backendRoutes.baseUrl}/${backendRoutes.globokarOliverosImgBaseUrl}/`

    protected columns = 0

    protected f0 = {pictureUrl: "", id: "", name: ""};
    protected f1 = {pictureUrl: "", id: "", name: ""};
    protected f2 = {pictureUrl: "", id: "", name: ""};
    protected f3 = {pictureUrl: "", id: "", name: ""};
    protected f4 = {pictureUrl: "", id: "", name: ""};
    protected f5 = {pictureUrl: "", id: "", name: ""};
    protected f6 = {pictureUrl: "", id: "", name: ""};
    protected f7 = {pictureUrl: "", id: "", name: ""};
    protected f8 = {pictureUrl: "", id: "", name: ""};
    protected f9 = {pictureUrl: "", id: "", name: ""};
    protected f10 = {pictureUrl: "", id: "", name: ""};
    protected f11 = {pictureUrl: "", id: "", name: ""};
    protected f12 = {pictureUrl: "", id: "", name: ""};
    protected f13 = {pictureUrl: "", id: "", name: ""};
    protected f14 = {pictureUrl: "", id: "", name: ""};

    constructor(private readonly route: ActivatedRoute) {}

    public ngOnInit(): void {
        this.onResize();

        this.route.data.subscribe(data => {
            this.projects = data["lobbyProjects"];
            this.projects = this.shuffle(this.projects);
            this.f0 = this.projects[0]
            this.f1 = this.projects[1]
            this.f2 = this.projects[2]
            this.f3 = this.projects[3]
            this.f4 = this.projects[4]
            this.f5 = this.projects[5]
            this.f6 = this.projects[6]
            this.f7 = this.projects[7]
            this.f8 = this.projects[8]
            this.f9 = this.projects[9]
            this.f10 = this.projects[10]
            this.f11 = this.projects[11]
            this.f12 = this.projects[12]
            this.f13 = this.projects[13]
            this.f14 = this.projects[14]
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

    @HostListener("window:resize", ["$event"])
    onResize() {
        const width = window.innerWidth;
        if (width < 576) {
            this.columns = 1;
        } else if (width < 992) {
            this.columns = 3;
        } else {
            this.columns = 5;
        }
    }

    private shuffle<T>(array: T[]): T[] {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}
