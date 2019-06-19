import { Component, OnInit, Input, Output, ContentChild, TemplateRef, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'dexih-widget,div[dexihWidget]',
    template: "    <div class=\"card\" [@fadeInAnimation]='state'> <div [ngClass]=\"['card-header', headerClass]\" *ngIf=\"title || iconClass || headerTemplate || showFilter\"> <div class=\"d-flex flex-row p-0\"> <span> <i class=\"{{iconClass}}\"></i> <b>{{title}}</b> </span> <div class=\"d-flex ml-auto\"> <div *ngIf=\"headerTemplate\"> <ng-template [ngTemplateOutlet]=\"headerTemplate\"> </ng-template> </div> <div *ngIf=\"showFilter\" class=\" mr-3 ml-3\"> <div class=\"input-group\"> <span class=\"input-group-addon input-group-prepend\"> <span class=\"input-group-text\"> <i class=\"fa fa-search\"></i> </span> </span> <input [formControl]=\"filterControl\" type=\"text\" placeholder=\"Filter the items\"> </div> </div> <button *ngIf=\"showExpandButton\" type=\"button\" class=\"close ml-2\" (click)=\"isExpanded=!isExpanded\" aria-label=\"Expand\" [ngClass]=\"[headerClass]\"> <i *ngIf=\"!isExpanded\" class=\"fa fa-angle-double-down\" title=\"Expand\"></i> <i *ngIf=\"isExpanded\" class=\"fa fa-angle-double-up\" title=\"Collapse\"></i> </button> <button *ngIf=\"showCloseButton\" type=\"button\" class=\"close ml-2\" (click)=\"doClose()\" aria-label=\"Close\" [ngClass]=\"[headerClass]\"> <span aria-hidden=\"true\">&times;</span> </button> </div> </div> </div> <div [ngClass]=\"['card-header', subTitleClass]\" *ngIf=\"subTitleTemplate || subTitle || toolsTemplate\"> <div class=\"d-flex flex-row\"> <div class=\"card-subtitle\">{{subTitle}}</div> <ng-template [ngTemplateOutlet]=\"subTitleTemplate\"> </ng-template> <div class=\"d-flex ml-auto\"> <ng-template [ngTemplateOutlet]=\"toolsTemplate\"> </ng-template> </div> </div> </div> <div [ngClass]=\"['card-header', subHeaderClass]\" *ngIf=\"subHeaderTemplate\"> <ng-template [ngTemplateOutlet]=\"subHeaderTemplate\"> </ng-template> </div> <div *ngIf=\"isExpanded\" [@slideInOut]> <div [ngClass]=\"['card-body', bodyClass]\" [ngStyle]=\"{'padding': padding ? null : 0}\"> <div *ngIf=\"!showIf\"> <div class=\"table-loader-container\"> <div class=\"table-loader\"></div> <div name=\"dexih-data-loading\" class=\"table-loader-text\">{{loadingMessage}}</div> </div> </div> <div *ngIf=\"showIf\"> <ng-content></ng-content> </div> </div> </div> <div *ngIf=\"footerTemplate\" [ngClass]=\"['card-footer', footerClass]\"> <ng-template [ngTemplateOutlet]=\"footerTemplate\"> </ng-template> </div> </div> ",
    styles: [".table-loader-container { margin: 30px; } .table-loader { display: inline-flex; border: 16px solid #f3f3f3; border-radius: 50%; border-top: 16px solid #3498db; width: 40px; height: 40px; -webkit-animation: loader-spin 2s linear infinite; animation: loader-spin 2s linear infinite; } .table-loader-text { margin-left: 20px; display: inline-flex; text-align: center; font-size: 25px; font-weight: bold; } @-webkit-keyframes loader-spin { 0% { -webkit-transform: rotate(0deg); } 100% { -webkit-transform: rotate(360deg); } } @keyframes loader-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } "],
    animations: [
        // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('fadeInAnimation', [
        // route 'enter' transition
        transition(':enter', [
            // css styles at start of transition
            style({ opacity: 0 }),
            // animation and styles at end of transition
            animate('.3s', style({ opacity: 1 }))
        ]),
    ]),
    trigger('slideDown', [
        state('hide', style({ height: 0, overflow: 'hidden' })),
        state('show', style({ height: '*', overflow: 'unset' })),
        transition('hide <=> show', animate('200ms ease-in')),
    ]),
    trigger('slideInOut', [
        transition(':enter', [
          style({transform: 'translateY(-100%)'}),
          animate('200ms ease-in', style({transform: 'translateY(0%)'}))
        ]),
        transition(':leave', [
          animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
        ])
      ])
    ]
})
export class DexihWidgetComponent implements OnInit {
    @Input() public title: string;
    @Input() public subTitle: string;
    @Input() public iconClass: string;
    @Input() public headerClass = '';
    @Input() public subTitleClass = 'bg-light';
    @Input() public subHeaderClass = '';
    @Input() public bodyClass = '';
    @Input() public footerClass = '';
    @Input() public showIf = true;
    @Input() public loadingMessage = 'Loading...';
    @Input() public maxHeight: number;
    @Input() public showFilter = false;
    @Input() public showCloseButton = false;
    @Input() public padding = false;
    @Input() public showExpandButton = false;
    @Input() public isExpanded = true;

    @Output() public filterString = new EventEmitter<string>();

    @Output() close: EventEmitter<any> = new EventEmitter<any>();

    @ContentChild('tools', { static: true }) toolsTemplate: TemplateRef<any>;
    @ContentChild('header', { static: true }) headerTemplate: TemplateRef<any>;
    @ContentChild('subTitle', { static: true }) subTitleTemplate: TemplateRef<any>;
    @ContentChild('subHeader', { static: true }) subHeaderTemplate: TemplateRef<any>;
    @ContentChild('footer', { static: true }) footerTemplate: TemplateRef<any>;

    filterControl = new FormControl();

    public state = 'open';

    constructor() {
    }

    ngOnInit() {
        // monitor changes to the filter control, and update if updated after 500ms.
        this.filterControl.valueChanges
            .pipe(debounceTime(500))
            .subscribe(newValue => {
                this.filterString.emit(newValue);
            });
    }

    doClose() {
        this.close.emit();
    }
}
