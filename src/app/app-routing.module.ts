import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogeTicketsComponent } from './doge-tickets/doge-tickets.component';
import { CryptoDashboardComponent } from './dashboard/crypto-dashboard.component';

const routes: Routes = [
    { path: '', component: CryptoDashboardComponent },
    { path: 'doge-tickets', component: DogeTicketsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 