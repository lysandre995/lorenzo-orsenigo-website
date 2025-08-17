import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "app-dialog",
    templateUrl: "./dialog.component.html",
    styleUrls: ["./dialog.component.css"]
})
export class DialogComponent {
    @Output() closeDialog = new EventEmitter();
    @Input()
    public content: string = "";

    public close() {
        this.closeDialog.emit();
    }
}
