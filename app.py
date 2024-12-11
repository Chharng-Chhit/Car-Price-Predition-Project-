from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    # Simulate a bot response (replace this with your actual logic)
    bot_response = f"You said: {user_message}"
    return jsonify({"response": bot_response})

if __name__ == '__main__':
    app.run(debug=True)