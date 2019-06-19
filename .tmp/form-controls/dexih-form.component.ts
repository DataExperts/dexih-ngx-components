import { Component, forwardRef, Input } from '@angular/core';

@Component({
    selector: 'dexih-form',
    template: "<form class=\"smart-form\" [formGroup]=\"formGroup\" > <fieldset> <ng-content></ng-content> </fieldset> </form>",
})
export class DexihFormComponent {
    @Input() formGroup: string;

    constructor() { }
}
