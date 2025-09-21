import { Injectable } from "@angular/core";
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { from, Observable, of, switchMap } from "rxjs";
import { ProjectCategoryDto } from "src/app/dtos/project-category.dto";
import { ProjectService } from "src/app/services/project.service";

@Injectable({
    providedIn: "root"
})
export class ProjectsResolver implements Resolve<any> {
    constructor(private readonly projectService: ProjectService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return from(this.projectService.getProjectCategories()).pipe(
            switchMap((categories: ProjectCategoryDto[]) => {
                return this.loadImages(categories).pipe(
                    switchMap(() => {
                        return of(categories);
                    })
                );
            })
        );
    }

    private loadImages(categories: ProjectCategoryDto[]): Observable<void> {
        const imageLoadPromises = categories.map(category => this.loadImage(category.pictureUrl));
        return new Observable(observer => {
            Promise.all(imageLoadPromises)
                .then(() => {
                    observer.next();
                    observer.complete();
                })
                .catch(() => {
                    observer.error("Error loading images");
                });
        });
    }

    private loadImage(url: string): Promise<void> {
        return new Promise(resolve => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve();
            img.onerror = () => resolve();
        });
    }
}
