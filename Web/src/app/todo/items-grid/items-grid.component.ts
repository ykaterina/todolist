import { Component } from '@angular/core';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef } from 'ag-grid-community';
import { TodoService } from '../todo.service';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-items-grid',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './items-grid.component.html',
  styleUrl: './items-grid.component.scss'
})
export class ItemsGridComponent {
  todos = [];

  constructor(private todoService: TodoService) {}

  rowData = [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ];

  colDefs: ColDef[] = [
    { field: "checkbox" },
    { field: "To Do" },
    { field: "Status" },
    { field: "Edit" }
  ];

  ngOnInit() {
    this.todoService.getTodo().subscribe({
      next: (data) => {
        this.todos = data;
        console.log('Fetched todos:', this.todos);
      },
      error: (err) => {
        console.error('Failed to fetch todos:', err);
      }
    })
  }
}
