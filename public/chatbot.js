// (function () {
//   const API_URL = "http://localhost:3000/api/chat";

//   const scriptTag = document.currentScript;
//   const botId = scriptTag.getAttribute("data-bot-id");
//   const botName = scriptTag.getAttribute("data-bot-name") || "Support";

//   if (!botId) {
//     console.error("❌ botId not found");
//     return;
//   }

//   // ✅ Per-bot storage
//   const STORAGE_KEY = `plugai-chat-${botId}`;

//   // 🎨 STYLES
//   const style = document.createElement("style");
//   style.innerHTML = `
//     .plugai-btn {
//       position: fixed;
//       bottom: 20px;
//       right: 20px;
//       width: 56px;
//       height: 56px;
//       background: linear-gradient(135deg, #2563eb, #1d4ed8);
//       color: white;
//       border-radius: 50%;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       cursor: pointer;
//       z-index: 9999;
//       font-size: 20px;
//       box-shadow: 0 10px 30px rgba(37,99,235,0.5);
//       transition: transform 0.2s;
//     }

//     .plugai-btn:hover {
//       transform: scale(1.1);
//     }

//     .plugai-chat {
//       position: fixed;
//       bottom: 90px;
//       right: 20px;
//       width: 340px;
//       height: 460px;
//       background: #0f0f0f;
//       color: white;
//       border-radius: 16px;
//       box-shadow: 0 20px 60px rgba(0,0,0,0.5);
//       display: flex;
//       flex-direction: column;
//       overflow: hidden;
//       z-index: 9999;
//       font-family: Inter, sans-serif;
//       animation: fadeIn 0.25s ease;
//     }

//     @keyframes fadeIn {
//       from { opacity: 0; transform: translateY(15px); }
//       to { opacity: 1; transform: translateY(0); }
//     }

//     .plugai-header {
//       background: linear-gradient(135deg, #111, #1a1a1a);
//       padding: 12px 14px;
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//     }

//     .plugai-header .title {
//       font-size: 14px;
//       font-weight: 500;
//     }

//     .plugai-header .actions {
//       display: flex;
//       align-items: center;
//       gap: 10px;
//     }

//     .plugai-header button {
//       background: transparent;
//       border: none;
//       color: #aaa;
//       font-size: 12px;
//       cursor: pointer;
//       transition: color 0.2s, background 0.2s;
//       padding: 4px 8px;
//       border-radius: 6px;
//     }

//     .plugai-header button:hover {
//       color: white;
//       background: rgba(255,255,255,0.1);
//     }

//     #plugai-close {
//       cursor: pointer;
//       font-size: 16px;
//     }

//     .plugai-messages {
//       flex: 1;
//       padding: 12px;
//       overflow-y: auto;
//       display: flex;
//       flex-direction: column;
//       gap: 6px;
//     }

//     .plugai-input {
//       display: flex;
//       border-top: 1px solid #222;
//       padding: 8px;
//       background: #0f0f0f;
//     }

//     .plugai-input input {
//       flex: 1;
//       border: none;
//       background: #1a1a1a;
//       color: white;
//       padding: 10px;
//       border-radius: 10px;
//       outline: none;
//       font-size: 14px;
//     }

//     .plugai-input button {
//       margin-left: 6px;
//       padding: 10px 14px;
//       background: #2563eb;
//       color: white;
//       border: none;
//       border-radius: 10px;
//       cursor: pointer;
//     }

//     .msg-user { text-align: right; }
//     .msg-ai { text-align: left; }

//     .bubble {
//       display: inline-block;
//       padding: 10px 14px;
//       border-radius: 14px;
//       max-width: 75%;
//       font-size: 14px;
//       line-height: 1.4;
//     }

//     .user { background: #2563eb; color: white; }
//     .ai { background: #1f1f1f; color: #e5e5e5; }

//     @media (max-width: 600px) {
//       .plugai-chat {
//         width: 95%;
//         right: 2.5%;
//         bottom: 80px;
//       }
//     }
//   `;
//   document.head.appendChild(style);

//   // 🔘 Button
//   const button = document.createElement("div");
//   button.className = "plugai-btn";
//   button.innerText = "💬";

//   // 💬 Chat
//   const chat = document.createElement("div");
//   chat.className = "plugai-chat";
//   chat.style.display = "none";

