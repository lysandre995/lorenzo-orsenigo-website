import { Injectable } from "@angular/core";
import { backendRoutes } from "src/assets/backend-routes";

@Injectable({
    providedIn: "root"
})
export class PhdProjectsService {
    constructor() {}

    async getPhdProjects() {
        const response = await fetch(`${backendRoutes.baseUrl}/${backendRoutes.phdProjects}`);

        let result;
        if (response.ok) {
            result = response.json();
            return result;
        }
    }
}
