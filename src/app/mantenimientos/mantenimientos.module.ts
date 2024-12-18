import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importaciones de Angular Material
import { MantenimientosRoutingModule } from './mantenimientos-routing.module';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table'; // Asegúrate de importar MatTableModule
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';  // Esto es necesario para mat-option
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { ReactiveFormsModule } from '@angular/forms';
import { AlcaldiasComponent } from './alcaldias/alcaldias.component';
import { AlcaldiaFormComponent } from './alcaldias/alcaldia-form/alcaldia-form.component';
import { CentrosAcopioComponent } from './centrosacopio/centrosacopio.component';
import { centrosacopioFormComponent } from './centrosacopio/centrosacopio-form/centroacopio-form.component';
import {MatButtonModule} from '@angular/material/button';






@NgModule({
  declarations: [AlcaldiasComponent, AlcaldiaFormComponent, CentrosAcopioComponent, centrosacopioFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MantenimientosRoutingModule, MatTableModule, MatPaginatorModule, MatCardModule,  MatSortModule, MatSelectModule, MatOptionModule, MatButtonModule]
})
export class MantenimientosModule {}
