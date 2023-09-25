import { Injectable } from '@angular/core';
import axios from "axios";
import {backendRoutes} from "../../assets/backend-routes";
import {ProjectsSummaryDto} from "../dtos/projects-summary-dto";
import {ProjectSummaryDto} from "../dtos/project-summary-dto";
import {ProjectCategoryDto} from "../dtos/project-category.dto";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  #projectsSummary: ProjectsSummaryDto = {categories: [], projectsSummaries: []};

  constructor() { }

  async getProjectsSummary(): Promise<ProjectSummaryDto[]> {
    if (this.#projectsSummary.categories.length === 0) {
      this.#projectsSummary = (await axios.get(backendRoutes.baseUrl + '/' + backendRoutes.projectsSummary)).data
    }
    return this.#projectsSummary.projectsSummaries
  }

  async getProjectCategories(): Promise<ProjectCategoryDto[]> {
    if (this.#projectsSummary.projectsSummaries.length === 0) {
      this.#projectsSummary = (await axios.get(backendRoutes.baseUrl + '/' + backendRoutes.projectsSummary)).data
    }
    return this.#projectsSummary.categories
  }
}
