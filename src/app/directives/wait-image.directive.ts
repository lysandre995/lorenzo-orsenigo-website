import { Directive, ElementRef, HostListener } from "@angular/core";
import { LoaderService } from "../services/loader.service";

@Directive({
    selector: "[appWaitImage]"
})
export class WaitImageDirective {
    constructor(
        private el: ElementRef,
        private loader: LoaderService
    ) {}

    @HostListener("load")
    onLoad() {
        this.loader.resolve();
    }

    @HostListener("error")
    onError() {
        this.loader.resolve();
    }

    ngOnInit() {
        if (this.el.nativeElement.complete) {
            this.loader.resolve();
        } else {
            this.loader.register();
        }
    }
}
