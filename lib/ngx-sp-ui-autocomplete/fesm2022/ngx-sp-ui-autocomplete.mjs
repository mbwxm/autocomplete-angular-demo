import * as i0 from '@angular/core';
import { EventEmitter, Component, ChangeDetectionStrategy, ViewChild, Input, Output } from '@angular/core';

class AutocompleteComponent {
    renderer;
    KEY_PRESS_EVENTS = {
        ARROW_UP: 'ArrowUp',
        ARROW_DOWN: 'ArrowDown',
        ENTER: 'Enter',
    };
    autoCompleteInput;
    /** The search items for the auto complete to search on */
    searchItems;
    /** The name of the item which are being searched */
    autoCompleteItemName;
    /** The display text in the placeholder of the text input */
    autoCompleteItemPlaceholder;
    /** Optional function to be called when the User selects an item from the autocomplete, the item
     * value is returned as a string */
    autoCompleteSelected = new EventEmitter();
    constructor(renderer) {
        this.renderer = renderer;
    }
    ngAfterViewInit() {
        // TODO: Improve UX by handling common key press events when the search items list is open
        this.renderer.listen(this.autoCompleteInput.nativeElement, 'keydown', (keydownEvent) => {
            switch (keydownEvent.key) {
                case this.KEY_PRESS_EVENTS.ARROW_DOWN:
                    // TODO: Add logic to iterate down the matching items
                    break;
                case this.KEY_PRESS_EVENTS.ARROW_UP:
                    // TODO: Add logic to iterate up the matching items
                    break;
                case this.KEY_PRESS_EVENTS.ENTER:
                    // TODO: Add logic to select the current active matching item
                    break;
            }
        });
        // Close the search items list when the User clicks outside of the search items list
        this.renderer.listen(document, 'click', () => {
            this.closeAutocompleteList();
        });
    }
    filterItems(itemTextInputEvent) {
        const itemSearchTerm = itemTextInputEvent.target.value;
        // Remove any previous search results
        this.closeAutocompleteList();
        if (itemSearchTerm === '') {
            this.autoCompleteSelected.emit('');
            return;
        }
        // Create a DIV to contain the matching search items
        const autocompleteListDiv = this.renderer.createElement('DIV');
        this.renderer.setAttribute(autocompleteListDiv, 'id', `${this.autoCompleteInput.nativeElement.id}-autocomplete-list`);
        this.renderer.setAttribute(autocompleteListDiv, 'class', 'autocomplete-items');
        // Add the DIV as a child of the autocomplete's input
        this.renderer.appendChild(this.autoCompleteInput.nativeElement, autocompleteListDiv);
        // Find the items that start with the search phrase from those in the list and remove any duplicates
        const matchedItems = this.searchItems.filter((itemName) => itemName.name.toLowerCase().startsWith(itemSearchTerm.toLowerCase())).sort((a, b) => a.name.localeCompare(b.name));
        // Remove any duplicates
        const distinctMatchedItems = [...new Set(matchedItems.map((item) => item.name))].map((distinctItem) => {
            return { name: distinctItem };
        });
        // Create a DIV element for each matching item
        distinctMatchedItems.forEach((matchedItem) => {
            // Create a DIV element for each matching item
            const matchedItemElement = this.renderer.createElement('DIV');
            // Highlight matching item with search term
            this.renderer.setProperty(matchedItemElement, 'innerHTML', `<strong>${matchedItem.name.substring(0, itemSearchTerm.length)}</strong>${matchedItem.name.substring(itemSearchTerm.length)}` +
                `<input type="hidden" value="${matchedItem}"></input>`);
            // Add the search value to the text input when it is clicked on
            this.renderer.listen(matchedItemElement, 'click', (matchedItemEvent) => {
                itemTextInputEvent.target.value = matchedItemEvent.target.innerText;
                this.autoCompleteSelected.emit(matchedItemEvent.target.innerText);
                this.closeAutocompleteList();
            });
            // Add the matched item to the auto complete list
            this.renderer.appendChild(autocompleteListDiv, matchedItemElement);
        });
        // Add the auto complete list to the containing div of the auto complete input
        this.renderer.appendChild(this.autoCompleteInput.nativeElement.parentNode, autocompleteListDiv);
    }
    closeAutocompleteList() {
        const autoCompleteSearchResultElement = document.getElementById(`${this.autoCompleteInput.nativeElement.id}-autocomplete-list`);
        if (autoCompleteSearchResultElement) {
            this.renderer.removeChild(this.autoCompleteInput.nativeElement.parentNode, autoCompleteSearchResultElement);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: AutocompleteComponent, deps: [{ token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.3", type: AutocompleteComponent, isStandalone: true, selector: "ngx-sp-ui-autocomplete", inputs: { searchItems: "searchItems", autoCompleteItemName: "autoCompleteItemName", autoCompleteItemPlaceholder: "autoCompleteItemPlaceholder" }, outputs: { autoCompleteSelected: "autoCompleteSelected" }, viewQueries: [{ propertyName: "autoCompleteInput", first: true, predicate: ["autocompleteinput"], descendants: true }], ngImport: i0, template: "<div class=\"autocomplete\">\r\n  <input\r\n    #autocompleteinput\r\n    type=\"text\"\r\n    [name]=\"autoCompleteItemName\"\r\n    [placeholder]=\"autoCompleteItemPlaceholder\"\r\n    (input)=\"filterItems($event)\">\r\n</div>\r\n", styles: [".autocomplete{position:relative}input{border:1px solid #ccc;background-color:#fff;padding:8px;border-radius:.6rem}input[type=text]{width:100%}.autocomplete-items{position:absolute;border:1px solid #d4d4d4;border-bottom:none;border-top:none;z-index:99;top:100%;left:0;right:0;max-height:90vh;overflow:auto}.autocomplete-items div{padding:10px;cursor:pointer;background-color:#fff;border-bottom:1px solid #d4d4d4;font:14px Arial}.autocomplete-items div:hover{background-color:#e9e9e9}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: AutocompleteComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-sp-ui-autocomplete', standalone: true, imports: [], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"autocomplete\">\r\n  <input\r\n    #autocompleteinput\r\n    type=\"text\"\r\n    [name]=\"autoCompleteItemName\"\r\n    [placeholder]=\"autoCompleteItemPlaceholder\"\r\n    (input)=\"filterItems($event)\">\r\n</div>\r\n", styles: [".autocomplete{position:relative}input{border:1px solid #ccc;background-color:#fff;padding:8px;border-radius:.6rem}input[type=text]{width:100%}.autocomplete-items{position:absolute;border:1px solid #d4d4d4;border-bottom:none;border-top:none;z-index:99;top:100%;left:0;right:0;max-height:90vh;overflow:auto}.autocomplete-items div{padding:10px;cursor:pointer;background-color:#fff;border-bottom:1px solid #d4d4d4;font:14px Arial}.autocomplete-items div:hover{background-color:#e9e9e9}\n"] }]
        }], ctorParameters: () => [{ type: i0.Renderer2 }], propDecorators: { autoCompleteInput: [{
                type: ViewChild,
                args: ['autocompleteinput']
            }], searchItems: [{
                type: Input
            }], autoCompleteItemName: [{
                type: Input
            }], autoCompleteItemPlaceholder: [{
                type: Input
            }], autoCompleteSelected: [{
                type: Output
            }] } });

/*
 * Public API Surface of ngx-sp-ui-autocomplete
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AutocompleteComponent };
//# sourceMappingURL=ngx-sp-ui-autocomplete.mjs.map