//   chat.innerHTML = `
//     <div class="plugai-header">
//       <span class="title">${botName}</span>

//       <div class="actions">
//         <button id="plugai-clear">New Chat</button>
//         <span id="plugai-close">✕</span>
//       </div>
//     </div>

//     <div class="plugai-messages" id="plugai-messages"></div>

//     <div class="plugai-input">
//       <input id="plugai-input" placeholder="Ask something..." />
//       <button id="plugai-send">Send</button>
//     </div>
//   `;

//   document.body.appendChild(button);
//   document.body.appendChild(chat);

//   const messagesDiv = chat.querySelector("#plugai-messages");
//   const input = chat.querySelector("#plugai-input");
//   const sendBtn = chat.querySelector("#plugai-send");

//   // 💾 Load chat (per bot)
//   messagesDiv.innerHTML =
//     localStorage.getItem(STORAGE_KEY) ||
//     `<div class="msg-ai">
//        <div class="bubble ai">
//          Hi! I'm here to help with ${botName}. What would you like to know?
//        </div>
//      </div>`;

//   // toggle
//   button.onclick = () => (chat.style.display = "flex");
//   chat.querySelector("#plugai-close").onclick = () => (chat.style.display = "none");

//   // 🧹 NEW CHAT BUTTON
//   chat.querySelector("#plugai-clear").onclick = () => {
//     localStorage.removeItem(STORAGE_KEY);
//     messagesDiv.innerHTML = `
//       <div class="msg-ai">
//         <div class="bubble ai">
//           Hi! I'm here to help with ${botName}. What would you like to know?
//         </div>
//       </div>
//     `;
//   };

//   // 🔁 Retry helper
//   async function fetchWithRetry(url, options, retries = 2) {
//     try {
//       const res = await fetch(url, options);
//       if (!res.ok) throw new Error("Request failed");
//       return await res.json();
//     } catch (err) {
//       if (retries > 0) {
//         return fetchWithRetry(url, options, retries - 1);
//       }
//       throw err;
//     }
//   }

//   // 📩 Send message
//   async function sendMessage() {
//     const message = input.value.trim();
//     if (!message) return;

//     messagesDiv.innerHTML += `
//       <div class="msg-user">
//         <div class="bubble user">${message}</div>
//       </div>
//     `;

//     input.value = "";

//     const typingId = "typing-" + Date.now();

//     messagesDiv.innerHTML += `
//       <div class="msg-ai" id="${typingId}">
//         <div class="bubble ai">Typing...</div>
//       </div>
//     `;

//     messagesDiv.scrollTop = messagesDiv.scrollHeight;

//     try {
//       const data = await fetchWithRetry(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message, botId }),
//       });

//       document.getElementById(typingId)?.remove();

//       messagesDiv.innerHTML += `
//         <div class="msg-ai">
//           <div class="bubble ai">${data.reply}</div>
//         </div>
//       `;

//       localStorage.setItem(STORAGE_KEY, messagesDiv.innerHTML);
//       messagesDiv.scrollTop = messagesDiv.scrollHeight;

//     } catch (err) {
//       document.getElementById(typingId)?.remove();

//       messagesDiv.innerHTML += `
//         <div class="msg-ai">
//           <div class="bubble ai">Having trouble connecting... please try again.</div>
//         </div>
//       `;
//     }
//   }

