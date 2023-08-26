import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor() { }


  private dataCitySubject = new BehaviorSubject<any>(null);
  private forecastCitySubject = new BehaviorSubject<any>(null);
  private sunriseSubjetc = new BehaviorSubject<any>(null);

  dataCity$ = this.dataCitySubject.asObservable();
  forecastCity$ = this.forecastCitySubject.asObservable();
  sunrise$ = this.sunriseSubjetc.asObservable();

  updateDataCity(data: any) {
    this.dataCitySubject.next(data);
  }

  updateForecastCity(data: any) {
    this.forecastCitySubject.next(data);
  }

  updateSunrise(data: any) {
    this.sunriseSubjetc.next(data);
  }

}
