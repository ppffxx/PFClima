import { Component, OnInit } from '@angular/core';
import { SmnApiService } from '../services/smn-api.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private apiSMN: SmnApiService) {}

  idForecast = 1;

  allData: any;
  dataCity: any;
  forecastCity: any;
  currentDateTime!: Date;
  alerts:any;
  existeAlerta = false;

  inputValue = '';
  locations: any;
  selectedLocation: any;

  sortOrderAscending = true;

  classByDescription: {[descripcion:string]: string} = {
    "lluvia": "lluvia-claro",
    "nevada": "nevadas-claro",
    "neblina": "niebla-claro",
    "humo": "niebla-claro",
    "viento": "viento-claro",
    "tormenta": "tormenta-oscuro",
    "ventisca": "ventisca-claro",
    "Despejado": "despejado-claro",
    "Ventoso": "viento-claro",
    "Nublado": "nublado-claro",
    "Ligeramente nublado": "nublado-claro",
    "Algo nublado": "nublado-claro",
    "Parcialmente nublado": "nublado-claro",
    "Mayormente nublado": "nublado-claro",
    "Cubierto": "nublado-claro",
    "Neblina": "niebla-claro",
    "Niebla": "niebla-claro",
    "Llovizna": "lluvia-claro",
    "Lluvias": "lluvia-claro",
    "Chaparrones": "lluvia-claro",
    "Tormentas": "tormenta-oscuro",
    "Nevadas": "nevadas-claro",
    "Ventisca": "ventisca-claro"
  }

  iconByDescription: {[descripcion:string]: number} = {
    "Despejado": 5,
    "Ligeramente nublado": 14,
    "Algo nublado": 20,
    "Parcialmente nublado": 26,
    "Mayormente nublado": 38,
    "Chaparrones": 75
  }


  ngOnInit(): void {

    this.currentDateTime = new Date();

    this.apiSMN.getAllData().subscribe(data => {
      this.allData = data;
      //this.allData.sort((a: { temperature: number; }, b: { temperature: number; }) => b.temperature - a.temperature);
      //console.log(this.allData)

      this.allData.sort((a: { temperature: number; }, b: { temperature: number; }) => {
        if (this.sortOrderAscending) {
          return a.temperature - b.temperature; // Orden ascendente
        } else {
          return b.temperature - a.temperature; // Orden descendente
        }
      });

    })

    this.apiSMN.getDataByCity(9117).subscribe(data => {
      this.dataCity = data;
      //console.log(this.dataCity)
    })

    this.apiSMN.getAlerts(4856).subscribe(data => {
      this.alerts = data;
      if(this.alerts.reports !='') {
        this.existeAlerta = true;
      } else {
        this.existeAlerta = false;
      }
    })

    this.apiSMN.getForecastByCity(9117).subscribe(data => {
      this.forecastCity = data;
      console.log(this.forecastCity)
    })

    
    

    

  }


  sort() {
    this.sortOrderAscending=!this.sortOrderAscending;
    this.allData.sort((a: { temperature: number; }, b: { temperature: number; }) => {
      if (this.sortOrderAscending) {
        return a.temperature - b.temperature; // Orden ascendente
      } else {
        return b.temperature - a.temperature; // Orden descendente
      }
    });

  }

  getClassByDescription(description: string | null):string {
    const keys = Object.keys(this.classByDescription);
    for (const key of keys) {
      if (description?.includes(key)) {
        if((this.currentDateTime.getHours() >= 20 || this.currentDateTime.getHours() <= 6) && (description == 'Despejado')) {
          return 'despejado-noche';
        }
        return this.classByDescription[key];
      }
    }
    return "nublado-claro";
  }


  getClassByDescriptionForecast(description: string | null):string {
    const keys = Object.keys(this.classByDescription);
    for (const key of keys) {
      if (description?.includes(key)) {
        return this.classByDescription[key];
      }
    }
    return "nublado-claro";
  }


  geticonByDescription(description: string, icon:string):string {
    const keys = Object.keys(this.iconByDescription);
    if(this.currentDateTime.getHours() >= 20 || this.currentDateTime.getHours() <= 6 ) {
      for (const key of keys) {
        if (description?.includes(key)) {
          return ""+this.iconByDescription[key];
        }
      }
    }
    return icon;
  }


  searchLocation() {
    if(this.inputValue.length >= 3) {
      this.apiSMN.searchCity(this.inputValue).subscribe(data => {
        this.locations = data;
        //console.log(data);
      })
    } else {
      this.locations = null;
    }
  }


  // getDataBySelected() {
  //   this.apiSMN.getDataByCity(this.selectedLocation).subscribe(data => {
  //     this.dataCity = data;
  //     console.log(this.dataCity)
  //   })
  // }


  getDataBySelectedV2(base: number, location: any) {
    this.inputValue = `${location[1]} (${location[2]}), ${location[3]}`;
    this.locations = null;
    this.apiSMN.getDataByCity(base).subscribe(data => {
      this.dataCity = data;
    })

    this.apiSMN.getForecastByCity(base).subscribe(data => {
      this.forecastCity = data;
      console.log(this.forecastCity)
    })

  }

}
