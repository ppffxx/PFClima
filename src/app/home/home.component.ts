import { Component, OnInit } from '@angular/core';
import { SmnApiService } from '../services/smn-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private apiSMN: SmnApiService) {}
  
  allData: any;

  classByDescription: {[descripcion:string]: string} = {
    "lluvia": "lluvia-claro",
    "nevada": "nevadas-claro",
    "neblina": "niebla-claro",
    "humo": "niebla-claro",
    "viento": "viento-claro",
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


  ngOnInit(): void {

    this.apiSMN.getAllData().subscribe(data => {
      this.allData = data;
    })

    // this.allData.sort((a: { temperature: number; }, b: { temperature: number; }) => b.temperature - a.temperature);
    

    

  }

  getClassByDescription(description: string):string {
    const keys = Object.keys(this.classByDescription);
    for (const key of keys) {
      if (description.includes(key)) {
        return this.classByDescription[key];
      }
    }
    return "nublado-claro";
  }


}
