import { Component, forwardRef, Input, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedFunctions } from './shared-functions';

@Component({
    selector: 'form-input, [formInput]',
    template: "<div> <label *ngIf=\"label\" [for]=\"id\" class=\"mt-1\" >{{label}} <ng-content></ng-content> </label> <small *ngIf=\"subLabel\" class=\"form-text\">{{subLabel}}</small> <div class=\"input-group m-0\" > <div *ngIf=\"labelLeft\" class=\"input-group-prepend\"> <span class=\"input-group-text\" [ngClass]=\"{'border-0 rounded-0': !border}\"> {{labelLeft}}</span> </div> <input class=\"form-control\" [id]=\"id\" [disabled]=\"disabled\" [(ngModel)]=\"value\" (ngModelChange)=\"hasChanged()\" (keydown)=\"keydownEvent($event)\" [type]=\"type\" [placeholder]=\"placeholder ? placeholder : ''\" [attr.maxlength]=\"maxlength\" [autocapitalize]=\"autocapitalize\" [ngClass]=\"{'border-0 rounded-0  bg-transparent': !border, 'is-invalid': errors, 'is-valid': !errors && isDirty}\" /> <div *ngIf=\"iconClass\" class=\"input-group-append\"> <span class=\"input-group-text\"  [ngClass]=\"{'border-0 rounded-0 bg-transparent': !border}\" > <i *ngIf=\"iconClass\" class=\"icon-append {{iconClass}}\"></i> </span> </div> <div *ngIf=\"errors\" class=\"invalid-feedback\"> {{ errors }} </div> </div> <small *ngIf=\"note\" class=\"form-text text-muted\"> <markdown (click)=\"sharedFunctions.getRoute($event)\" [data]=\"note\"></markdown> </small> </div>",
    styles: ["/* Used to add a scrollable menu to dropdown menus */ .scrollable-menu { height: auto; max-height: 300px; overflow-x: hidden; } .scrollable-menu-fixed { overflow-x: visible; } /* Used to add a scrollable menu to dropdown menus */ .scrollable-list { height: auto; max-height: 400px; overflow-x: hidden; } .disabled-input { color: black; } "],
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
    @Input() autocapitalize = 'none';

    @Output() keydown: EventEmitter<any> = new EventEmitter<any>();

    isDirty = false;

    id = 'input_' + Math.random().toString(36).substr(2, 9);
    sharedFunctions = new SharedFunctions();

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor() { }

    hasChanged() {
        this.onChange(this.value);
        this.onTouched();
        this.isDirty = true;
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    writeValue(value: string) {
        this.value = value;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    keydownEvent($event: any) {
        this.keydown.emit($event);
    }
}
