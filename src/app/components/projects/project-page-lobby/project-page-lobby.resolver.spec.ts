import { TestBed } from "@angular/core/testing";

import { ProjectPageLobbyResolver } from "./project-page-lobby.resolver";

describe("ProjectPageLobbyResolver", () => {
    let resolver: ProjectPageLobbyResolver;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        resolver = TestBed.inject(ProjectPageLobbyResolver);
    });

    it("should be created", () => {
        expect(resolver).toBeTruthy();
    });
});
