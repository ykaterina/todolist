import { Component, ViewChild } from '@angular/core';
import { TodoService } from './todo.service';
import { ItemsGridComponent } from './items-grid/items-grid.component'
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ItemsGridComponent, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule],
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
    if (!description) return;
    let todo = { 
      'description': description,
      'createdttm': new Date(),
     }
    this.todoService.addTodo(todo).subscribe({
      next: (response) => {
        console.log(response);
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
