import { Component } from '@angular/core';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { TodoService } from '../todo.service';
import {
  ColumnMenuModule,
  ColumnsToolPanelModule,
  ContextMenuModule,
  RowGroupingModule,
} from "ag-grid-enterprise";

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
      cellDataType: 'boolean',
      width: 100,
      valueGetter: function(params) {
        return params.data.done ? true : false
      },
      editable: true,
      cellClass: 'status-checkbox'
    },
    { 
      headerName: "To Do",
      field: "tododesc",
      width: 500
    },
    {
      headerName: "Created Date",
      field: "createdttm",
      hide: true
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
    autoSizeStrategy: {type: 'fitGridWidth'},
    defaultColDef: {
      enableRowGroup: true,
      menuTabs: ['filterMenuTab', 'generalMenuTab', 'columnsMenuTab'],
      sortable: true,
      filter: true,
    },
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
