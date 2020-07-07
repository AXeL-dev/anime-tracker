import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PopupGuardService } from './services/guards/popup-guard.service';


const routes: Routes = [
  {
    path: 'settings',
    loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: '**',
    loadChildren: () => import('./modules/popup/popup.module').then(m => m.PopupModule),
    canActivate: [PopupGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
