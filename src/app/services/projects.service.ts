import { Injectable } from '@angular/core';
import { ProjectSummaryInterface } from "../interfaces/project-summary.interface";
import axios from "axios";
import { constants } from "../constants";
import { ProjectCategoryInterface } from "../interfaces/project-category.interface";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectSummary: ProjectSummaryInterface = {
    categories: [],
    projects: []
  };
  constructor() { }

  public async initProjectService(): Promise<void> {
    await this.loadProjectSummary();
  }

  public async getCategories(): Promise<ProjectCategoryInterface[]> {
    return this.projectSummary.categories;
  }

  private async loadProjectSummary() {
    this.projectSummary = (await axios.get(`${constants.baseUrl}${constants.projectsSummaryFile}`)).data;
  }
}
