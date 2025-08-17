import { ProjectSummaryDto } from "./project-summary-dto";
import { ProjectCategoryDto } from "./project-category.dto";

export interface ProjectsSummaryDto {
    categories: ProjectCategoryDto[];
    projectsSummaries: ProjectSummaryDto[];
}
