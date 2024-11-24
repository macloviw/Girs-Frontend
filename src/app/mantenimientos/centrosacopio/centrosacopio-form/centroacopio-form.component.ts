// centrosacopio-form.component.ts
import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CentrosAcopioService, CentroAcopio } from '../../../services/centrosacopio.service';
import { CentrosAcopioComponent } from '../centrosacopio.component';

@Component({
  selector: 'app-centrosacopio-form',
  templateUrl: './centrosacopio-form.component.html',
  styleUrls: ['./centrosacopio-form.component.scss']
})
export class centrosacopioFormComponent {
  @Input() selectedcentrosacopio: CentroAcopio = {
    id: 0,
    nombre: '',
    provinciaCodigo: '',
    municipioCodigo: '',
    distritoMunicipalCodigo: '',
    activo: false,
    coordenadasUtm: '',
    latitud: '',
    longitud: '',
    capacidadTon: '',
    residuosToneladaMes: '',
    residuosAcopia: '',
    horario: '',
    createdAt: null,
    updatedAt: null
  };
  provincias: any[] = [];
  municipios: any[] = [];
  distritos: any[] = [];  

  isEditing: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CentrosAcopioComponent>,
    private centrosacopiosService: CentrosAcopioService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    if (this.data && this.data.centrosacopio) {
      this.selectedcentrosacopio = this.data.centrosacopio;
      this.isEditing = this.selectedcentrosacopio.id > 0 ? true : false;
    }
    this.loadProvincias();    
  }

  createOrUpdatecentrosacopio(): void {
    if (this.isEditing) {
      this.centrosacopiosService.updateCentroAcopio(this.selectedcentrosacopio.id, this.selectedcentrosacopio).subscribe(
        () => {
          this.dialogRef.close(true); // Cierra el modal y envía un valor de éxito
        },
        (error) => console.error('Error al actualizar la alcaldía', error)
      );
    } else {
      this.centrosacopiosService.createCentroAcopio(this.selectedcentrosacopio).subscribe(
        () => {
          this.dialogRef.close(true); // Cierra el modal y envía un valor de éxito
        },
        (error) => console.error('Error al crear la alcaldía', error)
      );
    }
  }

  cancel(): void {
    this.dialogRef.close(false); // Cierra el modal sin cambios
  }

  // Cargar las provincias
  async loadProvincias() {
    this.centrosacopiosService.getProvincias().subscribe(async provincias => {
      this.provincias = provincias;
      if (this.selectedcentrosacopio.provinciaCodigo) {
        await this.loadMunicipios(this.selectedcentrosacopio.provinciaCodigo);  // Si ya tiene provincia, cargar municipios
      }
    });
  }

  // Cargar los municipios basados en la provincia seleccionada
  async loadMunicipios(provinciaCodigo: string) {
    this.centrosacopiosService.getMunicipios(provinciaCodigo).subscribe(async municipios => {
      this.municipios = municipios;
      if (this.selectedcentrosacopio.municipioCodigo) {
        await this.loadDistritos(this.selectedcentrosacopio.municipioCodigo);  // Si ya tiene municipio, cargar distritos
      }
    });
  }

  // Cargar los distritos basados en el municipio seleccionado
  async loadDistritos(municipioCodigo: string) {
    this.centrosacopiosService.getDistritos(municipioCodigo).subscribe(async distritos => {
      this.distritos = distritos;
    });
  }


}
