import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class LoaderService {
    private _pendingElements = 0;
    private _loading = new BehaviorSubject(true);
    readonly loading$ = this._loading.asObservable();

    public register(): void {
        this._pendingElements++;
        this._loading.next(true);
    }

    public resolve(): void {
        this._pendingElements--;
        if (this._pendingElements <= 0) {
            this._loading.next(false);
        }
    }
}
