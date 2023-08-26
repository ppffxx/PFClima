import { Component, Input, OnInit } from '@angular/core';
import { DataserviceService } from '../services/dataservice.service';
import { SmnApiService } from '../services/smn-api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private apiSMN: SmnApiService, private dataService: DataserviceService) {}

  idForecast = 1;

  
  dataCity: any;
  forecastCity: any;
  currentDateTime!: Date;
  alerts:any;
  existeAlerta = false;
  sunriseSunset: any;

  
  locations: any;
  selectedLocation: any;

  
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

    this.apiSMN.getDataByCity(9117).subscribe(data => {
      this.dataCity = data;
      console.log(this.dataCity)
    })

    this.apiSMN.getSunrise(9117).subscribe(data => {
      console.log(data)
      this.sunriseSunset = data;
    })

    this.dataService.sunrise$.subscribe(data => {
      this.sunriseSunset = data;
    })

    this.dataService.dataCity$.subscribe(data => {
      this.dataCity = data;
    });

    this.dataService.forecastCity$.subscribe(data => {
      this.forecastCity = data;
    });

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

  
}
