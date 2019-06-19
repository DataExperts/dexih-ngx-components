
import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'dexih-progressbar, [dexih-progressbar]',
    template: "<div> <div dexihProgress [animate]=\"animate\" [max]=\"max\" [ngStyle]=\"{'min-width': width, 'height': height }\" style=\"width:100%\" class=\"bg-secondary\"> <div (click)=\"onClick()\" class=\"bg-secondary\" [ngClass]=\"{'progress-width': showCancel, 'w-100': !showCancel}\" style=\"display: inline-block\"> <dexih-bar [type]=\"type\" [value]=\"value\" [max]=\"max\" [height]=\"height\"> <ng-content></ng-content> </dexih-bar> </div> <a *ngIf=\"showCancel\" class=\"btn btn-sm btn-danger text-white rounded-0 pull-right\" style=\"display: inline-block\" title=\"Cancel the task\" (click)=\"cancelClick()\"> <i class=\"fa fa-ban\"></i> </a> </div> </div>",
    styles: ["@charset \"UTF-8\"; .progress-width { width: -webkit-calc(100% - 30px); width: -moz-calc(100% - 30px); width: calc(100% - 30px); } ​ .content { cursor: pointer; display: inline; overflow: hidden; white-space: nowrap; } "]
})
export class DexihProgressbarComponent  {
    @Input() public animate: boolean;
    @Input() public max = 100;
    @Input() public type: string;
    @Input() public value: number;
    @Input() public width = '200px';
    @Input() public height = '31px';
    @Input() public showCancel = false;

    @Output() cancelled = new EventEmitter();
    @Output() progressClick = new EventEmitter();

    onClick()     {
        this.progressClick.emit();
    }

    cancelClick() {
        this.cancelled.emit();
        event.stopPropagation();

    }

}
