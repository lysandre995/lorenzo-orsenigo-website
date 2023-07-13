import { ProjectCategoryInterface } from "./project-category.interface";
import { ProjectOverviewInterface } from "./project-overview.interface";

export interface ProjectSummaryInterface {
  categories: ProjectCategoryInterface[];
  projects: ProjectOverviewInterface[];
}
