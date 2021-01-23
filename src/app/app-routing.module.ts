import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PopupGuard } from './guards/popup.guard';


const routes: Routes = [
  {
    path: '',
    //pathMatch: 'full', // since popup module have sub routes we should not use full path matching
    loadChildren: () => import('./modules/popup/popup.module').then(m => m.PopupModule),
    canActivate: [PopupGuard]
  },
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
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
