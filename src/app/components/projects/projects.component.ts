import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "../../services/projects.service";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  public projectCategories: any = []

  constructor(private readonly projectService: ProjectsService) {}

  async ngOnInit() {
    await this.projectService.initProjectService()
    this.projectCategories = await this.projectService.getCategories();
  }
}
