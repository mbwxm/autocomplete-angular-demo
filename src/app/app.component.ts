import { Component, OnInit } from '@angular/core';
import { AutocompleteComponent } from 'ngx-sp-ui-autocomplete';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LocationService } from './services/location.service';
import { AutocompleteItem } from './types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AutocompleteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  public get cityAutoCompleteSelectedValue$(): Observable<string> {
    return this.cityAutoCompleteSelectedValueSubject.asObservable()
  }

  public get countryAutoCompleteSelectedValue$(): Observable<string> {
    return this.countryAutoCompleteSelectedValueSubject.asObservable()
  }

  public cities$!: Observable<AutocompleteItem[]>;
  public countries$!: Observable<AutocompleteItem[]>;
  private cityAutoCompleteSelectedValueSubject = new BehaviorSubject<string>('');
  private countryAutoCompleteSelectedValueSubject = new BehaviorSubject<string>('');

  constructor(private locationService: LocationService) { }

  public ngOnInit(): void {
    this.cities$ = this.locationService.getCities();
    this.countries$ = this.locationService.getCountries();
  }

  public cityAutoCompleteItemSelected(itemValue: string): void {
    this.cityAutoCompleteSelectedValueSubject.next(itemValue);
  }

  public countryAutoCompleteItemSelected(itemValue: string): void {
    this.countryAutoCompleteSelectedValueSubject.next(itemValue);
  }

}
