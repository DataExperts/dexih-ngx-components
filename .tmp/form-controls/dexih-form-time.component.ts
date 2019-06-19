import { OnInit, Component, forwardRef, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedFunctions } from './shared-functions';

@Component({
    selector: 'form-time',
    template: "<div> <label *ngIf=\"label\" [for]=\"id\" class=\"mt-1\">{{label}} <ng-content></ng-content> </label> <div class=\"input-group \" [ngClass]=\"{'border-danger': errors, 'border-success': !errors && isDirty}\"> <div *ngIf=\"labelLeft\" class=\"input-group-prepend\"> <span class=\"input-group-text\" [ngClass]=\"{'border-0 rounded-0': !border}\"> {{labelLeft}}</span> </div> <div class=\"w-19 m-1\"> <input type=\"number\" class=\"form-control\"  [(ngModel)]=\"hours\" (ngModelChange)=\"hasChanged($event)\" [ngClass]=\"{'is-invalid': errors, 'is-valid': !errors && isDirty}\" placeholder=\"HH\" required max=\"23\" min=\"0\"> <label class=\"mx-auto\">Hours</label> </div> <div class=\"w-10 m-1\"> <input type=\"number\" class=\"form-control\"  [(ngModel)]=\"minutes\" (ngModelChange)=\"hasChanged($event)\" [ngClass]=\"{'is-invalid': errors, 'is-valid': !errors && isDirty}\" placeholder=\"MM\" required max=\"59\" min=\"0\"> <label class=\"mx-auto\">Min</label> </div> <div class=\"w-10 m-1\"> <input type=\"number\" class=\"form-control\"  [(ngModel)]=\"seconds\" (ngModelChange)=\"hasChanged($event)\" [ngClass]=\"{'is-invalid': errors, 'is-valid': !errors && isDirty}\" placeholder=\"SS\" required max=\"59\" min=\"0\"> <label class=\"mx-auto\">Sec</label> </div> </div> <div *ngIf=\"errors\" class=\"invalid-feedback d-block\"> {{ errors }} </div> <small *ngIf=\"note\" class=\"form-text text-muted\"> <markdown (click)=\"sharedFunctions.getRoute($event)\" [data]=\"note\"></markdown> </small> </div>",
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DexihFormTimeComponent), multi: true }]
})
export class DexihFormTimeComponent implements AfterViewInit, ControlValueAccessor {
    @Input() label: string;
    @Input() labelLeft: string;
    @Input() note: string;
    @Input() iconClass: string;
    @Input() errors: string;
    @Input() value: string;

    hours: number;
    minutes: number;
    seconds: number;

    id = 'input_' + Math.random().toString(36).substr(2, 9);
    sharedFunctions = new SharedFunctions();

    isDirty = false;

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor(private _changeDetectionRef: ChangeDetectorRef) {

     }

    ngAfterViewInit() {
        if (this.value) {
            let parsedTime = this.value.split(':');
            this.hours = Number(parsedTime[0]);
            if (parsedTime.length > 1) {
                this.minutes = Number(parsedTime[1]);
            }
            if (parsedTime.length > 2) {
                this.seconds = Number(parsedTime[2]);
            }
        } else {
            this.hours = 0;
            this.minutes = 0;
            this.seconds = 0;
        }
        // workaround for change detection required when using Afterview Init https://github.com/angular/angular/issues/6005
        this._changeDetectionRef.detectChanges();
    }

    hasChanged() {
        this.value = this.hours + ':' + this.minutes + ':' + this.seconds;

        this.onChange(this.value);
        this.onTouched();
        this.validate();
        this.isDirty = true;
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    writeValue(value: string) {
        if (value) {
            this.value = value;
        }
    }

    validate() {
        if (this.hours) {
            let hours = Number(this.hours);
            if (!(this.hours && this.hours >= 0 && this.hours < 24)) {
                this.errors = 'The hours must be between 0 and 24.';
            }
        }
    }
}
