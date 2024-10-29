from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Connecting to the database
def get_db_connection():
    conn = psycopg2.connect(os.getenv("POSTGRES_URL"))
    return conn

# Create a new user
@app.route('/backend/api/users', methods=['POST'])
def create_user():
    data = request.json
    username = data['username']
    name = data['name']
    lastname = data['lastname']
    country = data['country']
    age = data['age']

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('INSERT INTO users (username, name, lastname, country, age) VALUES (%s, %s, %s, %s, %s)',
                (username, name, lastname, country, age))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'message': 'User  created successfully!'}), 201

# Get all users
@app.route('/backend/api/users', methods=['GET'])
def get_users():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM users')
        users = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify(users), 200
    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({'error': 'An error occurred while fetching users'}), 500
    finally:
        if 'conn' in locals() and conn is not None:
            conn.close()

# Get a user by ID
@app.route('/backend/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT * FROM users WHERE user_id=%s', (user_id,))
        user = cur.fetchone()
        cur.close()
        conn.close()
        
        if user is None:
            return jsonify({'error': 'User  not found'}), 404
        
        user_data = {
            'user_id': user[0],
            'username': user[1],
            'name': user[2],
            'lastname': user[3],
            'country': user[4],
            'age': user[5]
        }
        
        return jsonify(user_data), 200
    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({'error': 'An error occurred while fetching the user'}), 500
    finally:
        if 'conn' in locals() and conn is not None:
            conn.close()

# Update a user
@app.route('/backend/api/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.json
    username = data['username']
    name = data['name']
    lastname = data['lastname']
    country = data['country']
    age = data['age']

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('UPDATE users SET username=%s, name=%s, lastname=%s, country=%s, age=%s WHERE user_id=%s',
                (username, name, lastname, country, age, user_id))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'message': 'User  updated successfully!'}), 200

# Delete a user
@app.route('/backend/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('DELETE FROM users WHERE user_id=%s', (user_id,))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'message': 'User  deleted successfully!'}), 200

if __name__ == '__main__':
    app.run(debug=True)