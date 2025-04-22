import { Component } from '@angular/core';
import { AllCommunityModule, ModuleRegistry, themeMaterial, ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { TodoService } from '../todo.service';
import { ActionRendererComponent } from './CellRenderer/action-renderer/action-renderer.component'

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-items-grid',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './items-grid.component.html',
  styleUrl: './items-grid.component.scss'
})
export class ItemsGridComponent {

  constructor(
    private todoService: TodoService
  ) { }

  public theme = themeMaterial.withParams({
    wrapperBorder: true,
    headerRowBorder: true,
  });
  private gridApi!: GridApi;

  rowData = []

  gridOptions: GridOptions = {
    autoSizeStrategy: { type: 'fitGridWidth' },
    defaultColDef: {
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

  colDefs: ColDef[] = [
    {
      headerName: "Status",
      field: "done",
      cellDataType: 'boolean',
      width: 120,
      valueGetter: function (params) {
        return params.data.done ? true : false
      },
      cellRenderer: 'agCheckboxCellRenderer',
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
      field: "action",
      cellRenderer: ActionRendererComponent
    }
  ];
}
