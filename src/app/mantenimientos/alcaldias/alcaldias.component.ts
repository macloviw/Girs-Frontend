import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlcaldiasService, Alcaldia } from '../../services/alcaldia.service';
import { AlcaldiaFormComponent } from './alcaldia-form/alcaldia-form.component';
import {MatSort} from '@angular/material/sort';




@Component({
  selector: 'app-alcaldia',
  templateUrl: './alcaldias.component.html',
  styleUrls: ['./alcaldias.component.scss'],
})
export class AlcaldiasComponent implements OnInit {
  alcaldias: Alcaldia[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'provincia', 'municipio', 'distrito', 'acciones'];
  dataSource = new MatTableDataSource<Alcaldia>([]);
  selectedAlcaldia: Alcaldia = {
    id: 0,
    nombre: '',
    provinciaCodigo: '',
    municipioCodigo: '',
    distritoMunicipalCodigo: '',
    activo: false,
    createdAt: null,
    updatedAt: null
  };
  isEditing: boolean = false;  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private alcaldiasService: AlcaldiasService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAlcaldias();
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

  loadAlcaldias(): void {
    this.alcaldiasService.getAlcaldias().subscribe(
      (data) => {
        console.log(data); // Asegúrate de que los datos son correctos
        this.alcaldias = data;
        this.dataSource.data = data; // Asigna los datos a la tabla
      },
      (error) => console.error('Error al cargar las alcaldías', error)
    );
  }

  selectAlcaldia(alcaldia: Alcaldia): void {
    this.selectedAlcaldia = { ...alcaldia };
    this.isEditing = true;
  }

  createOrUpdateAlcaldia(): void {
    if (this.isEditing) {
      this.alcaldiasService.updateAlcaldia(this.selectedAlcaldia.id, this.selectedAlcaldia).subscribe(
        () => {
          this.loadAlcaldias();
          this.resetForm();
        },
        (error) => console.error('Error al actualizar la alcaldía', error)
      );
    } else {
      this.alcaldiasService.createAlcaldia(this.selectedAlcaldia).subscribe(
        () => {
          this.loadAlcaldias();
          this.resetForm();
        },
        (error) => console.error('Error al crear la alcaldía', error)
      );
    }
  }

  async openDialog(alcaldia?: Alcaldia): Promise<void>  {
    if(alcaldia){
      const response: Alcaldia = await this.alcaldiasService.getAlcaldiaById(alcaldia.id).toPromise();
      this.selectedAlcaldia = response
    }else{
      this.selectedAlcaldia = {
        id: 0,
        nombre: '',
        provinciaCodigo: '',
        municipioCodigo: '',
        distritoMunicipalCodigo: '',
        activo: false,
        createdAt: null,
        updatedAt: null
      };
    }
    const dialogRef = this.dialog.open(AlcaldiaFormComponent, {
      width: '400px',
      data: { alcaldia: this.selectedAlcaldia } // Pasa la alcaldía seleccionada al modal
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadAlcaldias(); // Recarga la lista de alcaldías después de crear o actualizar
      }
    });
  }  

  deleteAlcaldia(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta alcaldía?')) {
      this.alcaldiasService.deleteAlcaldia(id).subscribe(
        () => this.loadAlcaldias(),
        (error) => console.error('Error al eliminar la alcaldía', error)
      );
    }
  }

  resetForm(): void {

    this.selectedAlcaldia = {
      id: 0,
      nombre: '',
      provinciaCodigo: '',
      municipioCodigo: '',
      distritoMunicipalCodigo: '',
      activo: false,
      createdAt: null,
      updatedAt: null
    };
    this.isEditing = false;
  }
}
