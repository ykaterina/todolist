from .models import Todo,db

def addItem(item):
     todoitem = {
          "todouserid": "todouser",
          "tododesc": item['description']
     }
     Todo.addItem(todoitem)   

def getTodos():
     return db.session.query(Todo).all()

def deleteTodo(todokey):
     todo = Todo.query.get(todokey)
     print('deleteTodo', todo)
     if not todo:
          return None
     db.session.delete(todo)
     db.session.commit()
     return todo

def updateTodo(todokey, data):
     todo = Todo.query.get(todokey)
     if not todo:
          return None
     if 'tododesc' in data:
          todo.tododesc = data['tododesc']
     elif 'done' in data:
          todo.done = data['done']
     
     todo.updatedttm = data['updatedttm']

     db.session.commit()
     return todo