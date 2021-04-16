import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImToPdfComponent } from './im-to-pdf/im-to-pd.component';
import { LogsComponent } from './logs/logs.component';

const routes: Routes = [

  { path : 'logs', component : LogsComponent },
  { path : ' ', component : LogsComponent , pathMatch: 'full'}, 
  { path : 'imTopdf', component : ImToPdfComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
