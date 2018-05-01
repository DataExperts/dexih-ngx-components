import { Component, OnInit, Input, Output, ContentChild, TemplateRef, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
    selector: 'dexih-widget',
    templateUrl: './dexih-widget.component.html',
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
    ])
    ]
})
export class DexihWidgetComponent implements OnInit {
    @Input() public title: string;
    @Input() public subtitle: string;
    @Input() public iconClass: string;
    @Input() public showIf: any = true;
    @Input() public loadMessage = 'Loading...';
    @Input() public maxHeight: number;
    @Input() public showFilter = false;
    @Input() public showCloseButton = false;
    @Input() public padding = false;

    @Output() public filterString = new EventEmitter<string>();

    @Output() close: EventEmitter<any> = new EventEmitter<any>();

    @ContentChild('tools') toolsTemplate: TemplateRef<any>;
    @ContentChild('header') headerTemplate: TemplateRef<any>;
    @ContentChild('subtitle') subtitleTemplate: TemplateRef<any>;
    @ContentChild('subheader') subheaderTemplate: TemplateRef<any>;
    @ContentChild('footer') footerTemplate: TemplateRef<any>;

    filterControl = new FormControl();
    filter: string;

    constructor() {
    }

    ngOnInit() {
        // monitor changes to the filter control, and update if updated after 500ms.
        this.filterControl.valueChanges
            .debounceTime(500)
            .subscribe(newValue => {
                this.filterString.emit(newValue);
            });
    }

    doClose() {
        this.close.emit();
    }
}
