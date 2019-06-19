import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DexihButtonComponent} from './dexih-button.component';
@Component({
    selector: 'dexih-button-cancel',
    template: "<a [class.disabled]=\"disabled ? true : null\" [routerLink]=\"routerLink\" [queryParamsHandling]=\"queryParamsHandling\" class=\"btn\" [ngClass]=\"[buttonClass]\" [title]=\"title ? title : text\"> <i *ngIf=\"busy\" class=\"fa fa-spin fa-spinner\"></i> <i [class]=\"iconClass\"></i> <span *ngIf=\"!compact\" [ngClass]=\"[autoCompact && iconClass ? 'd-none d-md-inline' : '']\"> {{text}} <ng-content></ng-content> <span *ngIf=\"badge\" class=\"badge \" [ngClass]=\"[badgeClass]\">{{badge}}</span> </span> </a>"
})

export class DexihButtonCancelComponent extends DexihButtonComponent {
    @Input() title = 'Cancel the current form';
    iconClass = 'fa fa-ban';
    buttonClass = 'btn-warning';
    text = 'Cancel';
}
