import { TestBed } from "@angular/core/testing";

import { PhdProjectsResolver } from "./phd-projects.resolver";

describe("PhdProjectsResolver", () => {
    let resolver: PhdProjectsResolver;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        resolver = TestBed.inject(PhdProjectsResolver);
    });

    it("should be created", () => {
        expect(resolver).toBeTruthy();
    });
});
