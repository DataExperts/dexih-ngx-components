import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'dexih-widget-group',
    templateUrl: './dexih-widget-group.component.html'
})
export class DexihWidgetGroupComponent implements OnInit {
    @Input() public title: string;

    constructor() {
    }

    ngOnInit() {
    }



}


