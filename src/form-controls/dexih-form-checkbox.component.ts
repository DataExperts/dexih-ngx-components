import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'form-checkbox',
    templateUrl: './dexih-form-checkbox.component.html',
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DexihFormCheckboxComponent), multi: true }]
})
export class DexihFormCheckboxComponent implements ControlValueAccessor {
    @Input() label: string;
    @Input() note: string;
    @Input() errors: string;
    @Input() value: boolean;
    @Input() disabled = false;
    @Input() border = true;

    isDirty = false;
    id = 'input_' + Math.random().toString(36).substr(2, 9);

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor() { }

    hasChanged($event) {
        this.onChange(this.value);
        this.onTouched();
        this.isDirty = true;
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    writeValue(value) {
        this.value = value;
    }
}
