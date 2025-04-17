<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ChatGPT Alternative</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .chat-container {
            width: 80%;
            margin: 0 auto;
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .messages {
            max-height: 300px;
            overflow-y: auto;
            margin-bottom: 20px;
        }
        .input-area {
            display: flex;
        }
        .input-area input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .input-area button {
            padding: 10px;
            border: none;
            background-color: #007BFF;
            color: white;
            border-radius: 5px;
            cursor: pointer;
        }
        .input-area button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>

<div class="chat-container">
    <h2>ChatGPT Alternative</h2>
    <div class="messages" id="messages"></div>
    <div class="input-area">
        <input type="text" id="user-input" placeholder="Type your message..." />
        <button onclick="sendMessage()">Send</button>
    </div>
</div>

<script>
    const openaiApiKey = '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'; // Replace with your OpenAI API Key

    function appendMessage(text, sender) {
        const messageContainer = document.getElementById('messages');
        const messageDiv = document.createElement('div');
        messageDiv.textContent = `${sender}: ${text}`;
        messageContainer.appendChild(messageDiv);
    }

    async function sendMessage() {
        const userInput = document.getElementById('user-input').value;
        if (!userInput) return;

        // Show user message in chat
        appendMessage(userInput, 'You');

        // Clear input field
        document.getElementById('user-input').value = '';

        // Call OpenAI API
        try {
            const response = await fetch('https://api.openai.com/v1/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${openaiApiKey}`
                },
                body: JSON.stringify({
                    model: "text-davinci-003", // or use GPT-4 model
                    prompt: userInput,
                    max_tokens: 150
                })
            });

            const data = await response.json();
            const aiMessage = data.choices[0].text.trim();

            // Show AI message in chat
            appendMessage(aiMessage, 'AI');
        } catch (error) {
            console.error('Error:', error);
            appendMessage("Sorry, something went wrong. Please try again.", 'AI');
        }
    }
</script>

</body>
</html>

