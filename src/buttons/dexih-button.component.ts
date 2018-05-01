import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'dexih-button',
    templateUrl: 'dexih-button.component.html'
})

export class DexihButtonComponent implements OnInit {
    @Input() buttonClass = 'btn btn-primary';
    @Input() iconClass: string;
    @Input() title: string;
    @Input() routerLink: string;
    @Input() queryParams: string;
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
