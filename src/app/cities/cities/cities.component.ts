import { Component, OnInit } from '@angular/core';
import { DataserviceService } from 'src/app/services/dataservice.service';
import { SmnApiService } from 'src/app/services/smn-api.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  currentDateTime = new Date();
  
  sortOrderAscending = true;
  allData: any;

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

  constructor(private apiSMN: SmnApiService, private dataService: DataserviceService) {}
  
  
  ngOnInit(): void {

    this.apiSMN.getAllData().subscribe(data => {
      this.allData = data;

      this.allData.sort((a: { temperature: number; }, b: { temperature: number; }) => {
        if (this.sortOrderAscending) {
          return a.temperature - b.temperature; // Orden ascendente
        } else {
          return b.temperature - a.temperature; // Orden descendente
        }
      });

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
