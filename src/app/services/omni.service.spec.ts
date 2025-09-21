import { TestBed } from "@angular/core/testing";

import { OmniService } from "./omni.service";

describe("OmniService", () => {
    let service: OmniService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(OmniService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
