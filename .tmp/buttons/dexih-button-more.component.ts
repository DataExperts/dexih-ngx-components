import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DexihButtonDropDownComponent} from './dexih-button-dropdown.component';
@Component({
    selector: 'dexih-button-more',
    template: "<div class=\"btn-group\" dropdown #dropdown=\"bs-dropdown\" [autoClose]=\"autoClose\" [isOpen]=\"isOpen\" (isOpenChange)=\"openChange($event)\" placement=\"bottom right\"> <button dropdownToggle type=\"button\"  [disabled]=\"disabled\" class=\"btn {{buttonClass}}\" [ngClass]=\"{'dropdown-toggle': !hideCarrot}\" [title]=\"title\"> <i *ngIf=\"busy\" class=\"fa fa-spin fa-cog\"></i> <i [class]=\"iconClass\"></i> <span *ngIf=\"!compact\" [ngClass]=\"[autoCompact && iconClass ? 'd-none d-md-inline' : '']\"> &nbsp;{{text}}         </span> <span *ngIf=\"badge\" class=\"badge\" [ngClass]=\"[badgeClass]\">{{badge}}</span> </button> <ul *dropdownMenu class=\"p-0 dropdown-menu\" [ngClass]=\"{'dropdown-menu-right': pullRight}\"> <ng-content></ng-content> </ul> </div> "
})

export class DexihButtonMoreComponent extends DexihButtonDropDownComponent {
    @Input() title = 'More options';
    iconClass = 'fa fa-bars';
    buttonClass = 'btn-info';
    text = 'More';
}
