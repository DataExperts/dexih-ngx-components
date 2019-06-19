import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'dexih-widget-group',
    template: "<div class=\"card-group\"> <ng-content></ng-content> </div>",
    styles: ["@media (max-width: 575.98px) { .card-group { column-count: 1; } } @media (min-width: 576px) and (max-width: 767.98px) { .card-group { column-count: 1; } } @media (min-width: 768px) and (max-width: 991.98px) { .card-group { column-count: 1; } } @media (min-width: 992px) and (max-width: 1199.98px) { .card-group { column-count: 2; } } @media (min-width: 1200px) { .card-group { column-count: 3; } } "]
})
export class DexihWidgetGroupComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }



}


