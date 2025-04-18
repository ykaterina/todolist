// frontend/src/app/app.module.ts
// import {  } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AppRoutingModule } from './app.routes'; 

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    CommonModule, 
    MatButtonToggleModule,
    MatButtonModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
  ],
  exports: [],
  providers: [],
})
export class AppModule { }
