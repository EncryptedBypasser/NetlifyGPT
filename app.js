import React, { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setConversation([...conversation, { user: message }]);

    const response = await fetch("/.netlify/functions/chatgpt", {
      method: "POST",
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    setConversation([
      ...conversation,
      { user: message, bot: data.reply },
    ]);
    setMessage("");
  };

  return (
    <div>
      <h1>Chat with GPT</h1>
      <div>
        {conversation.map((entry, index) => (
          <div key={index}>
            <p><strong>User:</strong> {entry.user}</p>
            {entry.bot && <p><strong>Bot:</strong> {entry.bot}</p>}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
