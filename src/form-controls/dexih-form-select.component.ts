import { Component, OnInit, OnChanges, OnDestroy, forwardRef, Input, Output,
    ViewChild, HostListener, ElementRef, EventEmitter } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BsDropdownDirective } from 'ngx-bootstrap';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'form-select',
    templateUrl: './dexih-form-select.component.html',
    styleUrls: ['./dexih-form.component.scss'],
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DexihFormSelectComponent), multi: true }]
})
export class DexihFormSelectComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
    @Input() label: string;
    @Input() note: string;
    @Input() errors: string;
    @Input() value: any;
    @Input() items: Array<any>;
    @Input() parentName: string;
    @Input() grandParentName: string;
    @Input() childItems: string;
    @Input() grandChildItems: string;
    @Input() itemKey: string;
    @Input() itemName: string;
    @Input() itemTitle: string;
    @Input() defaultItem: string; // item is added to the list when list is empty.
    @Input() allowNullSelect = false;
    @Input() selectNullMessage = 'Select nothing';
    @Input() enableTextEntry = false;
    @Input() textEntryNote = 'Enter a value';
    @Input() textValue: string = null;
    @Input() border = true;
    @Input() sortItems = false;
    @Input() enableFilter = true;
    @Output() textValueChange = new EventEmitter();


    @ViewChild(BsDropdownDirective) dropdown: BsDropdownDirective;
    @ViewChild('dropdown') dropdownElement: any;

    id = 'input_' + Math.random().toString(36).substr(2, 9);

    selectedItem: any;
    selectedName: string;

    filterSubscription: Subscription;
    manualSubscription: Subscription;

    filterControl = new FormControl();
    filterString = '';

    sortedItems: Array<any>;

    manualControl = new FormControl();
    doManualControlUpdate = true;

    isDirty = false;

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor() {

     }

     ngOnInit() {
        // monitor changes to the filter control, and update if updated after 500ms.
        this.manualSubscription = this.manualControl.valueChanges
            .subscribe(newValue => {
                if (this.doManualControlUpdate) {
                    this.textValue = newValue;
                    this.selectedItem = null;
                    this.selectedName = this.textValue;
                    this.value = null;
                    this.textValueChange.emit(this.textValue);

                    this.onChange(this.value);
                    this.onTouched();
                    this.isDirty = true;
                }
                this.doManualControlUpdate = true;
            });

        this.filterSubscription = this.filterControl.valueChanges
            .pipe(debounceTime(500))
            .subscribe(newValue => {
                this.filterString = newValue;
            });
     }

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

        this.writeValue(this.value);
    }

    ngOnDestroy() {
        if (this.filterSubscription) { this.filterSubscription.unsubscribe(); }
        if (this.manualSubscription) { this.manualSubscription.unsubscribe(); }
    }

    hasChanged($event: any) {
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

    writeValue(value: any) {
        this.selectedItem = null;
        if (value) {
            this.value = value;
            this.setSelectedItem(this.value, this.items);

        } else {
            this.selectedItem = null;
            this.selectedName = '';
            if (this.enableTextEntry) {
                if (this.textValue) {
                    this.selectedName = this.textValue;
                    this.doManualControlUpdate = false;
                    this.manualControl.setValue(this.textValue);
                }
            }
        }
        if (this.childItems) {
            this.items.forEach(item => {
                let childItems = <Array<any>> item[this.childItems];

                if (this.grandChildItems) {
                    if (value && !this.selectedItem) {
                        childItems.forEach(childItem => {
                            this.setSelectedItem(value, childItem[this.grandChildItems]);
                        });
                    }
                } else {
                    if (value && !this.selectedItem) {
                        this.setSelectedItem(value, childItems);
                    }
                }
            });
        }
    }

    selectItem(selectedItem: any) {
        this.selectedItem = selectedItem;
        if (selectedItem) {
            if (this.itemKey) {
                this.value = selectedItem[this.itemKey];
            } else {
                this.value = selectedItem;
            }
            if (this.itemName) {
                this.selectedName = selectedItem[this.itemName];
            } else {
                this.selectedName = selectedItem;
            }

            this.doManualControlUpdate = false;
            this.textValue = null;
            this.manualControl.setValue(null);
            this.textValueChange.emit(this.textValue);

        } else {
            this.value = null;
            this.selectedName = '';
        }

        this.onChange(this.value);
        this.onTouched();
        this.isDirty = true;
        this.dropdown.hide();
    }

    private setSelectedItem(value: any, items: Array<any>) {
        if (this.itemKey) {
            if (value && items) {
                this.selectedItem = items.find(c => c[this.itemKey] === value);
            } else {
                this.selectedItem = value;
            }
        } else {
            this.selectedItem = value;
        }

        if (this.itemName) {
            if (value && items) {
                if (this.selectedItem) {
                    this.selectedName = this.selectedItem[this.itemName];
                }
            } else {
                this.selectedName = this.selectedItem;
            }
        } else {
            this.selectedName = this.selectedItem;
        }

    }

    onTextEntryEnter($event: any) {
        this.dropdown.hide();
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
