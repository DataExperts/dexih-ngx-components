import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({selector: 'dexih-button-collapsible',
    template: "<div class=\"btn-group\"> <button type=\"button\" (click)=\"onClick($event)\" [disabled]=\"disabled\" [ngClass]=\"['btn', buttonClass]\" [title]=\"title\"> <i *ngIf=\"busy\" class=\"fa fa-spin fa-cog\"></i> <i [class]=\"iconClass\"></i> <span class=\"d-none d-md-inline\"> &nbsp;{{text}} </span> <span *ngIf=\"badge\" class=\"badge \" [ngClass]=\"[badgeClass]\">{{badge}}</span> </button>   <button type=\"button\" [disabled]=\"disabled\" [ngClass]=\"['btn', buttonClass]\" title=\"Toggle Expand\" (click)=\"isExpanded=!isExpanded\"> <i *ngIf=\"!isExpanded\" class=\"fa fa-angle-double-down\" title=\"Expand\" ></i> <i *ngIf=\"isExpanded\" class=\"fa fa-angle-double-up\" title=\"Collapse\"></i> </button> </div> <div class=\"mt-1\" [@slideDown]=\"isExpanded ? 'show' : 'hide'\"> <ng-content></ng-content> </div> ",
    animations: [
    trigger('slideDown', [
        state('hide', style({ height: 0, overflow: 'hidden' })),
        state('show', style({ height: '*', overflow: 'unset' })),
        transition('hide <=> show', animate('200ms ease-in')),
    ])
    ]
})

export class DexihButtonCollapsibleComponent implements OnInit {
    @Input() buttonClass = 'btn btn-primary';
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
    @Input() isExpanded = true;
    @Output() buttonClick = new EventEmitter<any>();


    constructor() { }

    ngOnInit() { }

    onClick($event: any) {
        this.buttonClick.emit($event);
    }
}
