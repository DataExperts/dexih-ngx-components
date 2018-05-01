import { Component, forwardRef, Input, EventEmitter, Output, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'form-tags',
    templateUrl: 'dexih-form-tags.component.html',
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DexihFormTagsComponent), multi: true },
    ]
})
export class DexihFormTagsComponent implements ControlValueAccessor {
    @Input() label: string;
    @Input() note: string;
    @Input() placeholder: string;
    @Input() iconClass: string;
    @Input() errors: string;
    @Input() value: string[] = [];
    @Input() type = 'text';
    @Input() subLabel: string;
    @Input() maxlength: number;
    @Input() border = true;
    @Input() disabled = false;

    isDirty = false;
    id = 'input_' + Math.random().toString(36).substr(2, 9);

    tag: string;

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
        // if (value) {
            this.value = value;
        // }
    }

    addTag() {
        if (this.tag) {
            const index = this.value.findIndex(c => c === this.tag);
            if (index === -1) {
                this.value.push(this.tag);
                this.tag = '';
                this.hasChanged(null);
            }
        }
    }

    keydownEvent($event) {
        if ( $event.keyCode === 13) {
            this.addTag();
        }
    }

    remove(item) {
        const index = this.value.findIndex(c => c === item);
        if (index >= 0) {
            this.value.splice(index, 1);
            this.hasChanged(null);
        }
    }

    // detect a click outside the control, and add the tag
    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement) {
        this.addTag();
    }
}
