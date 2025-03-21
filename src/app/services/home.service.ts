import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class HomeService {
    constructor() {}

    public loadImage(url: string): Observable<any> {
        return new Observable(observer => {
            const img = new Image();
            img.src = url;

            img.onload = () => {
                observer.next(true);
                observer.complete();
            };

            img.onerror = error => {
                observer.error("Image not found");
            };
        });
    }
}
