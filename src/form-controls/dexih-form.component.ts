import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'dexih-form',
    templateUrl: 'dexih-form.component.html',
})
export class DexihFormComponent {
    @Input() formGroup: string;

    constructor() { }
}
