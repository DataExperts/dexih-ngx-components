import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'dexih-widget-deck, [dexihWidgetDeck]',
    template: "<div class=\"card-deck\"> <ng-content></ng-content> </div>",
    styles: [""]
})
export class DexihWidgetDeckComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }
}


