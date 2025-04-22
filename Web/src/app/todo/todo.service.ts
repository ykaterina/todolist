import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiUrl = environment.apiUrl;  

  constructor(private http: HttpClient) { }

  addTodo(todoitem: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addTodoItem`, todoitem);
  }

  getTodo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getTodoItems`)
  }

  deleteTodo(todokey: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/deleteTodoItem`)
  }
}
