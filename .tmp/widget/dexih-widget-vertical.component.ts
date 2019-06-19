import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'dexih-widget-vertical',
    template: "<div class=\"widget-vertical\"> <ng-content></ng-content> </div>",
    styles: [":host ::ng-deep dexih-widget:not(:last-of-type) .card { margin-bottom: 10px; } "]
})
export class DexihWidgetVerticalComponent {
    constructor() {
    }
}


