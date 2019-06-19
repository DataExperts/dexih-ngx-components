import { Component, forwardRef, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedFunctions } from './shared-functions';

export enum eDayOfWeek {
    Sunday = <any>'Sunday',
    Monday = <any>'Monday',
    Tuesday  = <any>'Tuesday',
    Wednesday = <any>'Wednesday',
    Thursday  = <any>'Thursday',
    Friday = <any>'Friday',
    Saturday  = <any>'Saturday'
}

@Component({
    selector: 'form-daysofweek',
    template: "<div class=\"form-group\"> <label [for]=\"id\" class=\"mt-1\">{{label}} <div class=\"input-group\"> <div class=\"input-group-prepend\"> <a class=\"btn btn-outline-primary btn-sm\" (click)=\"selectAllDays()\">All</a> <a class=\"btn btn-outline-primary btn-sm\" (click)=\"selectNoDays()\">None</a> <a class=\"btn btn-outline-primary btn-sm\" (click)=\"selectWeekend()\">Weekend</a> </div> <div class=\"input-group-append\"> <a class=\"btn btn-outline-primary btn-sm\" (click)=\"selectWeekDays()\">Weekdays</a> </div> </div> <ng-content></ng-content> </label> <div class=\"input-group\"> <div class=\"form-check form-check-inline\"> <input class=\"form-check-input\" type=\"checkbox\" [id]=\"id + '1'\" [(ngModel)]=\"daysOfWeek[0]\" (ngModelChange)=\"hasChanged($event)\"> <label class=\"form-check-label\" [for]=\"id + '1'\">Sunday</label> </div> <div class=\"form-check form-check-inline\"> <input class=\"form-check-input\" type=\"checkbox\" [id]=\"id + '2'\" [(ngModel)]=\"daysOfWeek[1]\" (ngModelChange)=\"hasChanged($event)\"> <label class=\"form-check-label\" [for]=\"id + '2'\">Monday</label> </div> <div class=\"form-check form-check-inline\"> <input class=\"form-check-input\" type=\"checkbox\" [id]=\"id + '3'\" [(ngModel)]=\"daysOfWeek[2]\" (ngModelChange)=\"hasChanged($event)\"> <label class=\"form-check-label\" [for]=\"id + '3'\">Tuesday</label> </div> <div class=\"form-check form-check-inline\"> <input class=\"form-check-input\" type=\"checkbox\" [id]=\"id + '4'\" [(ngModel)]=\"daysOfWeek[3]\" (ngModelChange)=\"hasChanged($event)\"> <label class=\"form-check-label\" [for]=\"id + '4'\">Wednesday</label> </div> <div class=\"form-check form-check-inline\"> <input class=\"form-check-input\" type=\"checkbox\" [id]=\"id + '5'\" [(ngModel)]=\"daysOfWeek[4]\" (ngModelChange)=\"hasChanged($event)\"> <label class=\"form-check-label\" [for]=\"id + '5'\">Thursday</label> </div> <div class=\"form-check form-check-inline\"> <input class=\"form-check-input\" type=\"checkbox\" [id]=\"id + '6'\" [(ngModel)]=\"daysOfWeek[5]\" (ngModelChange)=\"hasChanged($event)\"> <label class=\"form-check-label\" [for]=\"id + '6'\">Friday</label> </div> <div class=\"form-check form-check-inline\"> <input class=\"form-check-input\" type=\"checkbox\" [id]=\"id + '7'\" [(ngModel)]=\"daysOfWeek[6]\" (ngModelChange)=\"hasChanged($event)\"> <label class=\"form-check-label\" [for]=\"id + '7'\">Saturday</label> </div> </div> <div *ngIf=\"errors\" class=\"invalid-feedback d-block\"> {{ errors }} </div> <small *ngIf=\"note\" class=\"form-text text-muted\"> <markdown (click)=\"sharedFunctions.getRoute($event)\" [data]=\"note\"></markdown> </small> </div>",
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DexihFormDaysOfWeekComponent), multi: true }]
})
export class DexihFormDaysOfWeekComponent implements ControlValueAccessor, AfterViewInit {
    @Input() label: string;
    @Input() labelLeft: string;
    @Input() note: string;
    @Input() errors: string;
    @Input() value: eDayOfWeek[];

