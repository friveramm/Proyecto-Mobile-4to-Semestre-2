import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './Servicios/auth.guard';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'selection',
    loadChildren: () => import('./View/selection/selection.module').then( m => m.SelectionPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'rec-pass',
    loadChildren: () => import('./rec-pass/rec-pass.module').then( m => m.RecPassPageModule)
  },
  {
    path: 'chofer',
    loadChildren: () => import('./View/chofer/chofer.module').then( m => m.ChoferPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'pasajero',
    loadChildren: () => import('./View/pasajero/pasajero.module').then( m => m.PasajeroPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'mantenedor',
    loadChildren: () => import('./admin/mantenedor/mantenedor.module').then( m => m.MantenedorPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'editar-usuario',
    loadChildren: () => import('./admin/editar-usuario/editar-usuario.module').then( m => m.EditarUsuarioPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'agregar-usuario',
    loadChildren: () => import('./admin/agregar-usuario/agregar-usuario.module').then( m => m.AgregarUsuarioPageModule),
    canActivate: [authGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./error/error.module').then( m => m.ErrorPageModule)
  },






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
