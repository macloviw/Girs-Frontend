import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CentrosAcopioService, CentroAcopio } from '../../services/centrosacopio.service';
import { centrosacopioFormComponent } from './centrosacopio-form/centroacopio-form.component';
import {MatSort} from '@angular/material/sort';




@Component({
  selector: 'app-centrosacopio',
  templateUrl: './centrosacopio.component.html',
  styleUrls: ['./centrosacopio.component.scss'],
})
export class CentrosAcopioComponent implements OnInit {
  centrosacopios: CentroAcopio[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'provincia', 'municipio', 'distrito', 'acciones'];
  dataSource = new MatTableDataSource<CentroAcopio>([]);
  selectedcentrosacopio: CentroAcopio = {
    id: 0,
    nombre: '',
    provinciaCodigo: '',
    municipioCodigo: '',
    distritoMunicipalCodigo: '',
    activo: false,
    createdAt: null,
    updatedAt: null,
    coordenadasUtm: '',
    latitud: '',
    longitud: '',
    capacidadTon: '',
    residuosToneladaMes: '',
    residuosAcopia: '',
    horario: ''
  };
  isEditing: boolean = false;  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private centrosacopiosService: CentrosAcopioService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadcentrosacopios();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadcentrosacopios(): void {
    this.centrosacopiosService.getCentrosAcopio().subscribe(
      (data) => {
        console.log(data); // Asegúrate de que los datos son correctos
        this.centrosacopios = data;
        this.dataSource.data = data; // Asigna los datos a la tabla
      },
      (error) => console.error('Error al cargar las alcaldías', error)
    );
  }

  selectcentrosacopio(centrosacopio: CentroAcopio): void {
    this.selectedcentrosacopio = { ...centrosacopio };
    this.isEditing = true;
  }

  createOrUpdatecentrosacopio(): void {
    if (this.isEditing) {
      this.centrosacopiosService.updateCentroAcopio(this.selectedcentrosacopio.id, this.selectedcentrosacopio).subscribe(
        () => {
          this.loadcentrosacopios();
          this.resetForm();
        },
        (error) => console.error('Error al actualizar la alcaldía', error)
      );
    } else {
      this.centrosacopiosService.createCentroAcopio(this.selectedcentrosacopio).subscribe(
        () => {
          this.loadcentrosacopios();
          this.resetForm();
        },
        (error) => console.error('Error al crear la alcaldía', error)
      );
    }
  }

  async openDialog(centrosacopio?: CentroAcopio): Promise<void>  {
    if(centrosacopio){
      const response: CentroAcopio = await this.centrosacopiosService.getCentroAcopioById(centrosacopio.id).toPromise();
      this.selectedcentrosacopio = response
    }else{
      this.selectedcentrosacopio = {
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
    }
    const dialogRef = this.dialog.open(centrosacopioFormComponent, {
      width: '600px',
      data: { centrosacopio: this.selectedcentrosacopio } // Pasa la alcaldía seleccionada al modal
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadcentrosacopios(); // Recarga la lista de alcaldías después de crear o actualizar
      }
    });
  }  

  deletecentrosacopio(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta alcaldía?')) {
      this.centrosacopiosService.deleteCentroAcopio(id).subscribe(
        () => this.loadcentrosacopios(),
        (error) => console.error('Error al eliminar la alcaldía', error)
      );
    }
  }

  resetForm(): void {

    this.selectedcentrosacopio = {
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
    this.isEditing = false;
  }
}
