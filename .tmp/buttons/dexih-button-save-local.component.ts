import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DexihButtonComponent} from './dexih-button.component';
@Component({selector: 'dexih-button-save-local',
    template: "<a [class.disabled]=\"disabled ? true : null\" [routerLink]=\"routerLink\" [queryParamsHandling]=\"queryParamsHandling\" class=\"btn\" [ngClass]=\"[buttonClass]\" [title]=\"title ? title : text\"> <i *ngIf=\"busy\" class=\"fa fa-spin fa-spinner\"></i> <i [class]=\"iconClass\"></i> <span *ngIf=\"!compact\" [ngClass]=\"[autoCompact && iconClass ? 'd-none d-md-inline' : '']\"> {{text}} <ng-content></ng-content> <span *ngIf=\"badge\" class=\"badge \" [ngClass]=\"[badgeClass]\">{{badge}}</span> </span> </a>"
})

export class DexihButtonSaveLocalComponent extends DexihButtonComponent {
    @Input() title = 'Export to a local save file.';
    iconClass = 'fa fa-floppy-o';
    buttonClass = 'btn-primary';
    text = 'Save Locally';
}
