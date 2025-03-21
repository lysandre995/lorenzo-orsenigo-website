import { AfterViewInit, Component, OnInit } from "@angular/core";
import { EventDto } from "../../dtos/event.dto";
import { EventService } from "../../services/event.service";
import { constants } from "../../constants";
declare var bootstrap: any;

@Component({
    selector: "app-events",
    templateUrl: "./events.component.html",
    styleUrls: ["./events.component.css"]
})
export class EventsComponent implements OnInit, AfterViewInit {
    public upcoming: EventDto[] = [];
    public past: EventDto[] = [];
    protected modalDescription: string = "";
    private page = 0;
    private readonly pageSize: number;

    constructor(private readonly eventService: EventService) {
        this.pageSize = constants.pastEventsPageSize;
    }

    public async ngOnInit() {
        this.upcoming = await this.eventService.getUpComingEvents();
        this.past = await this.eventService.getPastEvents(this.page, this.pageSize);
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

    public async morePastEvents() {
        this.past = [...this.past, ...(await this.eventService.getPastEvents(++this.page, this.pageSize))];
    }

    protected openModal(description: string): void {
        this.modalDescription = description;
        const modal = new bootstrap.Modal(document.getElementById("eventModal")!);
        modal.show();
    }
}
