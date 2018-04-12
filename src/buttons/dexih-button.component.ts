import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'dexih-button',
    templateUrl: 'dexih-button.component.html'
})

export class DexihButtonComponent implements OnInit {
    @Input() buttonClass = 'btn-default';
    @Input() iconClass;
    @Input() title;
    @Input() routerLink;
    @Input() queryParams;
    @Input() disabled = false;
    @Input() busy = false;
    @Input() text = '';
    @Input() compact = false;
    @Input() autoCompact = true;

    @Output() click = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    doClick() {
        this.click.emit(true);
    }
}
