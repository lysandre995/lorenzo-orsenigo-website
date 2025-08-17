import { TestBed } from "@angular/core/testing";

import { ProjectPageLobbyService } from "./project-page-lobby.service";

describe("ProjectPageLobbyService", () => {
    let service: ProjectPageLobbyService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ProjectPageLobbyService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
