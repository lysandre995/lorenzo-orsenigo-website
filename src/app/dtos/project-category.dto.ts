import {ProjectCategoryEnum} from "../enum/project-category.enum";

export interface ProjectCategoryDto {
  name: ProjectCategoryEnum;
  pictureUrl: string;
  path: string;
}
