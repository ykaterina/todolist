import { Component, ViewChild } from '@angular/core';
import { TodoService } from './todo.service';
import { ItemsGridComponent } from './items-grid/items-grid.component'

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ItemsGridComponent],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent {
  constructor(
    private todoService: TodoService
  ){}
  
  @ViewChild(ItemsGridComponent) grid!: ItemsGridComponent;
  description = String;
    
  addItem(description: string) {
    console.log(description)
    
    if (!description) return;
    let todo = { 'description': description }
    this.todoService.addTodo(todo).subscribe({
      next: (response) => {
        console.log(response)
        this.grid.setGridData();
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  onResetFilters(): void {
    this.grid.resetFilters();
  }
}
