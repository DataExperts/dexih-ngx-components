import { OnInit, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { SharedFunctions } from './shared-functions';

@Component({
    selector: 'form-textarea',
    templateUrl: './dexih-form-textarea.component.html',
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DexihFormTextAreaComponent), multi: true }],
    animations: [
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('slideDown', [
        state('hide', style({ height: 0, overflow: 'hidden' })),
        state('show', style({ height: '*', overflow: 'unset' })),
        transition('hide <=> show', animate('100ms ease-in')),
    ])
    ]
})
export class DexihFormTextAreaComponent implements OnInit, ControlValueAccessor {
    @Input() label: string;
    @Input() labelLeft: string;
    @Input() note: string;
    @Input() placeholder: string;
    @Input() iconClass = 'fa fa-comment';
    @Input() errors: string;
    @Input() value: string;
    @Input() hideToggle = false;
    @Input() isHidden = true;
    @Input() rows = 5;
    @Input() showMarkdown = false;
    @Input() disabled = false;
    @Input() showPreview = true;
    @Input() showCopy = false;

    // state: string;
    sharedFunctions = new SharedFunctions();

    id = 'input_' + Math.random().toString(36).substr(2, 9);

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor() {

     }

     ngOnInit() {
         if ( this.hideToggle ) { this.isHidden = false; }
       //  this.state = this.isHidden ? 'hide' : 'show';
     }

     toggleState() {
         this.isHidden = !this.isHidden;
        // this.state = this.isHidden ? 'hide' : 'show';
     }

    hasChanged($event) {
        this.onChange(this.value);
        this.onTouched();
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    writeValue(value) {
        if (value) {
            this.value = value;
        }
    }

    getRoute(event) {
        let isLink = this.sharedFunctions.getRoute(event);

        // if a link was not selected, then open the edit.
        if (!isLink) {
            this.isHidden = false;
        }
    }

    copyMessage() {
        let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = this.value;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
      }
}