    eDayOfWeek = eDayOfWeek;
    daysOfWeek = new Array<Boolean>(7);
    id = 'input_' + Math.random().toString(36).substr(2, 9);
    sharedFunctions = new SharedFunctions();

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor(private _changeDetectionRef: ChangeDetectorRef) {

    }

    ngAfterViewInit()  {
        if (this.value) {
            this.value.forEach(value => {
                switch (value) {
                    case eDayOfWeek.Sunday: this.daysOfWeek[0] = true; break;
                    case eDayOfWeek.Monday: this.daysOfWeek[1] = true; break;
                    case eDayOfWeek.Tuesday: this.daysOfWeek[2] = true; break;
                    case eDayOfWeek.Wednesday: this.daysOfWeek[3] = true; break;
                    case eDayOfWeek.Thursday: this.daysOfWeek[4] = true; break;
                    case eDayOfWeek.Friday: this.daysOfWeek[5] = true; break;
                    case eDayOfWeek.Saturday: this.daysOfWeek[6] = true; break;
                }
            });
        }

        // workaround for change detection required when using Afterview Init https://github.com/angular/angular/issues/6005
        this._changeDetectionRef.detectChanges();
    }

    hasChanged($event: any) {
        let daysOfWeek = new Array<eDayOfWeek>();
        if (this.daysOfWeek[0]) { daysOfWeek.push(eDayOfWeek.Sunday); }
        if (this.daysOfWeek[1]) { daysOfWeek.push(eDayOfWeek.Monday); }
        if (this.daysOfWeek[2]) { daysOfWeek.push(eDayOfWeek.Tuesday); }
        if (this.daysOfWeek[3]) { daysOfWeek.push(eDayOfWeek.Wednesday); }
        if (this.daysOfWeek[4]) { daysOfWeek.push(eDayOfWeek.Thursday); }
        if (this.daysOfWeek[5]) { daysOfWeek.push(eDayOfWeek.Friday); }
        if (this.daysOfWeek[6]) { daysOfWeek.push(eDayOfWeek.Saturday); }

        this.value = daysOfWeek;

        this.onChange(this.value);
        this.onTouched();
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    writeValue(value: any) {
        if (value) {
            this.value = value;
        }
    }

    selectWeekend() {
      this.daysOfWeek[0] = true;
      this.daysOfWeek[1] = false;
      this.daysOfWeek[2] = false;
      this.daysOfWeek[3] = false;
      this.daysOfWeek[4] = false;
      this.daysOfWeek[5] = false;
      this.daysOfWeek[6] = true;
      this.hasChanged(null);
  }

  selectWeekDays() {
      this.daysOfWeek[0] = false;
      this.daysOfWeek[1] = true;
      this.daysOfWeek[2] = true;
      this.daysOfWeek[3] = true;
      this.daysOfWeek[4] = true;
      this.daysOfWeek[5] = true;
      this.daysOfWeek[6] = false;
      this.hasChanged(null);
  }

    selectAllDays() {
      this.daysOfWeek[0] = true;
      this.daysOfWeek[1] = true;
      this.daysOfWeek[2] = true;
      this.daysOfWeek[3] = true;
      this.daysOfWeek[4] = true;
      this.daysOfWeek[5] = true;
      this.daysOfWeek[6] = true;
      this.hasChanged(null);
  }

    selectNoDays() {
      this.daysOfWeek[0] = false;
      this.daysOfWeek[1] = false;
      this.daysOfWeek[2] = false;
      this.daysOfWeek[3] = false;
      this.daysOfWeek[4] = false;
      this.daysOfWeek[5] = false;
      this.daysOfWeek[6] = false;
      this.hasChanged(null);
    }
}
