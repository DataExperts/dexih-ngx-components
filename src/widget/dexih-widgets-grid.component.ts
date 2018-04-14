import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'dexih-widgets-grid',
    templateUrl: './dexih-widgets-grid.component.html'
})
export class DexihWidgetsGridComponent implements OnInit {
    @Input() public title: string;

    constructor() {
    }

    ngOnInit() {
    }



}


