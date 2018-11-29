import { Component, forwardRef, Input, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedFunctions } from './shared-functions';

@Component({
    selector: 'form-input',
    templateUrl: './dexih-form-input.component.html',
    styleUrls: ['./dexih-form.component.scss'],
    providers: [
        { provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DexihFormInputComponent),
            multi: true
        },
    ]
})
export class DexihFormInputComponent implements ControlValueAccessor {
    @Input() label: string;
    @Input() labelLeft: string;
    @Input() note: string;
    @Input() placeholder: string;
    @Input() iconClass: string;
    @Input() errors: string;
    @Input() value: string;
    @Input() type = 'text';
    @Input() subLabel: string;
    @Input() maxlength: number;
    @Input() disabled = false;
    @Input() border = true;

    @Output() keydown: EventEmitter<any> = new EventEmitter<any>();

    isDirty = false;

    id = 'input_' + Math.random().toString(36).substr(2, 9);
    sharedFunctions = new SharedFunctions();

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

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    keydownEvent($event) {
        this.keydown.emit($event);
    }
}
