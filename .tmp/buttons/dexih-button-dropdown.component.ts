import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { BsDropdownDirective } from 'ngx-bootstrap';

@Component({
    selector: 'dexih-button-dropdown',
    template: "<div class=\"btn-group\" dropdown #dropdown=\"bs-dropdown\" [autoClose]=\"autoClose\" [isOpen]=\"isOpen\" (isOpenChange)=\"openChange($event)\" placement=\"bottom right\"> <button dropdownToggle type=\"button\"  [disabled]=\"disabled\" class=\"btn {{buttonClass}}\" [ngClass]=\"{'dropdown-toggle': !hideCarrot}\" [title]=\"title\"> <i *ngIf=\"busy\" class=\"fa fa-spin fa-cog\"></i> <i [class]=\"iconClass\"></i> <span *ngIf=\"!compact\" [ngClass]=\"[autoCompact && iconClass ? 'd-none d-md-inline' : '']\"> &nbsp;{{text}}         </span> <span *ngIf=\"badge\" class=\"badge\" [ngClass]=\"[badgeClass]\">{{badge}}</span> </button> <ul *dropdownMenu class=\"p-0 dropdown-menu\" [ngClass]=\"{'dropdown-menu-right': pullRight}\"> <ng-content></ng-content> </ul> </div> ",
    styles: ["/* This is workaround due to he dropdown-menu-right not working due to issue:  https://github.com/valor-software/ngx-bootstrap/issues/4226 */ .dropdown-menu-right { right: 0 !important; left: auto !important; } .dropdown-menu li:hover { cursor: pointer; } "]
})
export class DexihButtonDropDownComponent {
    @Input() buttonClass = 'btn btn-primary';
    @Input() iconClass: string;
    @Input() title: string;
    @Input() disabled = false;
    @Input() busy = false;
    @Input() text = '';
    @Input() pullRight = false;
    @Input() badge: string;
    @Input() badgeClass = '';
    @Input() hideCarrot = false;
    @Input() compact = false;
    @Input() autoCompact = true;
    @Input() autoClose = true;
    @Input() isOpen = false;

    @Output() isOpenChange = new EventEmitter<any>();

    @ViewChild('dropdown', { static: true }) dropdown: BsDropdownDirective;

    constructor() { }

    public showDropdown() {
        this.dropdown.show();
    }

    public hideDropdown() {
        this.dropdown.hide();
    }

    public openChange($event: any) {
        this.isOpenChange.emit($event);
    }
}
