import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router, withEnabledBlockingInitialNavigation } from "@angular/router";

@Component({
    selector: "app-nav-bar",
    templateUrl: "./nav-bar.component.html",
    styleUrls: ["./nav-bar.component.css"],
    standalone: false
})
export class NavBarComponent implements OnInit {
    public isHomePage = false;
    public isMobileMenuDisplayed = false;

    constructor(private readonly router: Router) {}

    public ngOnInit(): void {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.isHomePage = this.router.url === "/";
            }
        });
    }

    public openMobileMenu() {
        this.toggleMobileMenu();
    }

    protected closeMenu() {
        const navbar = document.getElementById("navbarNav");
        if (navbar) {
            navbar.classList.remove("show");
        }
    }

    private toggleMobileMenu() {
        this.isMobileMenuDisplayed = !this.isMobileMenuDisplayed;
    }
}
