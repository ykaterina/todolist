import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AllCommunityModule, ModuleRegistry, themeMaterial, ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { TodoService } from '../todo.service';
import { ActionRendererComponent } from './CellRenderer/action-renderer/action-renderer.component'
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
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

  constructor(
    private todoService: TodoService,
    private cdr: ChangeDetectorRef,
  ) { }

  public theme = themeMaterial.withParams({
    wrapperBorder: true,
    headerRowBorder: true,
  });
  private gridApi!: GridApi;
  rowDataSubject = new BehaviorSubject<any[]>([]);
  rowData$ = this.rowDataSubject.asObservable();
  
  
  gridOptions: GridOptions = {
    autoSizeStrategy: { type: 'fitGridWidth' },
    defaultColDef: {
      filter: true,
    },
  };

  deleteItem(todokey: string): void {
    this.todoService.deleteTodo(todokey)
      .pipe(catchError(error => {
        console.error('Error deleting todo:', error);
        return of(null);
        })
      )
      .subscribe(response => {
        console.log('Deleted todo:', response);
        
        this.todoService.getTodo().subscribe(updatedData => {
          console.log('Updated todo list:', updatedData);
          this.rowDataSubject.next(updatedData);
        });
      });
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.rowData$ = this.todoService.getTodo();
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
      cellRenderer: ActionRendererComponent,
      cellRendererParams: {
        actionEvent: this.deleteItem.bind(this)
      }
    }
  ];
}
