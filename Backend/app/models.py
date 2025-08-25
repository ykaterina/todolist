from sqlalchemy.inspection import inspect
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import func
import uuid

db = SQLAlchemy()


class Todo(db.Model):
    __tablename__ = 'todo'

    todokey = db.Column(UUID(as_uuid=True), primary_key=True,
                        default=uuid.uuid4, unique=True, nullable=False)
    todouserid = db.Column(db.String(25), nullable=False)
    tododesc = db.Column(db.String(250), nullable=False)
    done = db.Column(db.Boolean, default=False)
    createdttm = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updatedttm = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return '<todokey {}>'.format(self.todokey)

    def to_dict(self):
        return {
            c.key: getattr(self, c.key)
            for c in inspect(self).mapper.column_attrs
        }
    
    @staticmethod
    def addItem(item):
        print(f"Received item: {item} - Type: {type(item)}")  # Debugging
     
        try:
          item_dict = Todo(
                todouserid = item["todouserid"],
                tododesc = item["tododesc"],
                createdttm = item["createdttm"]
          )
          db.session.add(item_dict)
          db.session.commit()
        except Exception as e:
          db.session.rollback()  # Undo changes in case of failure
          print(f"Database error: {e}")  # Debugging
          raise
