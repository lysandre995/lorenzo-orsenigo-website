import { Injectable } from "@angular/core";
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { from, map, Observable, of, switchMap } from "rxjs";
import { BioService } from "src/app/services/bio.service";
import { HomeService } from "src/app/services/home.service";

@Injectable({
    providedIn: "root"
})
export class BioResolver implements Resolve<any> {
    constructor(
        private readonly bioService: BioService,
        private readonly homeService: HomeService
    ) {}

    resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<any> {
        return from(this.bioService.getBio()).pipe(
            switchMap(data => {
                return this.homeService
                    .loadImage(data.picture)
                    .pipe(map(() => ({ title: data.title, text: data.text, picture: data.picture })));
            })
        );
    }
}
