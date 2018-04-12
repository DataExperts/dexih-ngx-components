import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'dexih-button-splitdropdown',
    templateUrl: 'dexih-button-splitdropdown.component.html'
})

export class DexihButtonSplitDropDownComponent implements OnInit {
    @Input() buttonClass = 'btn-default';
    @Input() iconClass;
    @Input() title;
    @Input() routerLink;
    @Input() queryParams;
    @Input() disabled = false;
    @Input() busy = false;
    @Input() text = '';
    @Input() pullRight = false;
    @Output() buttonClick = new EventEmitter<any>();

    constructor() { }

    ngOnInit() { }

    onClick($event) {
        this.buttonClick.emit($event);
    }
}
