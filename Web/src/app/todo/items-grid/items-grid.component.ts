import { Component } from '@angular/core';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef, GridApi } from 'ag-grid-community';
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
  private gridApi: any;

  constructor(private todoService: TodoService) {}
  rowData = []
  
  onGridReady(params: any) {
    this.gridApi = params.api;
  }
  
  colDefs: ColDef[] = [
    { 
      headerName: "",
      field: "checkbox",
      width: 100
    },
    { 
      headerName: "To Do",
      cellDataType: "String",
      field: "description",
      width: 500
    },
    { 
      headerName: "Status",
      cellDataType: "String",
      field: "status" 
    },
    { 
      headerName: "Action",
      field: "action" 
    }
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
