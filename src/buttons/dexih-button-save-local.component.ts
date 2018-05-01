import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DexihButtonComponent} from './dexih-button.component';
@Component({
    moduleId: module.id,
    selector: 'dexih-button-save-local',
    templateUrl: './dexih-button.component.html'
})

export class DexihButtonSaveLocalComponent extends DexihButtonComponent {
    @Input() title = 'Export to a local save file.';
    iconClass = 'fa fa-floppy-o';
    buttonClass = 'btn-primary';
    text = 'Save Locally';
}
