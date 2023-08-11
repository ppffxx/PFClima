import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmnApiService {

  constructor(private http: HttpClient) { }

  tokenSMN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3ZWIiLCJzY29wZXMiOiJST0xFX1VTRVJfRk9SRUNBU1QsUk9MRV9VU0VSX0dFT1JFRixST0xFX1VTRVJfSElTVE9SWSxST0xFX1VTRVJfSU1BR0VTLFJPTEVfVVNFUl9NQVAsUk9MRV9VU0VSX1JBTktJTkcsUk9MRV9VU0VSX1NUQVRJU1RJQ1MsUk9MRV9VU0VSX1dBUk5JTkcsUk9MRV9VU0VSX1dFQVRIRVIiLCJpYXQiOjE2OTE3OTMzNTMsImV4cCI6MTY5MTc5Njk1M30.f3aJM3yWtVWC4j3IugWJaJmYuGV9tinUMoCVWXueUrU';

  getAllData(): Observable<any> {
    return this.http.get('https://ws1.smn.gob.ar/v1/weather/location/zoom/1', this.httpOptionsWithToken()); 
  }


  httpOptionsWithToken(): object {
    let token: string | null = this.tokenSMN;
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `JWT ${this.tokenSMN}`,
      }),
    };
  }





  
}
