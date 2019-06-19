import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedFunctions } from './shared-functions';

@Component({
    selector: 'form-checkbox',
    template: "<div *ngIf=\"!border\"> <div class=\"form-check\"> <div [ngClass]=\"{'is-invalid': errors, 'is-valid': !errors && isDirty}\"> <input class=\"form-check-input\" [id]=\"id\" type=\"checkbox\" [disabled]=\"disabled\" [(ngModel)]=\"value\" (ngModelChange)=\"hasChanged($event)\" [ngClass]=\"{'is-invalid': errors, 'is-valid': !errors && isDirty}\" /> <label class=\"form-check-label\" [for]=\"id\">{{label}} <ng-container *ngTemplateOutlet=\"tempOutlet\" ></ng-container> </label> <div *ngIf=\"errors\" class=\"invalid-feedback\"> {{ errors }} </div> </div> </div> <small *ngIf=\"note\" class=\"form-text text-muted\"> {{note}} </small> </div> <div *ngIf=\"border\"> <div class=\"input-group\"> <div class=\"input-group-text w-100\" [ngClass]=\"{'is-invalid': errors, 'is-valid': !errors && isDirty}\"> <input [id]=\"id\" type=\"checkbox\" [disabled]=\"disabled\" [(ngModel)]=\"value\" (ngModelChange)=\"hasChanged($event)\" [ngClass]=\"{'is-invalid': errors, 'is-valid': !errors && isDirty}\" /> <label class=\"form-check-label\" [for]=\"id\">{{label}} <ng-container *ngTemplateOutlet=\"tempOutlet\" ></ng-container> </label> </div> <div *ngIf=\"errors\" class=\"invalid-feedback d-block\"> {{ errors }} </div> </div> <small *ngIf=\"note\" class=\"form-text text-muted\"> <markdown (click)=\"sharedFunctions.getRoute($event)\" [data]=\"note\"></markdown> </small> </div> <ng-template #tempOutlet> <ng-content></ng-content> </ng-template>",
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DexihFormCheckboxComponent), multi: true }]
})
export class DexihFormCheckboxComponent implements ControlValueAccessor {
    @Input() label: string;
    @Input() note: string;
    @Input() errors: string;
    @Input() value: boolean;
    @Input() disabled = false;
    @Input() border = false;

    isDirty = false;
    id = 'input_' + Math.random().toString(36).substr(2, 9);
    sharedFunctions = new SharedFunctions();

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor() { }

    hasChanged($even: any) {
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

    writeValue(value: boolean) {
        this.value = value;
    }
}
