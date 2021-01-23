import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ViewedComponent } from './viewed/viewed.component';


const routes: Routes = [
  {
    path: '', // don't use '**' because other modules routes will not be accessible
    component: MainComponent
  },
  {
    path: 'viewed',
    component: ViewedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PopupRoutingModule { }
