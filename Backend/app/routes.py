from flask import Blueprint, jsonify, request
from .services import addItem,getTodos,deleteTodo
from flask_cors import CORS,cross_origin
import logging

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
    logging.debug(todos)
    if todos is None:
        return jsonify([])
    return jsonify([todo.to_dict() for todo in todos])

@main.route('/api/deleteTodoItem/<string:todokey>', methods=['DELETE'])
def deleteTodoItem(todokey):
    logging.debug('deleteTodoItem')
    todo = deleteTodo(todokey)
    if not todo:
        return jsonify({"error": "To Do is not found"}), 404
    return '', 204




