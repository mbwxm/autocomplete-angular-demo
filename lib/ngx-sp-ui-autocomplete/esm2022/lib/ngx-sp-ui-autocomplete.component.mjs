import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import * as i0 from "@angular/core";
export class AutocompleteComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNwLXVpLWF1dG9jb21wbGV0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtc3AtdWktYXV0b2NvbXBsZXRlL3NyYy9saWIvbmd4LXNwLXVpLWF1dG9jb21wbGV0ZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtc3AtdWktYXV0b2NvbXBsZXRlL3NyYy9saWIvbmd4LXNwLXVpLWF1dG9jb21wbGV0ZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLHVCQUF1QixFQUFFLFNBQVMsRUFBYyxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBYSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBV2pKLE1BQU0sT0FBTyxxQkFBcUI7SUFzQmI7SUFwQlYsZ0JBQWdCLEdBQUc7UUFDMUIsUUFBUSxFQUFFLFNBQVM7UUFDbkIsVUFBVSxFQUFFLFdBQVc7UUFDdkIsS0FBSyxFQUFFLE9BQU87S0FDTixDQUFDO0lBRTRCLGlCQUFpQixDQUFhO0lBQ3JFLDBEQUEwRDtJQUMxQyxXQUFXLENBQXFCO0lBRWhELG9EQUFvRDtJQUNwQyxvQkFBb0IsQ0FBUztJQUU3Qyw0REFBNEQ7SUFDNUMsMkJBQTJCLENBQVM7SUFFcEQ7dUNBQ21DO0lBQ2xCLG9CQUFvQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFFbkUsWUFBbUIsUUFBbUI7UUFBbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztJQUFJLENBQUM7SUFFcEMsZUFBZTtRQUNwQiwwRkFBMEY7UUFDMUYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUUsQ0FBQyxZQUEyQixFQUFFLEVBQUU7WUFDcEcsUUFBTyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ3hCLEtBQUssSUFBSSxDQUFD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QUUsbUJBR00sdUJBQXVCLENBQUMsTUFBTTs4RUFVUixpQkFBaUI7c0JBQXZELFNBQVM7dUJBQUMsbUJBQW1CO2dCQUVkLFdBQVc7c0JBQTFCLEtBQUs7Z0JBR1Usb0JBQW9CO3NCQUFuQyxLQUFLO2dCQUdVLDJCQUEyQjtzQkFBMUMsS0FBSztnQkFJVyxvQkFBb0I7c0JBQXBDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFJlbmRlcmVyMiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEF1dG9jb21wbGV0ZUl0ZW0gfSBmcm9tICcuL3R5cGVzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmd4LXNwLXVpLWF1dG9jb21wbGV0ZScsXHJcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcclxuICBpbXBvcnRzOiBbXSxcclxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LXNwLXVpLWF1dG9jb21wbGV0ZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmw6ICcuL25neC1zcC11aS1hdXRvY29tcGxldGUuY29tcG9uZW50LnNjc3MnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBdXRvY29tcGxldGVDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcclxuXHJcbiAgcmVhZG9ubHkgS0VZX1BSRVNTX0VWRU5UUyA9IHtcclxuICAgIEFSUk9XX1VQOiAnQXJyb3dVcCcsXHJcbiAgICBBUlJPV19ET1dOOiAnQXJyb3dEb3duJyxcclxuICAgIEVOVEVSOiAnRW50ZXInLFxyXG4gIH0gYXMgY29uc3Q7XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ2F1dG9jb21wbGV0ZWlucHV0JykgcHVibGljIGF1dG9Db21wbGV0ZUlucHV0OiBFbGVtZW50UmVmO1xyXG4gIC8qKiBUaGUgc2VhcmNoIGl0ZW1zIGZvciB0aGUgYXV0byBjb21wbGV0ZSB0byBzZWFyY2ggb24gKi9cclxuICBASW5wdXQoKSBwdWJsaWMgc2VhcmNoSXRlbXM6IEF1dG9jb21wbGV0ZUl0ZW1bXTtcclxuXHJcbiAgLyoqIFRoZSBuYW1lIG9mIHRoZSBpdGVtIHdoaWNoIGFyZSBiZWluZyBzZWFyY2hlZCAqL1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBhdXRvQ29tcGxldGVJdGVtTmFtZTogc3RyaW5nO1xyXG5cclxuICAvKiogVGhlIGRpc3BsYXkgdGV4dCBpbiB0aGUgcGxhY2Vob2xkZXIgb2YgdGhlIHRleHQgaW5wdXQgKi9cclxuICBASW5wdXQoKSBwdWJsaWMgYXV0b0NvbXBsZXRlSXRlbVBsYWNlaG9sZGVyOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBPcHRpb25hbCBmdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgVXNlciBzZWxlY3RzIGFuIGl0ZW0gZnJvbSB0aGUgYXV0b2NvbXBsZXRlLCB0aGUgaXRlbVxyXG4gICAqIHZhbHVlIGlzIHJldHVybmVkIGFzIGEgc3RyaW5nICovXHJcbiAgQE91dHB1dCgpIHB1YmxpYyBhdXRvQ29tcGxldGVTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMikgeyB9XHJcblxyXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICAvLyBUT0RPOiBJbXByb3ZlIFVYIGJ5IGhhbmRsaW5nIGNvbW1vbiBrZXkgcHJlc3MgZXZlbnRzIHdoZW4gdGhlIHNlYXJjaCBpdGVtcyBsaXN0IGlzIG9wZW5cclxuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuYXV0b0NvbXBsZXRlSW5wdXQubmF0aXZlRWxlbWVudCwgJ2tleWRvd24nLCAoa2V5ZG93bkV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgIHN3aXRjaChrZXlkb3duRXZlbnQua2V5KSB7XHJcbiAgICAgICAgY2FzZSB0aGlzLktFWV9QUkVTU19FVkVOVFMuQVJST1dfRE9XTjpcclxuICAgICAgICAgIC8vIFRPRE86IEFkZCBsb2dpYyB0byBpdGVyYXRlIGRvd24gdGhlIG1hdGNoaW5nIGl0ZW1zXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIHRoaXMuS0VZX1BSRVNTX0VWRU5UUy5BUlJPV19VUDpcclxuICAgICAgICAgIC8vIFRPRE86IEFkZCBsb2dpYyB0byBpdGVyYXRlIHVwIHRoZSBtYXRjaGluZyBpdGVtc1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSB0aGlzLktFWV9QUkVTU19FVkVOVFMuRU5URVI6XHJcbiAgICAgICAgICAvLyBUT0RPOiBBZGQgbG9naWMgdG8gc2VsZWN0IHRoZSBjdXJyZW50IGFjdGl2ZSBtYXRjaGluZyBpdGVtXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQ2xvc2UgdGhlIHNlYXJjaCBpdGVtcyBsaXN0IHdoZW4gdGhlIFVzZXIgY2xpY2tzIG91dHNpZGUgb2YgdGhlIHNlYXJjaCBpdGVtcyBsaXN0XHJcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudCwgJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmNsb3NlQXV0b2NvbXBsZXRlTGlzdCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZmlsdGVySXRlbXMoaXRlbVRleHRJbnB1dEV2ZW50OiBJbnB1dEV2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCBpdGVtU2VhcmNoVGVybTogc3RyaW5nID0gKGl0ZW1UZXh0SW5wdXRFdmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XHJcblxyXG4gICAgLy8gUmVtb3ZlIGFueSBwcmV2aW91cyBzZWFyY2ggcmVzdWx0c1xyXG4gICAgdGhpcy5jbG9zZUF1dG9jb21wbGV0ZUxpc3QoKTtcclxuXHJcbiAgICBpZiAoaXRlbVNlYXJjaFRlcm0gPT09ICcnKSB7XHJcbiAgICAgIHRoaXMuYXV0b0NvbXBsZXRlU2VsZWN0ZWQuZW1pdCgnJyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDcmVhdGUgYSBESVYgdG8gY29udGFpbiB0aGUgbWF0Y2hpbmcgc2VhcmNoIGl0ZW1zXHJcbiAgICBjb25zdCBhdXRvY29tcGxldGVMaXN0RGl2ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdESVYnKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGF1dG9jb21wbGV0ZUxpc3REaXYsICdpZCcsIGAke3RoaXMuYXV0b0NvbXBsZXRlSW5wdXQubmF0aXZlRWxlbWVudC5pZH0tYXV0b2NvbXBsZXRlLWxpc3RgKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGF1dG9jb21wbGV0ZUxpc3REaXYsICdjbGFzcycsICdhdXRvY29tcGxldGUtaXRlbXMnKTtcclxuXHJcbiAgICAvLyBBZGQgdGhlIERJViBhcyBhIGNoaWxkIG9mIHRoZSBhdXRvY29tcGxldGUncyBpbnB1dFxyXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmF1dG9Db21wbGV0ZUlucHV0Lm5hdGl2ZUVsZW1lbnQsIGF1dG9jb21wbGV0ZUxpc3REaXYpO1xyXG5cclxuICAgIC8vIEZpbmQgdGhlIGl0ZW1zIHRoYXQgc3RhcnQgd2l0aCB0aGUgc2VhcmNoIHBocmFzZSBmcm9tIHRob3NlIGluIHRoZSBsaXN0IGFuZCByZW1vdmUgYW55IGR1cGxpY2F0ZXNcclxuICAgIGNvbnN0IG1hdGNoZWRJdGVtcyA9IHRoaXMuc2VhcmNoSXRlbXMuZmlsdGVyKChpdGVtTmFtZTogQXV0b2NvbXBsZXRlSXRlbSkgPT5cclxuICAgICAgaXRlbU5hbWUubmFtZS50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoaXRlbVNlYXJjaFRlcm0udG9Mb3dlckNhc2UoKSkpLnNvcnQoKGEsIGIpID0+IGEubmFtZS5sb2NhbGVDb21wYXJlKGIubmFtZSkpO1xyXG5cclxuICAgIC8vIFJlbW92ZSBhbnkgZHVwbGljYXRlc1xyXG4gICAgY29uc3QgZGlzdGluY3RNYXRjaGVkSXRlbXMgPSBbLi4uIG5ldyBTZXQobWF0Y2hlZEl0ZW1zLm1hcCgoaXRlbSkgPT4gaXRlbS5uYW1lKSldLm1hcCgoZGlzdGluY3RJdGVtOiBzdHJpbmcpPT57XHJcbiAgICAgIHJldHVybiB7IG5hbWUgOiBkaXN0aW5jdEl0ZW0gfSBhcyBBdXRvY29tcGxldGVJdGVtO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQ3JlYXRlIGEgRElWIGVsZW1lbnQgZm9yIGVhY2ggbWF0Y2hpbmcgaXRlbVxyXG4gICAgZGlzdGluY3RNYXRjaGVkSXRlbXMuZm9yRWFjaCgobWF0Y2hlZEl0ZW06IEF1dG9jb21wbGV0ZUl0ZW0pID0+IHtcclxuICAgICAgLy8gQ3JlYXRlIGEgRElWIGVsZW1lbnQgZm9yIGVhY2ggbWF0Y2hpbmcgaXRlbVxyXG4gICAgICBjb25zdCBtYXRjaGVkSXRlbUVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xyXG5cclxuICAgICAgLy8gSGlnaGxpZ2h0IG1hdGNoaW5nIGl0ZW0gd2l0aCBzZWFyY2ggdGVybVxyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KG1hdGNoZWRJdGVtRWxlbWVudCwgJ2lubmVySFRNTCcsXHJcbiAgICAgICAgYDxzdHJvbmc+JHttYXRjaGVkSXRlbS5uYW1lLnN1YnN0cmluZygwLCBpdGVtU2VhcmNoVGVybS5sZW5ndGgpfTwvc3Ryb25nPiR7bWF0Y2hlZEl0ZW0ubmFtZS5zdWJzdHJpbmcoaXRlbVNlYXJjaFRlcm0ubGVuZ3RoKX1gICtcclxuICAgICAgICBgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIiR7bWF0Y2hlZEl0ZW19XCI+PC9pbnB1dD5gKTtcclxuXHJcbiAgICAgIC8vIEFkZCB0aGUgc2VhcmNoIHZhbHVlIHRvIHRoZSB0ZXh0IGlucHV0IHdoZW4gaXQgaXMgY2xpY2tlZCBvblxyXG4gICAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihtYXRjaGVkSXRlbUVsZW1lbnQsICdjbGljaycsIChtYXRjaGVkSXRlbUV2ZW50OiBQb2ludGVyRXZlbnQpID0+IHtcclxuICAgICAgICAoaXRlbVRleHRJbnB1dEV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IChtYXRjaGVkSXRlbUV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS5pbm5lclRleHQ7XHJcbiAgICAgICAgdGhpcy5hdXRvQ29tcGxldGVTZWxlY3RlZC5lbWl0KChtYXRjaGVkSXRlbUV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS5pbm5lclRleHQpO1xyXG4gICAgICAgIHRoaXMuY2xvc2VBdXRvY29tcGxldGVMaXN0KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBBZGQgdGhlIG1hdGNoZWQgaXRlbSB0byB0aGUgYXV0byBjb21wbGV0ZSBsaXN0XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoYXV0b2NvbXBsZXRlTGlzdERpdiwgbWF0Y2hlZEl0ZW1FbGVtZW50KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEFkZCB0aGUgYXV0byBjb21wbGV0ZSBsaXN0IHRvIHRoZSBjb250YWluaW5nIGRpdiBvZiB0aGUgYXV0byBjb21wbGV0ZSBpbnB1dFxyXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmF1dG9Db21wbGV0ZUlucHV0Lm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZSwgYXV0b2NvbXBsZXRlTGlzdERpdik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNsb3NlQXV0b2NvbXBsZXRlTGlzdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGF1dG9Db21wbGV0ZVNlYXJjaFJlc3VsdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHt0aGlzLmF1dG9Db21wbGV0ZUlucHV0Lm5hdGl2ZUVsZW1lbnQuaWR9LWF1dG9jb21wbGV0ZS1saXN0YCk7XHJcbiAgICBpZiAoYXV0b0NvbXBsZXRlU2VhcmNoUmVzdWx0RWxlbWVudCkge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNoaWxkKHRoaXMuYXV0b0NvbXBsZXRlSW5wdXQubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLCBhdXRvQ29tcGxldGVTZWFyY2hSZXN1bHRFbGVtZW50KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiPGRpdiBjbGFzcz1cImF1dG9jb21wbGV0ZVwiPlxyXG4gIDxpbnB1dFxyXG4gICAgI2F1dG9jb21wbGV0ZWlucHV0XHJcbiAgICB0eXBlPVwidGV4dFwiXHJcbiAgICBbbmFtZV09XCJhdXRvQ29tcGxldGVJdGVtTmFtZVwiXHJcbiAgICBbcGxhY2Vob2xkZXJdPVwiYXV0b0NvbXBsZXRlSXRlbVBsYWNlaG9sZGVyXCJcclxuICAgIChpbnB1dCk9XCJmaWx0ZXJJdGVtcygkZXZlbnQpXCI+XHJcbjwvZGl2PlxyXG4iXX0=