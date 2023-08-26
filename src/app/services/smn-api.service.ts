import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmnApiService {

  tokenTXT = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3ZWIiLCJzY29wZXMiOiJST0xFX1VTRVJfRk9SRUNBU1QsUk9MRV9VU0VSX0dFT1JFRixST0xFX1VTRVJfSElTVE9SWSxST0xFX1VTRVJfSU1BR0VTLFJPTEVfVVNFUl9NQVAsUk9MRV9VU0VSX1JBTktJTkcsUk9MRV9VU0VSX1NUQVRJU1RJQ1MsUk9MRV9VU0VSX1dBUk5JTkcsUk9MRV9VU0VSX1dFQVRIRVIiLCJpYXQiOjE2OTMwNzMwODksImV4cCI6MTY5MzA3NjY4OX0.AO_m1Na-dzzIxJTrkFmqztbUhtg1zd-bVCbaU08aQyI';

  constructor(private http: HttpClient) {
  }

  tokenSMN = this.tokenTXT;

  getAllData(): Observable<any> {
    return this.http.get('https://ws1.smn.gob.ar/v1/weather/location/zoom/2', this.httpOptionsWithToken()); 
  }

  getDataByCity(name:number): Observable<any> {
    return this.http.get('https://ws1.smn.gob.ar/v1/weather/location/'+name, this.httpOptionsWithToken());
  }

  getForecastByCity(name:number): Observable<any> {
    return this.http.get('https://ws1.smn.gob.ar/v1/forecast/location/'+name, this.httpOptionsWithToken());
  }

  searchCity(name:string) {
    return this.http.get('https://ws1.smn.gob.ar/v1/georef/location/search?name='+name, this.httpOptionsWithToken());
  }

  getAlerts(name:number): Observable<any> {
    return this.http.get('https://ws1.smn.gob.ar/v1/warning/alert/location/'+name, this.httpOptionsWithToken());
  }


  httpOptionsWithToken(): object {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `JWT ${this.tokenSMN}`,
      }),
    };
  }





  
}
