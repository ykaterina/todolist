import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AllCommunityModule, ModuleRegistry, themeMaterial, ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { TodoService } from '../todo.service';
import { ActionRendererComponent } from './CellRenderer/action-renderer/action-renderer.component'
import { CommonModule } from '@angular/common';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-items-grid',
  standalone: true,
  imports: [AgGridAngular, CommonModule],
  templateUrl: './items-grid.component.html',
  styleUrl: './items-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsGridComponent {
  public theme = themeMaterial.withParams({
      wrapperBorder: true,
      headerRowBorder: true,
    });
  constructor(
    private todoService: TodoService,
  ) { }

  private gridApi!: GridApi;

  gridOptions: GridOptions = {
    autoSizeStrategy: { type: 'fitGridWidth' },
    defaultColDef: {
      filter: true,
    },
    rowData: []
  };

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.setGridData();
  }

  setGridData(): void {
    this.todoService.getTodo().subscribe(todos => {
      this.gridApi!.setGridOption("rowData", todos);
    });
  }

  deleteItem(todokey: string): void {
    this.todoService.deleteTodo(todokey)
      .subscribe({ 
        next: () => {
          this.setGridData();
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  onCellValueChanged(event: any): void {
    const field = event.colDef.field;

    let upd: { tododesc?: string, done?: boolean, updatedttm: Date } = {
      updatedttm: new Date()
    };

    if (field ==='tododesc')
      upd.tododesc = event.data.tododesc
    else if (field === 'done')
      upd.done = event.data.done
    else
      return

    this.todoService.updateTodo(event.data.todokey, upd)
      .subscribe({
        next: () => {
          this.setGridData();
        },
        error: (error) => {
          console.error(error);
        }
    });
  }

  ngOnInit(){}

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
      width: 500,
      editable: true, 
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
      cellRenderer: ActionRendererComponent,
      cellRendererParams: {
        actionEvent: this.deleteItem.bind(this)
      }
    }
  ];
}
