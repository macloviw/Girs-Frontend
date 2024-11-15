import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'dashboard',
    title: 'Inicio',
    type: 'item',
    url: '/dashboard',
    icon: 'feather icon-home',
    classes: 'nav-item'
  },
  {
    id: 'entrada-datos',
    title: 'Entrada de datos',
    type: 'item',
    url: '/entrada-datos',
    icon: 'feather icon-home',
    classes: 'nav-item'
  },
  {
    id: 'reportes-privados',
    title: 'Reportes privados',
    type: 'item',
    url: '/reportes-privados',
    icon: 'feather icon-home',
    classes: 'nav-item'
  },    
  {
    id: 'reportes-publicos',
    title: 'Reportes públicos',
    type: 'item',
    url: '/reportes-publicos',
    icon: 'feather icon-home',
    classes: 'nav-item'
  },  
  {
    "id": "ui-element",
    "title": "Mantenimientos",
    "type": "group",
    "icon": "icon-ui",
    "children": [
      {
        "id": "alcaldias",
        "title": "Alcaldías",
        "type": "item",
        "url": "/mantenimientos/alcaldias",
        "icon": "feather icon-home"
      },
      {
        "id": "centros-acopio",
        "title": "Centros Acopio",
        "type": "item",
        "url": "/mantenimientos/centros-acopio",
        "icon": "feather icon-box"
      },
      {
        "id": "disposicion-final",
        "title": "Disposición Final",
        "type": "item",
        "url": "/mantenimientos/disposicion-final",
        "icon": "feather icon-trash-2"
      },
      {
        "id": "empresas-recoleccion",
        "title": "Empresas Recolección",
        "type": "item",
        "url": "/mantenimientos/empresas-recoleccion",
        "icon": "feather icon-home"
      },
      {
        "id": "empresas-valorizacion",
        "title": "Empresas Valorización",
        "type": "item",
        "url": "/mantenimientos/empresas-valorizacion",
        "icon": "feather icon-home"
      },
      {
        "id": "estaciones-transferencia",
        "title": "Estaciones Transferencia",
        "type": "item",
        "url": "/mantenimientos/estaciones-transferencia",
        "icon": "feather icon-share"
      },
      {
        "id": "vehiculos",
        "title": "Vehículos",
        "type": "item",
        "url": "/mantenimientos/vehiculos",
        "icon": "feather icon-chevron-right"
      },
      {
        "id": "flotillas",
        "title": "Flotillas",
        "type": "item",
        "url": "/mantenimientos/flotillas",
        "icon": "feather icon-package"
      },
      {
        "id": "ingei",
        "title": "INGEI",
        "type": "item",
        "url": "/mantenimientos/ingei",
        "icon": "feather icon-cloud"
      },
      {
        "id": "metodos-caracterizacion",
        "title": "Métodos Caracterización",
        "type": "item",
        "url": "/mantenimientos/metodos-caracterizacion",
        "icon": "feather icon-clipboard"
      },
      {
        "id": "metodos-composicion",
        "title": "Métodos Composición",
        "type": "item",
        "url": "/mantenimientos/metodos-composicion",
        "icon": "feather icon-layers"
      },
      {
        "id": "residuos-marinos",
        "title": "Residuos Marinos",
        "type": "item",
        "url": "/mantenimientos/residuos-marinos",
        "icon": "feather icon-chevron-right"
      },
      {
        "id": "rutas-recoleccion",
        "title": "Rutas de Recolección",
        "type": "item",
        "url": "/mantenimientos/rutas-recoleccion",
        "icon": "feather icon-map"
      },
      {
        "id": "rep",
        "title": "REP",
        "type": "item",
        "url": "/mantenimientos/rep",
        "icon": "feather icon-repeat"
      },
      {
        "id": "tipos-recoleccion",
        "title": "Tipos de Recolección",
        "type": "item",
        "url": "/mantenimientos/tipos-recoleccion",
        "icon": "feather icon-chevron-right"
      },
      {
        "id": "tipos-residuos",
        "title": "Tipos de Residuos",
        "type": "item",
        "url": "/mantenimientos/tipos-residuos",
        "icon": "feather icon-trash"
      },
      {
        "id": "usuarios",
        "title": "Usuarios",
        "type": "item",
        "url": "/mantenimientos/usuarios",
        "icon": "feather icon-user"
      }
    ]
  }
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
