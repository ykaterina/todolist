import { Component } from '@angular/core';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef, GridApi, GridOptions } from 'ag-grid-community';
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
  private gridApi!: GridApi;

  constructor(
    private todoService: TodoService
  ) {}
  rowData = []
  
  colDefs: ColDef[] = [
    { 
      headerName: "Status",
      field: "done",
      cellDataType: 'boolean'
    },
    { 
      headerName: "To Do",
      field: "tododesc",
      width: 500
    },
    {
      headerName: "Created Date",
      field: "createdttm",
    },
    {
      headerName: "Last Updated Date",
      field: "updatedttm",
    },
    { 
      headerName: "Action",
      field: "action" 
    }
  ];

  gridOptions: GridOptions = {
    columnDefs: this.colDefs,
    rowData: this.rowData,
  };

  ngOnInit() {
    this.todoService.getTodo().subscribe({
      next: (data) => {
        this.rowData = data;
        console.log('Fetched todos:', data);
      },
      error: (err) => {
        console.error('Failed to fetch todos:', err);
      }
    })
  }
}
