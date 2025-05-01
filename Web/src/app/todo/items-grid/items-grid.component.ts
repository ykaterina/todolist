import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
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
    defaultColDef: {
      filter: true,
    },
    rowData: [],
    stopEditingWhenCellsLoseFocus: true,
  };

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
}
  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
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

    console.log(event)
    if (field ==='tododesc'){
      if(event.newValue)
        upd.tododesc = event.data.tododesc
      else
        event.node.setDataValue(event.colDef.field, event.oldValue);
    }
    else if (field === 'done') {
      upd.done = event.data.done
    }
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

  resetFilters(): void {
    this.gridApi.setFilterModel(null);
  }
  
  ngOnInit(){}

  colDefs: ColDef[] = [
    {
      headerName: "Status",
      field: "done",
      cellDataType: 'boolean',
      width: 120, 
      cellRenderer: 'agCheckboxCellRenderer',
      editable: true,
      cellClass: 'status-checkbox',
      sort: 'asc',
      filter: 'agSetColumnFilter'
    },
    {
      headerName: "To Do",
      field: "tododesc",
      width: 500,
      editable: true, 
      filter: 'agTextColumnFilter',
    },
    {
      headerName: "Created Date",
      field: "createdttm",
      hide: true,
      sort: 'asc'
    },
    {
      headerName: "Last Updated Date",
      field: "updatedttm",
      sort: 'asc',
      filter: 'agDateColumnFilter',
    },
    {
      headerName: "Action",
      field: "action",
      cellRenderer: ActionRendererComponent,
      cellRendererParams: {
        actionEvent: this.deleteItem.bind(this)
      },
      suppressHeaderFilterButton: true
    }
  ];
}
