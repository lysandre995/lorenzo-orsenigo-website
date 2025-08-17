import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SoloProjectsComponent } from "./solo-projects.component";

describe("SoloProjectsComponent", () => {
    let component: SoloProjectsComponent;
    let fixture: ComponentFixture<SoloProjectsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SoloProjectsComponent]
        });
        fixture = TestBed.createComponent(SoloProjectsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
