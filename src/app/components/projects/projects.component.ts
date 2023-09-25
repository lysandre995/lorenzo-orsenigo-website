import {Component, OnInit} from '@angular/core';
import {Routes} from "@angular/router";
import {SoloProjectsComponent} from "./solo-projects/solo-projects.component";
import {DuoProjectsComponent} from "./duo-projects/duo-projects.component";
import {PhdProjectsComponent} from "./phd-projects/phd-projects.component";
import {ProjectService} from "../../services/project.service";
import {ProjectCategoryDto} from "../../dtos/project-category.dto";
import {ProjectSummaryDto} from "../../dtos/project-summary-dto";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  public categories: ProjectCategoryDto[] = [];
  public projectsSummary: ProjectSummaryDto[] = [];

  constructor(private readonly projectService: ProjectService) {
  }

  public async ngOnInit(): Promise<void> {
    this.categories = await this.projectService.getProjectCategories();
    this.projectsSummary = await this.projectService.getProjectsSummary();
  }
}
