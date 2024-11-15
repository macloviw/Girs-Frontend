// alcaldia-form.component.ts
import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlcaldiasService, Alcaldia } from '../../../services/alcaldia.service';

@Component({
  selector: 'app-alcaldia-form',
  templateUrl: './alcaldia-form.component.html',
  styleUrls: ['./alcaldia-form.component.scss']
})
export class AlcaldiaFormComponent {
  @Input() selectedAlcaldia: Alcaldia = {
    id: 0,
    nombre: '',
    provinciaCodigo: '',
    municipioCodigo: '',
    distritoMunicipalCodigo: '',
    activo: false,
    createdAt: null,
    updatedAt: null
  };
  provincias: any[] = [];
  municipios: any[] = [];
  distritos: any[] = [];  

  isEditing: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AlcaldiaFormComponent>,
    private alcaldiasService: AlcaldiasService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    if (this.data && this.data.alcaldia) {
      this.selectedAlcaldia = this.data.alcaldia;
      this.isEditing = true;
    }
    this.loadProvincias();    
  }

  createOrUpdateAlcaldia(): void {
    if (this.isEditing) {
      this.alcaldiasService.updateAlcaldia(this.selectedAlcaldia.id, this.selectedAlcaldia).subscribe(
        () => {
          this.dialogRef.close(true); // Cierra el modal y envía un valor de éxito
        },
        (error) => console.error('Error al actualizar la alcaldía', error)
      );
    } else {
      this.alcaldiasService.createAlcaldia(this.selectedAlcaldia).subscribe(
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
    this.alcaldiasService.getProvincias().subscribe(async provincias => {
      this.provincias = provincias;
      if (this.selectedAlcaldia.provinciaCodigo) {
        await this.loadMunicipios(this.selectedAlcaldia.provinciaCodigo);  // Si ya tiene provincia, cargar municipios
      }
    });
  }

  // Cargar los municipios basados en la provincia seleccionada
  async loadMunicipios(provinciaCodigo: string) {
    this.alcaldiasService.getMunicipios(provinciaCodigo).subscribe(async municipios => {
      this.municipios = municipios;
      if (this.selectedAlcaldia.municipioCodigo) {
        await this.loadDistritos(this.selectedAlcaldia.municipioCodigo);  // Si ya tiene municipio, cargar distritos
      }
    });
  }

  // Cargar los distritos basados en el municipio seleccionado
  async loadDistritos(municipioCodigo: string) {
    this.alcaldiasService.getDistritos(municipioCodigo).subscribe(async distritos => {
      this.distritos = distritos;
    });
  }


}
