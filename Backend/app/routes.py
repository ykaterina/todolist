from flask import Blueprint, jsonify, request
from .services import addItem,getTodos
from flask_cors import CORS,cross_origin

main = Blueprint('main', __name__)

@main.route('/api/addTodoItem', methods=['POST'])
def addTodoItem():
    data = request.json
    try:
        addItem(data)
        return jsonify({"message": "Added successfully", "item": data}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@main.route('/api/getTodoItems', methods=['GET'])
def getTodoItems():
    todos = getTodos()
    if todos is None:
        return jsonify([])
    return jsonify([{"todokey": str(t.todokey), "description": t.tododesc, "done": t.done} for t in todos])


