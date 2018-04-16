import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'dexih-button-dropdown',
    templateUrl: './dexih-button-dropdown.component.html',
    styleUrls: ['./dexih-button-dropdown.component.scss']
})
export class DexihButtonDropDownComponent implements OnInit {
    @Input() buttonClass = 'btn btn-primary';
    @Input() iconClass: string;
    @Input() title: string;
    @Input() disabled = false;
    @Input() busy = false;
    @Input() text = '';
    @Input() pullRight = false;
    @Input() badge: string;
    @Input() badgeClass = '';
    @Input() hideCarrot = false;

  //  @Output() click = new EventEmitter<any>();

    constructor() { }

    ngOnInit() { }

    // onClick($event) {
    //     this.click.emit($event);
    // }
}
