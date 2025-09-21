import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DuoProjectsComponent } from "./duo-projects.component";

describe("DuoProjectsComponent", () => {
    let component: DuoProjectsComponent;
    let fixture: ComponentFixture<DuoProjectsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DuoProjectsComponent]
        });
        fixture = TestBed.createComponent(DuoProjectsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
