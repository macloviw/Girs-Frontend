import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlcaldiasComponent } from './alcaldias/alcaldias.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'alcaldias',
        component: AlcaldiasComponent
      },
      {
        path: 'centros-acopio',
        loadComponent: () => import('./auth-signup/auth-signup.component')
      },
      {
        path: 'disposicion-final',
        loadComponent: () => import('./auth-signup/auth-signup.component')
      },
      {
        path: 'empresas-recoleccion',
        loadComponent: () => import('./auth-signup/auth-signup.component')
      },
      {
        path: 'empresas-valorizacion',
        loadComponent: () => import('./auth-signup/auth-signup.component')
      },
      {
        path: 'estaciones-transferencia',
        loadComponent: () => import('./auth-signup/auth-signup.component')
      },
      {
        path: 'vehiculos',
        loadComponent: () => import('./auth-signup/auth-signup.component')
      },
      {
        path: 'flotillas',
        loadComponent: () => import('./auth-signup/auth-signup.component')
      },
      {
        path: 'ingei',
        loadComponent: () => import('./auth-signup/auth-signup.component')
      },
      {
        path: 'metodos-caracerizacion',
        loadComponent: () => import('./auth-signup/auth-signup.component')
      },
      {
        path: 'metodos-composicion',
        loadComponent: () => import('./auth-signup/auth-signup.component')
      },
      {
        path: 'residuos-marinos',
        loadComponent: () => import('./auth-signup/auth-signup.component')
      },
      {
        path: 'rutas-recoleccion',
        loadComponent: () => import('./auth-signup/auth-signup.component')
      },
      {
        path: 'rep',
        loadComponent: () => import('./auth-signup/auth-signup.component')
      },
      {
        path: 'tipos-recoleccion',
        loadComponent: () => import('./auth-signup/auth-signup.component')
      },
      {
        path: 'tipos-residuos',
        loadComponent: () => import('./auth-signup/auth-signup.component')
      },
      {
        path: 'usuarios',
        loadComponent: () => import('./auth-signup/auth-signup.component')
      }      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientosRoutingModule {}
