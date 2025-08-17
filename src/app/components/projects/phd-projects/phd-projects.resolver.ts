import { Injectable } from "@angular/core";
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { from, Observable, of, switchMap } from "rxjs";
import { PhdProjectsService } from "src/app/services/phd-projects.service";

@Injectable({
    providedIn: "root"
})
export class PhdProjectsResolver implements Resolve<any> {
    constructor(private readonly phdProjectsService: PhdProjectsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return from(this.phdProjectsService.getPhdProjects()).pipe(
            switchMap((projects: any) => {
                return this.loadImages(projects).pipe(
                    switchMap(() => {
                        return of(projects);
                    })
                );
            })
        );
    }

    private loadImages(projects: any[]): Observable<void> {
        const imageLoadPromises = projects.map(project => this.loadImage(project.pictureUrl));
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
