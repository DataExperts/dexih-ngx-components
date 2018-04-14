import { Component, forwardRef, Input, EventEmitter, Output, HostListener, ViewChild, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BsDropdownDirective } from 'ngx-bootstrap';

@Component({
    selector: 'form-tags-dropdown',
    templateUrl: 'dexih-form-tagsDropdown.component.html',
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DexihFormTagsDropdownComponent), multi: true },
    ]
})
export class DexihFormTagsDropdownComponent implements ControlValueAccessor, OnChanges {
    @Input() label: string;
    @Input() note: string;
    @Input() placeholder: string;
    @Input() iconClass: string;
    @Input() errors: string;
    @Input() value = [];
    @Input() type = 'text';
    @Input() subLabel: string;
    @Input() maxlength: number;
    @Input() items: Array<any>;
    @Input() itemKey;
    @Input() itemName;
    @Input() sortItems = false;
    @Input() border = true;

    @ViewChild(BsDropdownDirective) dropdown: BsDropdownDirective;
    @ViewChild('dropdown') dropdownElement;

    isDirty = false;

    tag: string;
    id = 'input_' + Math.random().toString(36).substr(2, 9);

    labels: string[] = [];

    sortedItems: Array<any>;

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor() { }

    ngOnChanges() {
        if (this.sortItems) {
            this.sortedItems = this.items.sort((a, b) => {
                if (a[this.itemName] > b[this.itemName]) {
                    return 1;
                }
                if (a[this.itemName] < b[this.itemName]) {
                    return -1;
                }
                return 0;
            });
        } else {
            this.sortedItems = this.items;
        }

        this.labels = [];
        this.value.forEach(item => {
            let itemLookup: string;
            if (this.itemKey) {
                itemLookup = this.items.find(c => c[this.itemKey] === item);
            } else {
                itemLookup = this.items.find(c => c === item);
            }

            if (itemLookup) {
                if (this.itemName) {
                    this.labels.push(itemLookup[this.itemName]);
                } else {
                    this.labels.push(itemLookup);
                }
            } else {
                this.labels.push(item);
            }
        });

        this.writeValue(this.value);
    }

    hasChanged($event) {
        this.onChange(this.value);
        this.onTouched();
        this.isDirty = true;
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    writeValue(value) {
        // if (value) {
            this.value = value;
        // }
    }

    selectItem(selectedItem: any) {
        if (selectedItem) {
            if (this.itemKey) {
                if (this.value.findIndex(c => c === selectedItem[this.itemKey]) >= 0 ) {
                    return;
                }

                this.value.push(selectedItem[this.itemKey]);
            } else {
                if (this.value.findIndex(c => c === selectedItem) >= 0) {
                    return;
                }

                this.value.push(selectedItem);
            }
            if (this.itemName) {
                this.labels.push(selectedItem[this.itemName]);
            } else {
                this.labels.push(selectedItem);
            }
        }

        this.onChange(this.value);
        this.onTouched();
        this.isDirty = true;
        this.dropdown.hide();

    }

    remove(index) {
        if (index >= 0) {
            this.value.splice(index, 1);
            this.labels.splice(index, 1);
            this.hasChanged(null);
        }
    }

    // detect a click outside the control, and hide the dropdown
    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement) {
        if (this.dropdown.isOpen) {
            const clickedInside = this.dropdownElement.nativeElement.contains(targetElement);
            if (!clickedInside) {
                this.dropdown.hide();
            }
        }
    }
}
