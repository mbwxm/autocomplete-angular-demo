import { TestBed } from '@angular/core/testing';
import { LocationService } from './location.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

const mockCities = [ { name: 'Wrexham' }, { name: 'Chester' }, { name: 'Liverpool' }, { name: 'Manchester' }, { name: 'Birmingham' }];
const mockCountries = [{ name: 'France' }, { name: 'Germany' }, { name: 'Japan' }, { name: 'United Kingdom' }, { name: 'Thailand' }];

describe('LocationService', () => {
  let service: LocationService;
  let httpController: HttpTestingController;
  let url = 'http://localhost:8080';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(LocationService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getCities and return an array of cities', () => {
    service.getCities().subscribe((res) => {
      expect(res).toEqual(mockCities);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/cities`,
    });
    req.flush(mockCities);
  });

  it('should call getCountries and return an array of countries', () => {
    service.getCountries().subscribe((res) => {
      expect(res).toEqual(mockCountries);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/countries`,
    });
    req.flush(mockCountries);
  });
});
