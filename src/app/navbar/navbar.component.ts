import { Component, Input, Output } from '@angular/core';
import { DataserviceService } from '../services/dataservice.service';
import { SmnApiService } from '../services/smn-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  constructor(private apiSMN: SmnApiService, private dataService: DataserviceService){}

  inputValue = '';
  locations: any;

  searchLocation() {
    if(this.inputValue.length >= 3) {
      this.apiSMN.searchCity(this.inputValue).subscribe(data => {
        this.locations = data;
      })
    } else {
      this.locations = null;
    }
  }

  getDataBySelectedV2(base: number, location: any) {
    this.inputValue = `${location[1]} (${location[2]}), ${location[3]}`;
    this.locations = null;
    this.apiSMN.getDataByCity(base).subscribe(data => {
      this.dataService.updateDataCity(data);
    })

    this.apiSMN.getForecastByCity(base).subscribe(data => {
      this.dataService.updateForecastCity(data);
    })

  }

}
