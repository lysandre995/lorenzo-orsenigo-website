import { ProjectCategoryEnum } from "../enum/project-category.enum";

export interface ProjectSummaryDto {
    projectId: number;
    category: ProjectCategoryEnum;
    fileId: number;
}
