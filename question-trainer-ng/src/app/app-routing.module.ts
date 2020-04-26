import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewModeComponent } from './components/layout/view-mode/view-mode.component';

const routes: Routes = [
  { path: '', component: ViewModeComponent },
  { path: ':viewMode', component: ViewModeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
