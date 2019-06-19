import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({selector: 'dexih-button-splitdropdown',
    template: "<div dropdown class=\"btn-group\"> <button type=\"button\" (click)=\"onClick($event)\" [disabled]=\"disabled\" [ngClass]=\"['btn', 'btn-primary', buttonClass]\" [title]=\"title\"> <i *ngIf=\"busy\" class=\"fa fa-spin fa-cog\"></i> <i [class]=\"iconClass\"></i> <span class=\"d-none d-md-inline\"> &nbsp;{{text}} </span> <span *ngIf=\"badge\" class=\"badge\" [ngClass]=\"[badgeClass]\">{{badge}}</span> </button>   <button type=\"button\" dropdownToggle [disabled]=\"disabled\" [ngClass]=\"['btn', 'btn-primary', 'dropdown-toggle', buttonClass]\" title=\"Options\"> <i *ngIf=\"busy\" class=\"fa fa-spin fa-cog\"></i> </button> <ul *dropdownMenu class=\"dropdown-menu\" [class.dropdown-menu-right]=\"pullRight\" > <ng-content></ng-content> </ul> </div> ",
    styles: ["/* This is workaround due to he dropdown-menu-right not working due to issue:  https://github.com/valor-software/ngx-bootstrap/issues/4226 */ .dropdown-menu-right { right: 0 !important; left: auto !important; } .dropdown-menu li:hover { cursor: pointer; } "]
})

export class DexihButtonSplitDropDownComponent implements OnInit {
    @Input() buttonClass = 'btn-default';
    @Input() iconClass: string;
    @Input() title: string;
    @Input() routerLink: string;
    @Input() queryParams: string;
    @Input() disabled = false;
    @Input() busy = false;
    @Input() text = '';
    @Input() pullRight = false;
    @Input() badge: string;
    @Input() badgeClass = '';
    @Output() buttonClick = new EventEmitter<any>();

    constructor() { }

    ngOnInit() { }

    onClick($event: any) {
        this.buttonClick.emit($event);
    }
}
