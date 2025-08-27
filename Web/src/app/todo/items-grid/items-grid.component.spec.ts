import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ItemsGridComponent } from './items-grid.component';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { ActionRendererComponent } from './CellRenderer/action-renderer/action-renderer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TodoService } from '../todo.service';

describe('ItemsGridComponent', () => {
  let component: ItemsGridComponent;
  let fixture: ComponentFixture<ItemsGridComponent>;

  const mockTodoService = {
    getTodo: () => of([]),
    deleteTodo: () => of({}),
    updateTodo: () => of({})
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ItemsGridComponent,
        CommonModule,
        AgGridModule,
        ActionRendererComponent,
        MatDialogModule,
        MatIconModule
      ],
      providers: [
        { provide: TodoService, useValue: mockTodoService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set grid data on setGridData call', () => {
    // Arrange
    const mockTodos = [{ description: 'Task A' }, { description: 'Task B' }];
    const getTodoSpy = spyOn(component['todoService'], 'getTodo').and.returnValue(of(mockTodos));

    const setGridOptionSpy = jasmine.createSpy();
    component['gridApi'] = {
      setGridOption: setGridOptionSpy
    } as any;

    // Act
    component.setGridData();

    // Assert
    expect(getTodoSpy).toHaveBeenCalled();
    expect(setGridOptionSpy).toHaveBeenCalledWith('rowData', mockTodos);
  });
});
