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
