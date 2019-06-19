import { Component, OnInit, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { ToastMessage} from './dexih-toast.models';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
    selector: 'dexih-toast-item',
    template: "  <!-- Then put toasts within --> <div class=\"toast dexih-toast-item show\" *ngIf=\"show\" [@fadeInOut] (@fadeInOut.done)=\"animationDone($event)\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\"> <div class=\"toast-header\" [ngClass]=\"{'bg-success text-white': message?.type == 'success', 'bg-info text-white': message?.type == 'info', 'bg-danger text-white': message?.type == 'error' }\"> <i *ngIf=\"message?.type == 'success'\"  class=\"fa fa-check-circle text-white\"></i> <i *ngIf=\"message?.type == 'info'\"  class=\"fa fa-info-circle text-white\"></i> <i *ngIf=\"message?.type == 'error'\"  class=\"fa fa-exclamation-circle text-white\"></i> <strong class=\"ml-2 mr-auto text-white\">{{message?.title}}</strong> <button type=\"button\" class=\"ml-2 mb-1 close\" data-dismiss=\"toast\" aria-label=\"Close\" (click)=\"close()\"> <span aria-hidden=\"true\">&times;</span> </button> </div> <div class=\"toast-body dexih-toast-body\"> {{content}} <a *ngIf=\"message?.buttonName\" class=\"btn btn-sm btn-outline-primary\" (click)=\"onButtonClick()\">{{message?.buttonName}}</a> </div> </div> ",
    styles: [".dexih-toast-item { width: 300px; margin-bottom: 5px; } "],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ height: '0px', 'opacity': 0 }),
                animate('0.5s ease', style({ 'height': 'auto', 'opacity': 1 })),
            ]),
            transition(':leave', [
                animate('0.5s ease', style({ 'height': '0px', 'opacity': 0 })),
            ])
        ]),
      ]
})
export class DexihToastItemComponent implements OnInit {
    @Input() message: ToastMessage;
    @Output() onDestroy: EventEmitter<DexihToastItemComponent> = new EventEmitter<DexihToastItemComponent>();

    public show = false;
    public content: string;

    constructor() { }

    ngOnInit() {
        this.show = true;

        if (this.message) {
            if (this.message.content.length > 200) {
                this.content = this.message.content.substr(0, 200) + ' ...';
            } else {
                this.content = this.message.content;
            }
        }

        if (this.message.delay > 0) {
            setTimeout(() => this.destroy(), this.message.delay);
        }
    }

    public destroy(): void {
        this.show = false;
    }

    public animationDone(): void {
        if (!this.show) {
            this.onDestroy.emit();
        }
    }

    close() {
        this.destroy();
    }

    onButtonClick() {
        if (this.message.onButtonClick) {
            this.destroy();
            this.message.onButtonClick(this.message);
        }
    }
}
