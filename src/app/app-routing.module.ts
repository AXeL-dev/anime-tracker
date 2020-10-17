import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PopupGuard } from './guards/popup.guard';


const routes: Routes = [
  {
    path: 'settings',
    loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: 'background',
    loadChildren: () => import('./modules/background/background.module').then(m => m.BackgroundModule)
  },
  {
    path: '**',
    loadChildren: () => import('./modules/popup/popup.module').then(m => m.PopupModule),
    canActivate: [PopupGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
