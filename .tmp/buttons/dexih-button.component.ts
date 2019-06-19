import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'dexih-button',
    template: "<a [class.disabled]=\"disabled ? true : null\" [routerLink]=\"routerLink\" [queryParamsHandling]=\"queryParamsHandling\" class=\"btn\" [ngClass]=\"[buttonClass]\" [title]=\"title ? title : text\"> <i *ngIf=\"busy\" class=\"fa fa-spin fa-spinner\"></i> <i [class]=\"iconClass\"></i> <span *ngIf=\"!compact\" [ngClass]=\"[autoCompact && iconClass ? 'd-none d-md-inline' : '']\"> {{text}} <ng-content></ng-content> <span *ngIf=\"badge\" class=\"badge \" [ngClass]=\"[badgeClass]\">{{badge}}</span> </span> </a>"
})

export class DexihButtonComponent implements OnInit {
    @Input() buttonClass = 'btn btn-primary';
    @Input() iconClass: string;
    @Input() title: string;
    @Input() routerLink: string;
    @Input() queryParamsHandling = 'merge';
    @Input() disabled = false;
    @Input() busy = false;
    @Input() text = '';
    @Input() compact = false;
    @Input() autoCompact = true;
    @Input() badge: string;
    @Input() badgeClass = '';

    @Output() click = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    doClick() {
        this.click.emit(true);
    }
}
