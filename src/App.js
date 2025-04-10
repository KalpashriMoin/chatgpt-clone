
import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");

    try {
      const response = await fetch("https://ai-hubkalpashrimoin43837ai711285373998.services.ai.azure.com/models/chat/completions?api-version=2024-05-01-preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": "6RKmPQOI4H0Ptgsr368wrkCWWbYNQuoy4LEmNDYR5hRuy4A4ChtfJQQJ99BDACHYHv6XJ3w3AAAAACOG88Zq"
        },
        body: JSON.stringify({
          model: "DeepSeek-V3" ,
          messages: updatedMessages,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        return;
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.choices && data.choices.length > 0) {
        const aiMessage = data.choices[0].message;
        setMessages([...updatedMessages, aiMessage]);
      } else {
        console.warn("No choices returned in response:", data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;



// import React, { useState } from 'react';
// import './App.css';

// function App() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const sendMessage = async () => {
//     const userMessage = { role: "user", content: input };
//     const updatedMessages = [...messages, userMessage];

//     setMessages(updatedMessages);
//     setInput("");

//     const response = await fetch("https://ai-hubkalpashrimoin43837ai711285373998.services.ai.azure.com/models/chat/completions?api-version=2024-05-01-preview", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "api-key": "6RKmPQOI4H0Ptgsr368wrkCWWbYNQuoy4LEmNDYR5hRuy4A4ChtfJQQJ99BDACHYHv6XJ3w3AAAAACOG88Zq"
//       },
//       body: JSON.stringify({
//         messages: updatedMessages,
//         temperature: 0.7
//       })
//     });

//     const data = await response.json();
//     const aiMessage = data.choices[0].message;
//     setMessages([...updatedMessages, aiMessage]);
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-window">
//         {messages.map((msg, idx) => (
//           <div key={idx} className={`message ${msg.role}`}>
//             <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}
//           </div>
//         ))}
//       </div>
//       <input
//         value={input}
//         onChange={e => setInput(e.target.value)}
//         onKeyDown={e => e.key === 'Enter' && sendMessage()}
//         placeholder="Type your message..."
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// }

// export default App;

