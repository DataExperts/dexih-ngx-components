import { Component, forwardRef, Input, EventEmitter, Output, HostListener, ViewChild, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BsDropdownDirective } from 'ngx-bootstrap';
import { SharedFunctions, ListItem } from './shared-functions';

@Component({
    selector: 'form-tags-dropdown',
    template: "<div> <label *ngIf=\"label\" [for]=\"id\" class=\"mt-1\">{{label}} <ng-content></ng-content> </label> <small *ngIf=\"subLabel\" class=\"form-text\">{{subLabel}}</small> <div #dropdown dropdown [ngClass]=\"{'border rounded': border, 'border-danger': errors, 'border-success': !errors && isDirty}\"> <div class=\"input-group\" dropdownToggle (click)=\"dropdown.autoClose=false\"> <div  class=\"input-group-prepend\"> <span *ngIf=\"labelLeft\" class=\"input-group-text\" [ngClass]=\"{'border-0 rounded-0 bg-transparent': !border}\">{{labelLeft}}</span> </div> <ul *dropdownMenu class=\"w-100 dropdown-menu scrollable-menu\" role=\"menu\"> <li *ngIf=\"enableAddAll\" class=\"scrollable-item\"> <a class=\"dropdown-item\" (click)=\"addAll()\" title=\"Add all items to the list\">Add all</a> </li> <li class=\"scrollable-item\"> <a class=\"dropdown-item\" (click)=\"clearAll()\" title=\"Clear all items\">Clear all</a> </li> <div class=\"dropdown-divider\"></div> <li *ngFor=\"let item of sortedItems | filter: itemName: filterString\" [ngClass]=\"{'active': selectedItem == item}\" class=\"scrollable-item\"> <a  class=\"dropdown-item\" (click)=\"selectItem(item, true)\" [title]=\"item.title\"> {{item.label}}</a> </li> </ul> <div *ngFor=\"let item of labels; let i = index\" class=\"border rounded bg-light my-auto ml-1\"> {{item}} <button (click)=\"remove(i)\" type=\"button\" class=\"close\" aria-label=\"Close\"> <span aria-hidden=\"true\">&times;</span> </button> </div> <input class=\"form-control border-0 rounded-0 invisible\" [disabled]=\"true\"> <div  class=\"input-group-append\"> <span class=\"input-group-text\" [ngClass]=\"{'border-0 rounded-0 bg-transparent': !border}\"> <i *ngIf=\"items && items.length > 0\" class=\"icon-append fa fa-caret-down\"></i> <i  *ngIf=\"iconClass && (!items || items.length == 0) \" class=\"icon-append {{iconClass}}\"></i> </span> </div> </div> </div> <div *ngIf=\"errors\" class=\"d-block invalid-feedback\"> {{ errors }} </div> <small *ngIf=\"note\" class=\"form-text text-muted\"> <markdown (click)=\"sharedFunctions.getRoute($event)\" [data]=\"note\"></markdown> </small> </div>",
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DexihFormTagsDropdownComponent), multi: true },
    ]
})
export class DexihFormTagsDropdownComponent implements ControlValueAccessor, OnChanges {
    @Input() label: string;
    @Input() labelLeft: string;
    @Input() note: string;
    @Input() placeholder: string;
    @Input() iconClass: string;
    @Input() errors: string;
    @Input() value: Array<string> = [];
    @Input() type = 'text';
    @Input() subLabel: string;
    @Input() maxlength: number;
    @Input() items: Array<any>;
    @Input() itemKey: any;
    @Input() itemName: string;
    @Input() itemTitle: string;
    @Input() sortItems = false;
    @Input() border = true;
    @Input() enableAddAll = false;
    @Input() returnKeys = false;

    @ViewChild(BsDropdownDirective, { static: true }) dropdown: BsDropdownDirective;
    @ViewChild('dropdown', { static: true }) dropdownElement: any;

    isDirty = false;

    tag: string;
    id = 'input_' + Math.random().toString(36).substr(2, 9);

    labels: string[] = [];

    sortedItems: Array<ListItem>;
    sharedFunctions = new SharedFunctions();

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor() { }

    ngOnChanges() {
       // this.updateLabels();
        this.writeValue(this.value);
    }

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

    writeValue(value: string[]) {
        this.value = value;
        this.updateLabels();
    }

    updateLabels() {
        if (this.value === null || typeof(this.value) === undefined) {
            this.sortedItems = [];
            this.labels = [];
        } else {
            let items: Array<any>;
            if (this.sortItems) {
                items = this.items.sort((a, b) => {
                    let aLabel = this.sharedFunctions.fetchFromObject(a, this.itemName);
                    let bLabel = this.sharedFunctions.fetchFromObject(b, this.itemName);
                    if (aLabel > bLabel) {
                        return 1;
                    }
                    if (aLabel < aLabel) {
                        return -1;
                    }
                    return 0;
                });
            } else {
                items = this.items;
            }

            this.sortedItems = items.map(c => {
                return {
                    label: this.sharedFunctions.fetchFromObject(c, this.itemName),
                    key: this.sharedFunctions.fetchFromObject(c, this.itemKey),
                    title: this.sharedFunctions.fetchFromObject(c, this.itemTitle),
                    item: c
                };
            });

            this.labels = [];
            this.value.forEach(item => {
                let itemLookup: string;
                if (this.returnKeys) {
                    itemLookup = this.items.find(c => this.sharedFunctions.fetchFromObject(c, this.itemKey) === item);
                } else {
                    itemLookup = this.items.find(c => this.sharedFunctions.fetchFromObject(c, this.itemKey)
                        === this.sharedFunctions.fetchFromObject(item, this.itemKey));
                }

                if (itemLookup) {
                    this.labels.push(this.sharedFunctions.fetchFromObject(itemLookup, this.itemName));
                } else {
                    this.labels.push(item);
                }
            });
        }
    }

    selectItem(selectedItem: ListItem, autoClose: boolean) {
        if (selectedItem) {
            let item: any;
            if (!this.value) { this.value = []; }
            item = this.value.find(c => this.sharedFunctions.fetchFromObject(c, this.itemKey) === selectedItem.key);
            if (this.returnKeys) {
                item = this.sharedFunctions.fetchFromObject(item, this.itemKey);
            }
            if (item) { return; }
            this.value.push(selectedItem.item);
            this.labels.push(selectedItem.label);
        }

        this.onChange(this.value);
        this.onTouched();
        this.isDirty = true;

        if (autoClose) {
            this.dropdown.hide();
        }
    }

    remove(index: number) {
        if (index >= 0 && this.value) {
            this.value.splice(index, 1);
            this.labels.splice(index, 1);
            this.hasChanged();
        }
    }

    addAll() {
        if (this.returnKeys) {
            this.value = this.sortedItems.map(c => c.key);
        } else {
            this.value = this.sortedItems.map(c => c.item);
        }

        this.labels = this.sortedItems.map(c => c.label);
        this.hasChanged();
        this.dropdown.hide();
    }

    clearAll() {
        this.value = [];
        this.labels = [];
        this.hasChanged();
    }

    // detect a click outside the control, and hide the dropdown
    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement: any) {
        if (this.dropdown.isOpen) {
            const clickedInside = this.dropdownElement.nativeElement.contains(targetElement);
            if (!clickedInside) {
                this.dropdown.hide();
            }
        }
    }
}
