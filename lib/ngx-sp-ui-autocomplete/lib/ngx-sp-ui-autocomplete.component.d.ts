import { AfterViewInit, ElementRef, EventEmitter, Renderer2 } from '@angular/core';
import { AutocompleteItem } from './types';
import * as i0 from "@angular/core";
export declare class AutocompleteComponent implements AfterViewInit {
    renderer: Renderer2;
    readonly KEY_PRESS_EVENTS: {
        readonly ARROW_UP: "ArrowUp";
        readonly ARROW_DOWN: "ArrowDown";
        readonly ENTER: "Enter";
    };
    autoCompleteInput: ElementRef;
    /** The search items for the auto complete to search on */
    searchItems: AutocompleteItem[];
    /** The name of the item which are being searched */
    autoCompleteItemName: string;
    /** The display text in the placeholder of the text input */
    autoCompleteItemPlaceholder: string;
    /** Optional function to be called when the User selects an item from the autocomplete, the item
     * value is returned as a string */
    autoCompleteSelected: EventEmitter<string>;
    constructor(renderer: Renderer2);
    ngAfterViewInit(): void;
    filterItems(itemTextInputEvent: InputEvent): void;
    private closeAutocompleteList;
    static ɵfac: i0.ɵɵFactoryDeclaration<AutocompleteComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AutocompleteComponent, "ngx-sp-ui-autocomplete", never, { "searchItems": { "alias": "searchItems"; "required": false; }; "autoCompleteItemName": { "alias": "autoCompleteItemName"; "required": false; }; "autoCompleteItemPlaceholder": { "alias": "autoCompleteItemPlaceholder"; "required": false; }; }, { "autoCompleteSelected": "autoCompleteSelected"; }, never, never, true, never>;
}
