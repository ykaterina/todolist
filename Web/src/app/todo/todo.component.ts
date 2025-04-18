import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { TodoService } from './todo.service';
import { ItemsGridComponent } from './items-grid/items-grid.component'
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ItemsGridComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})

export class TodoComponent {
  constructor(
    private service: TodoService,
  ){}

  description = String;
  // todoInput =  new FormControl('',
  //   Validators.maxLength(250)
  // );
  

  addItem(description: string) {
    console.log(description)
    
    if (!description) return;
    let todo = { 'description': description }
    this.service.addTodo(todo).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
