from .models import Todo,db

def addItem(item):
     todoitem = {
          "todouserid": "todouser",
          "tododesc": item['description']
     }
     Todo.addItem(todoitem)   

def getTodos():
     return db.session.query(Todo).all()
