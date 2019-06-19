import { Component, OnInit, OnChanges, OnDestroy, forwardRef, Input, Output,
    ViewChild, HostListener, ElementRef, EventEmitter, SimpleChanges } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BsDropdownDirective } from 'ngx-bootstrap';
import { Subscription, pipe } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { SharedFunctions } from './shared-functions';

@Component({
    selector: 'form-select',
    template: " <div> <label *ngIf=\"label\" [for]=\"id\" class=\"mt-1\">{{label}} <ng-content></ng-content> </label> <div #dropdown dropdown [autoClose]=\"false\" class=\"input-group\" style=\"width: 100%\" > <div class=\"input-group\" [id]=\"id\" (click)=\"dropdownToggle()\" style=\"width: 100%\"> <div *ngIf=\"labelLeft\" class=\"input-group-prepend\"> <span class=\"input-group-text\" [ngClass]=\"{'border-0 rounded-0 bg-transparent': !border}\"> {{labelLeft}}</span> </div> <input  [attr.disabled]=\"((enableFilter && showDropDown) || enableTextEntry) ? null : ''\"  [formControl]=\"manualControl\"  [placeholder]=\"placeholder\"  (keydown.arrowdown)=\"down()\" (keydown.arrowup)=\"up()\" (keyup.enter)=\"onTextEntryEnter($event)\"  class=\"form-control disabled-input bg-transparent\"  [ngClass]=\"{'border-0': !border, 'is-invalid': errors, 'is-valid': !errors && isDirty, 'font-italic': !selectedItem && textValue }\" (focusout)=\"dropdownHide()\" [autocapitalize]=\"autocapitalize\" /> <div class=\"input-group-append\"> <span class=\"input-group-text\" [ngClass]=\"{'border-0 rounded-0 bg-transparent': !border}\"> <i *ngIf=\"showDropDown\" class=\"icon-append fa fa-caret-down\"></i> <i *ngIf=\"iconClass && (!items || items.length == 0) \" class=\"icon-append {{iconClass}}\"></i> </span> </div> <div *ngIf=\"errors\" class=\"invalid-feedback\"> {{ errors }} </div> </div> <ul *dropdownMenu  class=\"dropdown-menu scrollable-menu\" role=\"menu\" style=\"width:100%\"> <ng-template [ngIf]=\"showDropDown\"> <li *ngIf=\"allowNullSelect\" > <a class=\"dropdown-item\" [ngClass]=\"{'active': !selectedItem }\" (click)=\"selectItem(null)\">{{selectNullMessage}}</a> </li> <ng-template [ngIf]=\"textEntryItems && textEntryItems.length > 0\"> <li *ngFor=\"let item of textEntryItems\"  class=\"scrollable-item\" > <a class=\"dropdown-item\" [ngClass]=\"{'active': selectedItem == item}\"  (click)=\"selectText(item)\"> {{item}}</a> </li> </ng-template> <ng-template [ngIf]=\"!childItems && !grandChildItems\"> <li *ngFor=\"let item of sortedItems | filter: itemName: filterString\"  class=\"scrollable-item\" > <a class=\"dropdown-item\" [ngClass]=\"{'active': selectedItem == item}\"  (click)=\"selectItem(item)\" [title]=\"itemTitle && childItem ? childItem[itemTitle] : ''\"> {{itemName && item ? item[itemName] : item}}</a> </li> </ng-template> <ng-template [ngIf]=\"childItems && !grandChildItems\"> <ng-template ngFor let-item [ngForOf]=\"sortedItems\"> <ng-template ngFor let-childItem [ngForOf]=\"item[childItems] | filter: itemName: filterString\" let-i=\"index\"> <li  *ngIf=\"i == 0\" class=\"list-group-item list-group-item-heading list-group-item-info\" >{{item[parentName]}}</li> <li  class=\"scrollable-item\" > <a  class=\"dropdown-item\" [ngClass]=\"{'active': selectedItem == childItem}\" (click)=\"selectItem(childItem)\" [title]=\"itemTitle && childItem ? childItem[itemTitle] : ''\"> &nbsp;{{itemName && childItem ? childItem[itemName] : childItem}}</a> </li> </ng-template> </ng-template> </ng-template> <ng-template [ngIf]=\"grandChildItems && sortedItems\"> <ng-template ngFor let-item [ngForOf]=\"sortedItems\"> <ng-template [ngIf]=\"item[childItems].length > 0\"> <li class=\"list-group-item list-group-item-heading list-group-item-info\" ><b>{{item[grandParentName]}}</b></li> <ng-template ngFor let-childItem [ngForOf]=\"item[childItems]\"> <ng-template ngFor let-grandChildItem of [ngForOf]=\"childItem[grandChildItems] | filter: itemName: filterString\" let-i=\"index\"> <li *ngIf=\"i == 0\" class=\"list-group-item list-group-item-heading list-group-item-info\" >{{childItem[parentName]}}</li> <li  class=\"scrollable-item\"> <a  class=\"dropdown-item\" [ngClass]=\"{'active': selectedItem == grandChildItem}\" (click)=\"selectItem(grandChildItem)\" [title]=\"itemTitle && grandChildItem ? grandChildItem[itemTitle] : ''\"> &nbsp;{{itemName && grandChildItem ? grandChildItem[itemName] : grandChildItem}}</a> </li> </ng-template> </ng-template> </ng-template> </ng-template> </ng-template> </ng-template> </ul> <ng-template></ng-template> </div> <small *ngIf=\"note\" class=\"form-text text-muted\"> <markdown (click)=\"sharedFunctions.getRoute($event)\" [data]=\"note\"></markdown> </small>      </div>",
    styles: ["/* Used to add a scrollable menu to dropdown menus */ .scrollable-menu { height: auto; max-height: 300px; overflow-x: hidden; } .scrollable-menu-fixed { overflow-x: visible; } /* Used to add a scrollable menu to dropdown menus */ .scrollable-list { height: auto; max-height: 400px; overflow-x: hidden; } .disabled-input { color: black; } "],
    providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DexihFormSelectComponent), multi: true }]
})
export class DexihFormSelectComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
    @Input() label: string;
    @Input() labelLeft: string;
    @Input() note: string;
    @Input() errors: string;
    @Input() value: any;
    @Input() iconClass: string; // only displays where there are no elements.
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
    @Input() enableTextEntry = false; // allows text to be entered in addition to selected entries.
    @Input() enableTextEntryMatch = true; // keeps text entry in sync with the value variable.
    @Input() textEntryItems: string[] = [];
    @Input() textEntryNote = 'Enter a value';
    @Input() disabledNote = 'There are no items available for selection.';
    @Input() textValue: string = null;
    @Input() border = true;
    @Input() sortItems = false;
    @Input() enableFilter = true;
    @Input() autoMatchTextEntry = true;
    @Output() textValueChange = new EventEmitter();
    @Input() autocapitalize = 'none';

    @ViewChild(BsDropdownDirective, { static: true }) dropdown: BsDropdownDirective;
    @ViewChild('dropdown', { static: true }) dropdownElement: any;

    id = 'input_' + Math.random().toString(36).substr(2, 9);
    sharedFunctions = new SharedFunctions();

    selectedItem: any;
    selectedName: string;

    filterSubscription: Subscription;
    manualSubscription: Subscription;

    needsUpdate = false;

    filterControl = new FormControl();
    filterString = '';

    sortedItems: Array<any>;

    manualControl = new FormControl();
    doManualControlUpdate = true;

    // contains a list of the items all combine into one array.
    flattenedItems: Array<any>;

    // select index used for maintaining position when using arrows
    selectedIndex: number;

    isDirty = false;

    showDropDown = true;
    disableInput = false;
    placeholder: string;

    onChange: any = () => { };
    onTouched: any = () => { };

    constructor() {

     }

     ngOnInit() {
        // monitor changes to the filter control, and update if updated after 500ms.
        this.manualSubscription = this.manualControl.valueChanges
            .subscribe(newValue => {
                if (this.doManualControlUpdate) {
                    this.needsUpdate = true;
                    this.textValue = newValue;
                    this.selectedItem = null;
                    this.selectedName = this.textValue;

                    let foundItem;
                    if (this.hasValue(newValue) && this.enableTextEntryMatch) {
                        if (this.itemName) {
                            foundItem = this.flattenedItems
                                .find(c => (<string>c[this.itemName]).toLocaleLowerCase() === newValue.toLowerCase());
                            if (this.hasValue(foundItem)) {
                                this.selectedItem = foundItem;
                                this.doManualControlUpdate = false;
                                this.textValue = foundItem[this.itemName];
                                this.manualControl.setValue(foundItem[this.itemName]);
                                if (!this.enableTextEntry) {
                                    this.updateValueFromItem(this.selectedItem);

                                    this.textValueChange.emit(this.textValue);
                                    this.hasChanged(null);
                                }
                            } else if (this.enableTextEntry) {
                                this.selectedItem = newValue;
                            }
                        } else {
                            foundItem = this.flattenedItems.find(c => (<string>c).toLocaleLowerCase() === newValue.toLowerCase());
                            if (this.hasValue(foundItem)) {
                                this.selectedItem = foundItem;
                                this.doManualControlUpdate = false;
                                this.textValue = foundItem;
                                this.manualControl.setValue(foundItem);
                                if (!this.enableTextEntry) {
                                    this.updateValueFromItem(this.selectedItem);
                                    this.textValueChange.emit(this.textValue);
                                    this.hasChanged(null);
                                }
                            } else if (this.enableTextEntry) {
                                this.selectedItem = newValue;
                            }
                        }
                    } else {
                       if (this.allowNullSelect) {
                            this.selectedItem = null;
                       }
                    }

                    if (this.enableTextEntry) {
                        this.updateTextEntry();
                    }

                    if (this.enableFilter) {
                        this.filterString = newValue;
                    }
                }
                this.doManualControlUpdate = true;
            });

         // this.refreshItems();
        // this.filterSubscription = this.manualControl.valueChanges
        //     .pipe(debounceTime(500))
        //     .subscribe(newValue => {
        //         if (this.doManualControlUpdate) {
        //             this.filterString = newValue;
        //         }
        //     });
     }

    ngOnChanges(changes: SimpleChanges) {
        this.refreshItems();

      //  this.writeValue(this.value);
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

    hasValue(value: any): boolean {
        let result = typeof(value) !== 'undefined' && value !== null;
        return result;
    }

    writeValue(value: any) {
        this.selectedItem = null;
        if (this.hasValue(value)) {
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
                    if (this.hasValue(value) && !this.hasValue(this.selectedItem)) {
                        this.setSelectedItem(value, childItems);
                    }
                }
            });
        }
    }

    updateValueFromItem(item: any) {
        if (this.hasValue(item)) {
            if (this.hasValue(this.itemKey)) {
                this.value = item[this.itemKey];
            } else {
                this.value = item;
            }
        } else {
            item = null;
        }
    }

    refreshItems() {
        this.showDropDown = (this.items && this.items.length > 0) ||
        (this.textEntryItems && this.textEntryItems.length > 0) ||
        this.allowNullSelect;

        this.disableInput = !this.showDropDown && !this.enableTextEntry;

        if ((this.enableFilter && this.showDropDown) || this.enableTextEntry) {
            this.placeholder = this.textEntryNote;
        } else {
            this.placeholder = this.disabledNote;
        }

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

        this.flattenedItems = [];
        if (this.childItems) {
            this.items.forEach(parentItem => {
                let childItems = <Array<any>> parentItem[this.childItems];
                if (this.grandChildItems) {
                    childItems.forEach(childItem => {
                        this.flattenedItems = this.flattenedItems.concat(childItem[this.grandChildItems]);
                    });
                } else {
                    this.flattenedItems = this.flattenedItems.concat(childItems);
                }
            });
        } else {
            this.flattenedItems = this.items;
        }
    }

    selectText(item: any) {
        this.dropdown.toggle();
        this.value = item;
        this.textValue = item;
        this.textValueChange.emit(this.textValue);
        this.manualControl.setValue(item);
    }

    selectItem(selectedItem: any, hideDropdown = true) {
        this.needsUpdate = !hideDropdown;

        this.selectedItem = selectedItem;
        if (this.hasValue(selectedItem)) {
            this.updateValueFromItem(selectedItem);

            if (this.hasValue(this.itemName)) {
                this.selectedName = selectedItem[this.itemName];
            } else {
                this.selectedName = selectedItem;
            }

            this.doManualControlUpdate = false;
        } else {
            this.value = null;
            this.selectedName = '';
        }

        this.textValue = this.selectedName;
        this.manualControl.setValue(this.selectedName);
        this.textValueChange.emit(this.textValue);

        this.hasChanged(null);
        if (hideDropdown) { this.dropdown.hide(); }
        // this.updateTextEntry(hideDropdown);
    }

    private setSelectedItem(value: any, items: Array<any>) {
        if (this.hasValue(this.itemKey)) {
            if (this.hasValue(value) && items) {
                this.selectedItem = items.find(c => c[this.itemKey] === value);
            } else {
                this.selectedItem = value;
            }
        } else {
            this.selectedItem = value;
        }

        if (this.hasValue(this.itemName)) {
            if (this.hasValue(value) && items) {
                if (this.selectedItem) {
                    this.selectedName = this.selectedItem[this.itemName];
                }
            } else {
                this.selectedName = this.selectedItem;
            }
        } else {
            this.selectedName = this.selectedItem;
        }

        this.doManualControlUpdate = false;
        this.manualControl.setValue(this.selectedName);
    }

    onTextEntryEnter($event: any) {
        this.updateTextEntry();
    }

    // detect a click outside the control, and hide the dropdown
    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement: any) {
       if (this.needsUpdate) {
            const clickedInside = this.dropdownElement.nativeElement.contains(targetElement);
            if (!clickedInside) {
                this.updateTextEntry();
            }
       }
       if (this.dropdown.isOpen) {
            const clickedInside = this.dropdownElement.nativeElement.contains(targetElement);
            if (!clickedInside) {
                this.dropdown.hide();
        }
       }
    }

    getFilteredItems(): Array<any> {
        if (this.filterString) {
            const filterString = this.filterString.toLowerCase();
            if (this.itemName) {
                return this.flattenedItems.filter(c => c[this.itemName].toLowerCase().includes(filterString) );
            } else {
                return this.flattenedItems.filter(c => c.toLowerCase().includes(filterString));
            }
        } else {
            return this.flattenedItems;
        }
    }

    down() {
        let found = false;
        let nextItem: any = null;
        const filteredItems = this.getFilteredItems();
        filteredItems.forEach(item => {
            if (!nextItem) {
                if (found) {
                    nextItem = item;
                }
                if (this.hasValue(this.itemName) && item[this.itemName].toLowerCase() === this.selectedName.toLowerCase()) {
                    found = true;
                } else if (!this.itemName && item.toLowerCase() === this.selectedName.toLowerCase()) {
                    found = true;
                }
            }
        });

        if (!this.hasValue(nextItem) && filteredItems.length > 0) {
            nextItem = filteredItems[0];
        }

        this.selectItem(nextItem, false);
    }

    up() {
        let found = false;
        let previousItem: any = null;
        let foundItem: any = null;
        const filteredItems = this.getFilteredItems();
        filteredItems.forEach(item => {
            if (!foundItem) {
                if (this.itemName && item[this.itemName].toLowerCase() === this.selectedName.toLowerCase()) {
                    foundItem = previousItem;
                } else if (!this.itemName && item.toLowerCase() === this.selectedName.toLowerCase()) {
                    foundItem = previousItem;
                }
                previousItem = item;
            }
        });

        if (!foundItem && filteredItems.length > 0) {
            foundItem = filteredItems[filteredItems.length - 1];
        }

        this.selectItem(foundItem, false);
    }

    dropdownShow() {
        this.dropdown.show();
    }

    // the timeout is to allow the menu click to occur before closing the dropdown.
    dropdownHide(delay = 500) {
        setTimeout(() => {
            this.dropdown.hide();
        },
        delay);
    }

    dropdownToggle() {
        if (this.items && this.items.length > 0) {
            this.dropdown.toggle(true);
        }
    }

    private updateTextEntry() {
        this.dropdown.toggle();

        if (this.enableTextEntry) {
            // for text entry enabeld, just set the current value and emit.
            this.value = this.selectedItem;
            this.textValueChange.emit(this.textValue);
        } else if (!this.hasValue(this.selectedItem)) {
            // no selected item, then revert to previous one.
            this.doManualControlUpdate = false;
            if (this.hasValue(this.itemName) && this.hasValue(this.value)) {
                let item = this.flattenedItems.find(c => c[this.itemKey] === this.value);
                if (item) {
                    this.textValue = item[this.itemName];
                } else {
                    this.textValue = null;
                }
                this.selectedItem = item;
                this.manualControl.setValue(this.textValue);
                this.textValueChange.emit(this.textValue);
            } else {
                this.manualControl.setValue(this.value);
            }
        } else {
            this.updateValueFromItem(this.selectedItem);
            // if (this.itemName) {
            //     this.textValue = this.value[this.itemName];
            // } else {
            //     this.textValue = this.value;
            // }
            this.textValueChange.emit(this.textValue);
        }

        this.needsUpdate = false;
        this.filterString = '';
        this.onChange(this.value);
        this.onTouched();
        this.isDirty = true;

    }
}
