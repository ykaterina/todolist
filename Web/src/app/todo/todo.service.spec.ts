import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { provideHttpClient } from '@angular/common/http';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],

    }).compileComponents();
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should create the service', () => {
      expect(service).toBeTruthy();
    });

  it('should send a POST request to add a todo item', () => {
    const todoitem = { description: 'Test todo', createdttm: new Date() };
    service.addTodo(todoitem).subscribe(response => {
      expect(response.message).toBe('Added successfully');
    });
     const req = httpMock.expectOne(`${service['apiUrl']}/addTodoItem`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(todoitem);

      req.flush({ message: 'Added successfully' });
  });

  it('should send a GET request to fetch todo items', () => {
    service.getTodo().subscribe(todos => {
      expect(todos.length).toBe(2);
      expect(todos[0].description).toBe('Test todo 1');
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/getTodoItems`);
    expect(req.request.method).toEqual('GET');

    req.flush([
      { description: 'Test todo 1', createdttm: new Date() },
      { description: 'Test todo 2', createdttm: new Date() }
    ]);
  });

  it('should send a DELETE request to delete a todo item', () => {
    const todokey = '12345';
    service.deleteTodo(todokey).subscribe(response => {
      expect(response.message).toBe('Deleted successfully');
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/deleteTodoItem/${todokey}`);
    expect(req.request.method).toEqual('DELETE');

    req.flush({ message: 'Deleted successfully' });
  });

  it('should send a PATCH request to update a todo item', () => {
    const todokey = '12345';
    const updatedTodo = { description: 'Updated todo' };
    service.updateTodo(todokey, updatedTodo).subscribe(response => {
      expect(response.message).toBe('Updated successfully');
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/updateTodoItem/${todokey}`);
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual(updatedTodo);

    req.flush({ message: 'Updated successfully' });
  });
});