//   sendBtn.onclick = sendMessage;
//   input.addEventListener("keypress", (e) => {
//     if (e.key === "Enter") sendMessage();
//   });
// })();
(function () {
  const API_URL = "http://localhost:3000/api/chat";

  const scriptTag = document.currentScript;
  const botId = scriptTag.getAttribute("data-bot-id");
  const botName = scriptTag.getAttribute("data-bot-name") || "Support";

  if (!botId) {
    console.error("❌ botId not found");
    return;
  }

  const STORAGE_KEY = `plugai-chat-${botId}`;

  const style = document.createElement("style");
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

    .plugai-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, #3b82f6, #6366f1);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 9999;
      box-shadow: 0 8px 32px rgba(99,102,241,0.5);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .plugai-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 12px 40px rgba(99,102,241,0.6);
    }

    .plugai-btn svg {
      width: 24px;
      height: 24px;
    }

    .plugai-chat {
      position: fixed;
      bottom: 92px;
      right: 24px;
      width: 360px;
      height: 500px;
      background: #09090b;
      color: white;
      border-radius: 20px;
      border: 1px solid rgba(255,255,255,0.08);
      box-shadow: 0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      z-index: 9999;
      font-family: 'Inter', sans-serif;
      animation: plugai-fadeIn 0.25s ease;
    }

    @keyframes plugai-fadeIn {
      from { opacity: 0; transform: translateY(16px) scale(0.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .plugai-header {
      padding: 14px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      background: rgba(255,255,255,0.03);
    }

    .plugai-header-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .plugai-avatar {
      width: 34px;
      height: 34px;
      border-radius: 10px;
      background: linear-gradient(135deg, #3b82f6, #6366f1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      flex-shrink: 0;
    }

    .plugai-header-info .title {
      font-size: 13px;
      font-weight: 600;
      color: #fff;
    }

    .plugai-header-info .status {
      font-size: 11px;
      color: #22c55e;
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 1px;
    }

    .plugai-header-info .status::before {
      content: '';
      width: 6px;
      height: 6px;
      background: #22c55e;
      border-radius: 50%;
      display: inline-block;
      animation: plugai-pulse 2s infinite;
    }

    @keyframes plugai-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    .plugai-header-actions {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .plugai-header-actions button {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.08);
      color: #a1a1aa;
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
      padding: 5px 10px;
      border-radius: 8px;
      font-family: 'Inter', sans-serif;
      transition: all 0.15s;
    }

    .plugai-header-actions button:hover {
      background: rgba(255,255,255,0.1);
      color: white;
    }

    .plugai-close-btn {
      background: rgba(255,255,255,0.06) !important;
      border: 1px solid rgba(255,255,255,0.08) !important;
      width: 28px !important;
      height: 28px !important;
      padding: 0 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      border-radius: 8px !important;
      font-size: 14px !important;
      cursor: pointer;
    }

    .plugai-messages {
      flex: 1;
      padding: 14px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
      scrollbar-width: thin;
      scrollbar-color: rgba(255,255,255,0.1) transparent;
    }

    .plugai-messages::-webkit-scrollbar {
      width: 4px;
    }

    .plugai-messages::-webkit-scrollbar-track {
      background: transparent;
    }

    .plugai-messages::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.1);
      border-radius: 4px;
    }

    .plugai-input-area {
      padding: 12px;
      border-top: 1px solid rgba(255,255,255,0.06);
      background: rgba(255,255,255,0.02);
    }

    .plugai-input-row {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      padding: 6px 6px 6px 12px;
      transition: border-color 0.2s;
    }

    .plugai-input-row:focus-within {
      border-color: rgba(99,102,241,0.5);
    }

    .plugai-input-row input {
      flex: 1;
      border: none;
      background: transparent;
      color: white;
      outline: none;
      font-size: 13px;
      font-family: 'Inter', sans-serif;
    }

    .plugai-input-row input::placeholder {
      color: #52525b;
    }

    .plugai-send-btn {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #3b82f6, #6366f1);
      border: none;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: opacity 0.2s, transform 0.15s;
    }

    .plugai-send-btn:hover {
      opacity: 0.9;
      transform: scale(1.05);
    }

    .plugai-send-btn svg {
      width: 15px;
      height: 15px;
      color: white;
    }

    .plugai-powered {
      text-align: center;
      font-size: 10px;
      color: #3f3f46;
      margin-top: 8px;
      font-family: 'Inter', sans-serif;
    }

    .plugai-powered span {
      color: #3b82f6;
    }

    .msg-user {
      display: flex;
      justify-content: flex-end;
    }

    .msg-ai {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      gap: 8px;
    }

    .msg-ai-icon {
      width: 26px;
      height: 26px;
      border-radius: 8px;
      background: linear-gradient(135deg, #3b82f6, #6366f1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      flex-shrink: 0;
    }

    .bubble {
      display: inline-block;
      padding: 10px 14px;
      border-radius: 14px;
      max-width: 78%;
      font-size: 13px;
      line-height: 1.5;
    }

    .bubble.user {
      background: linear-gradient(135deg, #3b82f6, #6366f1);
      color: white;
      border-bottom-right-radius: 4px;
    }

    .bubble.ai {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.08);
      color: #e4e4e7;
      border-bottom-left-radius: 4px;
    }

    .bubble.typing {
      display: flex;
      gap: 4px;
      align-items: center;
      padding: 12px 16px;
    }

    .typing-dot {
      width: 6px;
      height: 6px;
      background: #6366f1;
      border-radius: 50%;
      animation: plugai-bounce 1.2s infinite;
    }

    .typing-dot:nth-child(2) { animation-delay: 0.2s; }
    .typing-dot:nth-child(3) { animation-delay: 0.4s; }

    @keyframes plugai-bounce {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-6px); }
    }

    @media (max-width: 600px) {
      .plugai-chat {
        width: calc(100vw - 32px);
        right: 16px;
        bottom: 84px;
        height: 460px;
      }
    }
  `;
  document.head.appendChild(style);

  // Button
  const button = document.createElement("div");
  button.className = "plugai-btn";
  button.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;

  // Chat window
  const chat = document.createElement("div");
  chat.className = "plugai-chat";
  chat.style.display = "none";

  chat.innerHTML = `
    <div class="plugai-header">
      <div class="plugai-header-left">
        <div class="plugai-avatar">🤖</div>
        <div class="plugai-header-info">
          <div class="title">${botName}</div>
          <div class="status">Online</div>
        </div>
      </div>
      <div class="plugai-header-actions">
        <button id="plugai-clear">New Chat</button>
        <button class="plugai-close-btn" id="plugai-close">✕</button>
      </div>
    </div>

    <div class="plugai-messages" id="plugai-messages"></div>

    <div class="plugai-input-area">
      <div class="plugai-input-row">
        <input id="plugai-input" placeholder="Ask me anything..." />
        <button class="plugai-send-btn" id="plugai-send">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
      <div class="plugai-powered">Powered by <span>PlugAI</span></div>
    </div>
  `;

  document.body.appendChild(button);
  document.body.appendChild(chat);

  const messagesDiv = chat.querySelector("#plugai-messages");
  const input = chat.querySelector("#plugai-input");
  const sendBtn = chat.querySelector("#plugai-send");

  const defaultMsg = `
    <div class="msg-ai">
      <div class="msg-ai-icon">🤖</div>
      <div class="bubble ai">Hi! I'm here to help with <strong>${botName}</strong>. What would you like to know?</div>
    </div>`;

  messagesDiv.innerHTML = localStorage.getItem(STORAGE_KEY) || defaultMsg;

  button.onclick = () => (chat.style.display = "flex");
  chat.querySelector("#plugai-close").onclick = () => (chat.style.display = "none");

  chat.querySelector("#plugai-clear").onclick = () => {
    localStorage.removeItem(STORAGE_KEY);
    messagesDiv.innerHTML = defaultMsg;
  };

  async function fetchWithRetry(url, options, retries = 2) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error("Request failed");
      return await res.json();
    } catch (err) {
      if (retries > 0) return fetchWithRetry(url, options, retries - 1);
      throw err;
    }
  }

  async function sendMessage() {
    const message = input.value.trim();
    if (!message) return;

    messagesDiv.innerHTML += `
      <div class="msg-user">
        <div class="bubble user">${message}</div>
      </div>`;

    input.value = "";

    const typingId = "typing-" + Date.now();
    messagesDiv.innerHTML += `
      <div class="msg-ai" id="${typingId}">
        <div class="msg-ai-icon">🤖</div>
        <div class="bubble ai typing">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>`;

    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    try {
      const data = await fetchWithRetry(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, botId }),
      });

      document.getElementById(typingId)?.remove();

      messagesDiv.innerHTML += `
        <div class="msg-ai">
          <div class="msg-ai-icon">🤖</div>
          <div class="bubble ai">${data.reply}</div>
        </div>`;

      localStorage.setItem(STORAGE_KEY, messagesDiv.innerHTML);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;

    } catch (err) {
      document.getElementById(typingId)?.remove();
      messagesDiv.innerHTML += `
        <div class="msg-ai">
          <div class="msg-ai-icon">🤖</div>
          <div class="bubble ai">Having trouble connecting... please try again.</div>
        </div>`;
    }
  }

  sendBtn.onclick = sendMessage;
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
})();