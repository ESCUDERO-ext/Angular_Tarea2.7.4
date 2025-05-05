import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  standalone: false,
  templateUrl: './directiva.component.html',
  styleUrl: './directiva.component.css'
})
export class DirectivaComponent {

  listaMunicipios: string[] = [
    'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao', 'Málaga', 'Granada', 'Alicante', 'Murcia',
    'Zaragoza', 'Palma', 'Las Palmas de Gran Canaria', 'Córdoba', 'Valladolid', 'Vigo', 'Gijón', 
    'L\'Hospitalet de Llobregat', 'Vitoria-Gasteiz', 'A Coruña', 'Elche', 'Terrassa', 'Badalona', 
    'Oviedo', 'Cartagena', 'Sabadell', 'Jerez de la Frontera', 'Móstoles', 'Santa Cruz de Tenerife', 
    'Pamplona', 'Almería', 'Alcalá de Henares', 'Fuenlabrada', 'Leganés', 'Donostia/San Sebastián', 
    'Getafe', 'Burgos', 'Albacete', 'Santander', 'Castellón de la Plana', 'Alcorcón', 
    'San Cristóbal de La Laguna', 'Logroño', 'Badajoz', 'Salamanca', 'Huelva', 'Marbella', 
    'Lleida', 'Tarragona', 'Dos Hermanas', 'Torrejón de Ardoz', 'Parla', 'Mataró', 'León', 
    'Algeciras', 'Santa Coloma de Gramenet', 'Alcobendas', 'Cádiz', 'Jaén', 'Ourense', 'Reus', 
    'Telde', 'Girona', 'Barakaldo', 'Lugo', 'Santiago de Compostela', 'Roquetas de Mar', 
    'Cáceres', 'Las Rozas de Madrid', 'San Fernando', 'Lorca', 'Sant Cugat del Vallès', 
    'San Sebastián de los Reyes', 'Cornellà de Llobregat', 'El Puerto de Santa María', 
    'Rivas-Vaciamadrid', 'Melilla', 'Pozuelo de Alarcón', 'Guadalajara', 'Toledo', 'Ceuta', 
    'Chiclana de la Frontera', 'Sant Boi de Llobregat', 'El Ejido', 'Talavera de la Reina', 
    'Torrevieja', 'Pontevedra', 'Mijas', 'Torrent', 'Coslada', 'Vélez-Málaga', 'Arona', 
    'Fuengirola', 'Palencia', 'Avilés', 'Getxo', 'Manresa', 'Rubí'
    // Añadir más municipios según lo necesario...
    ];

  habilitar: boolean = true;

  setHabilitar(): void {
    this.habilitar = (this.habilitar == true) ? false : true;
  }

}
