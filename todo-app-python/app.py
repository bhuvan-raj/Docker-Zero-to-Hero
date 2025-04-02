from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# In-memory storage (replace with database in production)
todos = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/todos', methods=['GET', 'POST'])
def handle_todos():
    global todos
    if request.method == 'POST':
        data = request.get_json()
        new_todo = {
            'id': len(todos) + 1,
            'text': data['text'],
            'completed': False
        }
        todos.append(new_todo)
        return jsonify(new_todo), 201
    return jsonify(todos)

@app.route('/api/todos/<int:todo_id>', methods=['PUT', 'DELETE'])
def handle_todo(todo_id):
    global todos
    if request.method == 'PUT':
        data = request.get_json()
        for todo in todos:
            if todo['id'] == todo_id:
                todo.update(data)
                return jsonify(todo)
        return jsonify({'error': 'Todo not found'}), 404
    elif request.method == 'DELETE':
        todos = [todo for todo in todos if todo['id'] != todo_id]
        return jsonify({'message': 'Todo deleted'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
