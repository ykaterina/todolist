import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { AllCommunityModule, ModuleRegistry, themeMaterial, ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { TodoService } from '../todo.service';
import { ActionRendererComponent } from './CellRenderer/action-renderer/action-renderer.component'
import { CommonModule } from '@angular/common';
import moment from 'moment';

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
      sortable: true,
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
    this.gridApi.applyColumnState({defaultState: {sort: null}});
  }
  
  ngOnInit(){}

  colDefs: ColDef[] = [
    {
      headerName: "Status",
      field: "done",
      cellDataType: 'boolean',
      minWidth: 120, 
      cellRenderer: 'agCheckboxCellRenderer',
      editable: true,
      headerClass: 'default-sort',
      cellClass: 'status-checkbox'
    },
    {
      headerName: "To Do",
      field: "tododesc",
      minWidth: 340,
      editable: true, 
      filter: 'agTextColumnFilter',
      cellStyle: { textAlign: 'left' }
    },
    {
      headerName: "Created Date",
      field: "createdttm",
      minWidth: 150,
      cellDataType: 'date',
      filter: 'agDateColumnFilter',
      filterParams: { comparator: dateOnlyComparator },
      valueGetter: params => { 
        return params.data.createdttm ? moment(params.data.createdttm) : null; 
      },
      valueFormatter: dateFormatter,
      comparator: (date1: Date, date2: Date) => {
        if (!date1 || !date2) return 0;
        return moment(date1).diff(moment(date2));
      }
    },
    {
      headerName: "Last Updated Date",
      field: "updatedttm",
      minWidth: 150,
      cellDataType: 'date',
      valueGetter: params => {
        return params.data.updatedttm ? new Date(params.data.updatedttm) : null 
      },
      valueFormatter: dateFormatter,
      filter: 'agDateColumnFilter',
      filterParams: { comparator: dateOnlyComparator },
      comparator: (date1: Date, date2: Date) => {
        if (!date1 || !date2) return 0;
        return moment(date1).diff(moment(date2));
      }
    },
    {
      headerName: "Action",
      field: "action",
      minWidth: 100,
      cellRenderer: ActionRendererComponent,
      cellRendererParams: {
        actionEvent: this.deleteItem.bind(this)
      },
      suppressHeaderFilterButton: true
    }
  ];
}

const dateFormatter = (params: any) => {
  if (!params.value) return '';
  return moment(params.value).format('DD-MMM-YYYY');
}

const dateOnlyComparator = (filterDate: Date, cellValue: any): number => {
  if (!cellValue) return -1;

  const cellDateStr = new Date(cellValue).toDateString();
  const filterDateStr = filterDate.toDateString();

  if (cellDateStr > filterDateStr) return -1;
  if (cellDateStr < filterDateStr) return 1;
  return 0;
};