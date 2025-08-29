import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { AgGridAngular } from 'ag-grid-angular';
import { MaterialLoginForm } from './login/login.component';

export const routes: Routes = [
     { path: '', component: MaterialLoginForm },
];
