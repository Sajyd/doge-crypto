import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { App } from './app.component';
import { CryptoDashboardComponent } from './dashboard/crypto-dashboard.component';
import { DogeTicketsComponent } from './doge-tickets/doge-tickets.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    App,
    CryptoDashboardComponent,
    DogeTicketsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
  ],
  bootstrap: [App]
})
export class AppModule { }