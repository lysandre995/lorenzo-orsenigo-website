import { Injectable } from '@angular/core';
import {Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { from, Observable, of, switchMap } from 'rxjs';
import { ProjectPageLobbyService } from 'src/app/services/project-page-lobby.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectPageLobbyResolver implements Resolve<any> {


    constructor(private readonly projectPageLobbyService: ProjectPageLobbyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return from(this.projectPageLobbyService.getLobbyProjects()).pipe(
            switchMap((categories: any[])=> {
                return this.loadImages(categories).pipe(
                    switchMap(() => {
                        return of(categories);
                    })
                );
            })
        );
    }

    private loadImages(categories: any[]): Observable<void[]> {
        return from(Promise.all(categories.map(category => this.loadImage(category.pictureUrl))));
    }

    private loadImage(url: string): Promise<void> {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve();
            img.onerror = () => resolve();
        });
    }
}
