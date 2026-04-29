
// (function () {
//   const API_URL = "http://localhost:3000/api/chat";

//   const scriptTag = document.currentScript;
//   const botId = scriptTag.getAttribute("data-bot-id");
//   const botName = scriptTag.getAttribute("data-bot-name") || "Support";

//   if (!botId) {
//     console.error("❌ botId not found");
//     return;
//   }

//   const STORAGE_KEY = `plugai-chat-${botId}`;
//   const CHAT_W = 360;
//   const CHAT_MAX_H = 500;
//   const BTN_SIZE = 56;
//   const MARGIN = 16;
//   const GAP = 12;

//   // ─── STYLES ───────────────────────────────────────────────────────────────
//   const style = document.createElement("style");
//   style.innerHTML = `
//     @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

//     .plugai-btn {
//       position: fixed;
//       width: ${BTN_SIZE}px;
//       height: ${BTN_SIZE}px;
//       background: linear-gradient(135deg, #3b82f6, #6366f1);
//       color: white;
//       border-radius: 50%;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       cursor: grab;
//       z-index: 999999;
//       box-shadow: 0 8px 32px rgba(99,102,241,0.5);
//       transition: box-shadow 0.2s;
//       user-select: none;
//       -webkit-user-select: none;
//     }

//     .plugai-btn:hover {
//       box-shadow: 0 12px 40px rgba(99,102,241,0.6);
//     }

//     .plugai-btn.dragging {
//       cursor: grabbing;
//       box-shadow: 0 16px 48px rgba(99,102,241,0.7);
//     }

//     .plugai-btn svg {
//       width: 24px;
//       height: 24px;
//       pointer-events: none;
//     }

//     .plugai-chat {
//       position: fixed;
//       width: ${CHAT_W}px;
//       max-height: ${CHAT_MAX_H}px;
//       background: #09090b;
//       color: white;
//       border-radius: 20px;
//       border: 1px solid rgba(255,255,255,0.08);
//       box-shadow: 0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04);
//       display: flex;
//       flex-direction: column;
//       overflow: hidden;
//       z-index: 999998;
//       font-family: 'Inter', sans-serif;
//       animation: plugai-fadeIn 0.25s ease;
//     }

//     @keyframes plugai-fadeIn {
//       from { opacity: 0; transform: translateY(10px) scale(0.97); }
//       to   { opacity: 1; transform: translateY(0)   scale(1);    }
//     }

//     .plugai-header {
//       padding: 14px 16px;
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       border-bottom: 1px solid rgba(255,255,255,0.06);
//       background: rgba(255,255,255,0.03);
//       flex-shrink: 0;
//     }

//     .plugai-header-left {
//       display: flex;
//       align-items: center;
//       gap: 10px;
//     }

//     .plugai-avatar {
//       width: 34px;
//       height: 34px;
//       border-radius: 10px;
//       background: linear-gradient(135deg, #3b82f6, #6366f1);
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 16px;
//       flex-shrink: 0;
//     }

//     .plugai-header-info .title {
//       font-size: 13px;
//       font-weight: 600;
//       color: #fff;
//     }

//     .plugai-header-info .status {
//       font-size: 11px;
//       color: #22c55e;
//       display: flex;
//       align-items: center;
//       gap: 4px;
//       margin-top: 1px;
//     }

//     .plugai-header-info .status::before {
//       content: '';
//       width: 6px;
//       height: 6px;
//       background: #22c55e;
//       border-radius: 50%;
//       display: inline-block;
//       animation: plugai-pulse 2s infinite;
//     }

//     @keyframes plugai-pulse {
//       0%, 100% { opacity: 1; }
//       50%       { opacity: 0.4; }
//     }

//     .plugai-header-actions {
//       display: flex;
//       align-items: center;
//       gap: 6px;
//     }

//     .plugai-header-actions button {
//       background: rgba(255,255,255,0.06);
//       border: 1px solid rgba(255,255,255,0.08);
//       color: #a1a1aa;
//       font-size: 11px;
//       font-weight: 500;
//       cursor: pointer;
//       padding: 5px 10px;
//       border-radius: 8px;
//       font-family: 'Inter', sans-serif;
//       transition: all 0.15s;
//     }

//     .plugai-header-actions button:hover {
//       background: rgba(255,255,255,0.1);
//       color: white;
//     }

//     .plugai-close-btn {
//       width: 28px !important;
//       height: 28px !important;
//       padding: 0 !important;
//       display: flex !important;
//       align-items: center !important;
//       justify-content: center !important;
//       border-radius: 8px !important;
//       font-size: 14px !important;
//     }

//     .plugai-messages {
//       flex: 1;
//       padding: 14px;
//       overflow-y: auto;
//       display: flex;
//       flex-direction: column;
//       gap: 10px;
//       scrollbar-width: thin;
//       scrollbar-color: rgba(255,255,255,0.1) transparent;
//     }

//     .plugai-messages::-webkit-scrollbar       { width: 4px; }
//     .plugai-messages::-webkit-scrollbar-track  { background: transparent; }
//     .plugai-messages::-webkit-scrollbar-thumb  { background: rgba(255,255,255,0.1); border-radius: 4px; }

//     .plugai-input-area {
//       padding: 12px;
//       border-top: 1px solid rgba(255,255,255,0.06);
//       background: rgba(255,255,255,0.02);
//       flex-shrink: 0;
//     }

//     .plugai-input-row {
//       display: flex;
//       align-items: center;
//       gap: 8px;
//       background: rgba(255,255,255,0.05);
//       border: 1px solid rgba(255,255,255,0.08);
//       border-radius: 12px;
//       padding: 6px 6px 6px 12px;
//       transition: border-color 0.2s;
//     }

//     .plugai-input-row:focus-within {
//       border-color: rgba(99,102,241,0.5);
//     }

//     .plugai-input-row input {
//       flex: 1;
//       border: none;
//       background: transparent;
//       color: white;
//       outline: none;
//       font-size: 13px;
//       font-family: 'Inter', sans-serif;
//     }

//     .plugai-input-row input::placeholder { color: #52525b; }

//     .plugai-send-btn {
//       width: 32px;
//       height: 32px;
//       background: linear-gradient(135deg, #3b82f6, #6366f1);
//       border: none;
//       border-radius: 8px;
//       cursor: pointer;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       flex-shrink: 0;
//       transition: opacity 0.2s, transform 0.15s;
//     }

//     .plugai-send-btn:hover    { opacity: 0.9; transform: scale(1.05); }
//     .plugai-send-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

//     .plugai-send-btn svg { width: 15px; height: 15px; color: white; }

//     .plugai-powered {
//       text-align: center;
//       font-size: 10px;
//       color: #3f3f46;
//       margin-top: 8px;
//       font-family: 'Inter', sans-serif;
//     }

//     .plugai-powered span { color: #3b82f6; }

//     .msg-user { display: flex; justify-content: flex-end; }
//     .msg-ai   { display: flex; justify-content: flex-start; align-items: flex-end; gap: 8px; }

//     .msg-ai-icon {
//       width: 26px;
//       height: 26px;
//       border-radius: 8px;
//       background: linear-gradient(135deg, #3b82f6, #6366f1);
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 12px;
//       flex-shrink: 0;
//     }

//     .bubble {
//       display: inline-block;
//       padding: 10px 14px;
//       border-radius: 14px;
//       max-width: 78%;
//       font-size: 13px;
//       line-height: 1.5;
//       word-break: break-word;
//     }

//     .bubble.user {
//       background: linear-gradient(135deg, #3b82f6, #6366f1);
//       color: white;
//       border-bottom-right-radius: 4px;
//     }

//     .bubble.ai {
//       background: rgba(255,255,255,0.06);
//       border: 1px solid rgba(255,255,255,0.08);
//       color: #e4e4e7;
//       border-bottom-left-radius: 4px;
//     }

//     .bubble.typing {
//       display: flex;
//       gap: 4px;
//       align-items: center;
//       padding: 12px 16px;
//     }

//     .typing-dot {
//       width: 6px;
//       height: 6px;
//       background: #6366f1;
//       border-radius: 50%;
//       animation: plugai-bounce 1.2s infinite;
//     }
//     .typing-dot:nth-child(2) { animation-delay: 0.2s; }
//     .typing-dot:nth-child(3) { animation-delay: 0.4s; }

//     @keyframes plugai-bounce {
//       0%, 60%, 100% { transform: translateY(0); }
//       30%            { transform: translateY(-6px); }
//     }

//     @media (max-width: 480px) {
//       .plugai-chat {
//         width: calc(100vw - ${MARGIN * 2}px) !important;
//       }
//     }
//   `;
//   document.head.appendChild(style);

//   // ─── BUTTON ───────────────────────────────────────────────────────────────
//   const button = document.createElement("div");
//   button.className = "plugai-btn";
//   button.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//     <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//   </svg>`;

//   // Default position: bottom-right
//   let btnX = window.innerWidth  - BTN_SIZE - MARGIN;
//   let btnY = window.innerHeight - BTN_SIZE - MARGIN;

//   function applyBtnPos() {
//     button.style.left   = btnX + "px";
//     button.style.top    = btnY + "px";
//     button.style.right  = "auto";
//     button.style.bottom = "auto";
//   }
//   applyBtnPos();

//   // ─── CHAT WINDOW ──────────────────────────────────────────────────────────
//   const chat = document.createElement("div");
//   chat.className = "plugai-chat";
//   chat.style.display = "none";

//   chat.innerHTML = `
//     <div class="plugai-header">
//       <div class="plugai-header-left">
//         <div class="plugai-avatar">🤖</div>
//         <div class="plugai-header-info">
//           <div class="title">${botName}</div>
//           <div class="status">Online</div>
//         </div>
//       </div>
//       <div class="plugai-header-actions">
//         <button id="plugai-clear">New Chat</button>
//         <button class="plugai-close-btn" id="plugai-close">✕</button>
//       </div>
//     </div>

//     <div class="plugai-messages" id="plugai-messages"></div>

//     <div class="plugai-input-area">
//       <div class="plugai-input-row">
//         <input id="plugai-input" placeholder="Ask me anything..." />
//         <button class="plugai-send-btn" id="plugai-send">
//           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
//             <line x1="22" y1="2" x2="11" y2="13"></line>
//             <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
//           </svg>
//         </button>
//       </div>
//       <div class="plugai-powered">Powered by <span>PlugAI</span></div>
//     </div>
//   `;

//   document.body.appendChild(button);
//   document.body.appendChild(chat);

//   const messagesDiv = chat.querySelector("#plugai-messages");
//   const input       = chat.querySelector("#plugai-input");
//   const sendBtn     = chat.querySelector("#plugai-send");

//   const defaultMsg = `
//     <div class="msg-ai">
//       <div class="msg-ai-icon">🤖</div>
//       <div class="bubble ai">Hi! I'm here to help with <strong>${botName}</strong>. What would you like to know?</div>
//     </div>`;

//   messagesDiv.innerHTML = localStorage.getItem(STORAGE_KEY) || defaultMsg;

//   // ─── SMART POSITIONING ────────────────────────────────────────────────────
//   // Positions the chat window so it's always fully visible,
//   // auto-flipping above/below and left/right based on available space.
//   function positionChat() {
//     const vw = window.innerWidth;
//     const vh = window.innerHeight;
//     const chatH = Math.min(CHAT_MAX_H, vh - MARGIN * 2);
//     const chatW = Math.min(CHAT_W, vw - MARGIN * 2);

//     const spaceAbove = btnY;
//     const spaceBelow = vh - (btnY + BTN_SIZE);
//     const spaceLeft  = btnX;
//     const spaceRight = vw - (btnX + BTN_SIZE);

//     let top, left;

//     // Vertical: prefer above, fall back to below, then clamp
//     if (spaceAbove >= chatH + GAP) {
//       top = btnY - chatH - GAP;
//     } else if (spaceBelow >= chatH + GAP) {
//       top = btnY + BTN_SIZE + GAP;
//     } else {
//       top = Math.max(MARGIN, Math.min(vh - chatH - MARGIN, btnY + BTN_SIZE / 2 - chatH / 2));
//     }

//     // Horizontal: align right edge with button right edge, then flip/clamp
//     left = btnX + BTN_SIZE - chatW;
//     if (left < MARGIN) {
//       // try aligning left edges
//       left = btnX;
//     }
//     left = Math.max(MARGIN, Math.min(vw - chatW - MARGIN, left));

//     chat.style.top    = top  + "px";
//     chat.style.left   = left + "px";
//     chat.style.right  = "auto";
//     chat.style.bottom = "auto";
//     chat.style.width  = chatW + "px";
//   }

//   // ─── DRAGGABLE BUTTON ─────────────────────────────────────────────────────
//   let chatOpen  = false;
//   let isDragging = false;

//   button.addEventListener("mousedown", (e) => {
//     if (e.button !== 0) return;
//     isDragging = false;
//     const startX = e.clientX - btnX;
//     const startY = e.clientY - btnY;
//     button.classList.add("dragging");

//     function onMove(ev) {
//       isDragging = true;
//       btnX = Math.max(0, Math.min(window.innerWidth  - BTN_SIZE, ev.clientX - startX));
//       btnY = Math.max(0, Math.min(window.innerHeight - BTN_SIZE, ev.clientY - startY));
//       applyBtnPos();
//       if (chatOpen) positionChat();
//     }

//     function onUp() {
//       button.classList.remove("dragging");
//       document.removeEventListener("mousemove", onMove);
//       document.removeEventListener("mouseup",   onUp);
//       if (!isDragging) toggleChat(); // tap = toggle
//     }

//     document.addEventListener("mousemove", onMove);
//     document.addEventListener("mouseup",   onUp);
//     e.preventDefault();
//   });

//   // Touch support for mobile
//   button.addEventListener("touchstart", (e) => {
//     isDragging = false;
//     const t0 = e.touches[0];
//     const startX = t0.clientX - btnX;
//     const startY = t0.clientY - btnY;

//     function onMove(ev) {
//       isDragging = true;
//       const t = ev.touches[0];
//       btnX = Math.max(0, Math.min(window.innerWidth  - BTN_SIZE, t.clientX - startX));
//       btnY = Math.max(0, Math.min(window.innerHeight - BTN_SIZE, t.clientY - startY));
//       applyBtnPos();
//       if (chatOpen) positionChat();
//       ev.preventDefault();
//     }

//     function onEnd() {
//       button.removeEventListener("touchmove", onMove);
//       button.removeEventListener("touchend",  onEnd);
//       if (!isDragging) toggleChat();
//     }

//     button.addEventListener("touchmove", onMove, { passive: false });
//     button.addEventListener("touchend",  onEnd);
//   }, { passive: true });

//   // ─── OPEN / CLOSE ─────────────────────────────────────────────────────────
//   function toggleChat() {
//     chatOpen = !chatOpen;
//     if (chatOpen) {
//       chat.style.display = "flex";
//       positionChat();
//       input.focus();
//     } else {
//       chat.style.display = "none";
//     }
//   }

//   chat.querySelector("#plugai-close").onclick = () => {
//     chatOpen = false;
//     chat.style.display = "none";
//   };

//   chat.querySelector("#plugai-clear").onclick = () => {
//     localStorage.removeItem(STORAGE_KEY);
//     messagesDiv.innerHTML = defaultMsg;
//   };

//   // Reposition on window resize
//   window.addEventListener("resize", () => {
//     // Keep button inside viewport after resize
//     btnX = Math.min(btnX, window.innerWidth  - BTN_SIZE);
//     btnY = Math.min(btnY, window.innerHeight - BTN_SIZE);
//     applyBtnPos();
//     if (chatOpen) positionChat();
//   });

//   // ─── MESSAGING ────────────────────────────────────────────────────────────
//   async function fetchWithRetry(url, options, retries = 2) {
//     try {
//       const res = await fetch(url, options);

//       // Bot deleted
//       if (res.status === 404) {
//         return { __status: 404 };
//       }
//       // Bot disabled
//       if (res.status === 403) {
//         return { __status: 403 };
//       }

//       if (!res.ok) throw new Error("Request failed");
//       const data = await res.json();
//       data.__status = 200;
//       return data;
//     } catch (err) {
//       if (retries > 0) return fetchWithRetry(url, options, retries - 1);
//       throw err;
//     }
//   }

//   function addMessage(html) {
//     messagesDiv.innerHTML += html;
//     messagesDiv.scrollTop  = messagesDiv.scrollHeight;
//   }

//   function disableInput(placeholder) {
//     input.disabled       = true;
//     sendBtn.disabled     = true;
//     input.placeholder    = placeholder;
//   }

//   async function sendMessage() {
//     const message = input.value.trim();
//     if (!message) return;

//     addMessage(`
//       <div class="msg-user">
//         <div class="bubble user">${message}</div>
//       </div>`);

//     input.value = "";

//     const typingId = "typing-" + Date.now();
//     addMessage(`
//       <div class="msg-ai" id="${typingId}">
//         <div class="msg-ai-icon">🤖</div>
//         <div class="bubble ai typing">
//           <div class="typing-dot"></div>
//           <div class="typing-dot"></div>
//           <div class="typing-dot"></div>
//         </div>
//       </div>`);

//     try {
//       const data = await fetchWithRetry(API_URL, {
//         method:  "POST",
//         headers: { "Content-Type": "application/json" },
//         body:    JSON.stringify({ message, botId }),
//       });

//       document.getElementById(typingId)?.remove();

//       if (data.__status === 404) {
//         addMessage(`<div class="msg-ai"><div class="msg-ai-icon">🤖</div><div class="bubble ai">This chatbot is no longer available.</div></div>`);
//         disableInput("Chatbot unavailable");
//         return;
//       }

//       if (data.__status === 403) {
//         addMessage(`<div class="msg-ai"><div class="msg-ai-icon">🤖</div><div class="bubble ai">This chatbot has been disabled.</div></div>`);
//         disableInput("Chat disabled");
//         return;
//       }

//       addMessage(`
//         <div class="msg-ai">
//           <div class="msg-ai-icon">🤖</div>
//           <div class="bubble ai">${data.reply}</div>
//         </div>`);

//       localStorage.setItem(STORAGE_KEY, messagesDiv.innerHTML);

//     } catch (err) {
//       document.getElementById(typingId)?.remove();
//       addMessage(`<div class="msg-ai"><div class="msg-ai-icon">🤖</div><div class="bubble ai">Unable to connect. Please try again later.</div></div>`);
//     }
//   }

//   sendBtn.onclick = sendMessage;
//   input.addEventListener("keypress", (e) => {
//     if (e.key === "Enter") sendMessage();
//   });
// })();
// (function () {
//   const API_URL = "http://localhost:3000/api/chat";

//   const scriptTag = document.currentScript;
//   const botId = scriptTag.getAttribute("data-bot-id");
//   const botName = scriptTag.getAttribute("data-bot-name") || "Support";
//   const botLogo = scriptTag.getAttribute("data-bot-logo") || null;

//   if (!botId) {
//     console.error("❌ botId not found");
//     return;
//   }

//   const STORAGE_KEY = `plugai-chat-${botId}`;
//   const CHAT_W = 360;
//   const CHAT_MAX_H = 500;
//   const BTN_SIZE = 56;
//   const MARGIN = 16;
//   const GAP = 12;

//   const avatarHTML = botLogo
//     ? `<img src="${botLogo}" alt="bot" style="width:100%;height:100%;object-fit:contain;" />`
//     : `🤖`;

//   const iconHTML = botLogo
//     ? `<img src="${botLogo}" alt="bot" style="width:100%;height:100%;object-fit:contain;" />`
//     : `🤖`;

//   // ─── STYLES ───────────────────────────────────────────────────────────────
//   const style = document.createElement("style");
//   style.innerHTML = `
//     @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

//     .plugai-btn {
//       position: fixed;
//       width: ${BTN_SIZE}px;
//       height: ${BTN_SIZE}px;
//       background: linear-gradient(135deg, #3b82f6, #6366f1);
//       color: white;
//       border-radius: 50%;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       cursor: grab;
//       z-index: 999999;
//       box-shadow: 0 8px 32px rgba(99,102,241,0.5);
//       transition: box-shadow 0.2s;
//       user-select: none;
//       -webkit-user-select: none;
//     }

//     .plugai-btn:hover {
//       box-shadow: 0 12px 40px rgba(99,102,241,0.6);
//     }

//     .plugai-btn.dragging {
//       cursor: grabbing;
//       box-shadow: 0 16px 48px rgba(99,102,241,0.7);
//     }

//     .plugai-btn svg {
//       width: 24px;
//       height: 24px;
//       pointer-events: none;
//     }

//     .plugai-chat {
//       position: fixed;
//       width: ${CHAT_W}px;
//       max-height: ${CHAT_MAX_H}px;
//       background: #09090b;
//       color: white;
//       border-radius: 20px;
//       border: 1px solid rgba(255,255,255,0.08);
//       box-shadow: 0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04);
//       display: flex;
//       flex-direction: column;
//       overflow: hidden;
//       z-index: 999998;
//       font-family: 'Inter', sans-serif;
//       animation: plugai-fadeIn 0.25s ease;
//     }

//     @keyframes plugai-fadeIn {
//       from { opacity: 0; transform: translateY(10px) scale(0.97); }
//       to   { opacity: 1; transform: translateY(0)   scale(1);    }
//     }

//     .plugai-header {
//       padding: 14px 16px;
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       border-bottom: 1px solid rgba(255,255,255,0.06);
//       background: rgba(255,255,255,0.03);
//       flex-shrink: 0;
//     }

//     .plugai-header-left {
//       display: flex;
//       align-items: center;
//       gap: 10px;
//     }

//     .plugai-avatar {
//       width: 34px;
//       height: 34px;
//       border-radius: 10px;
//       background: linear-gradient(135deg, #3b82f6, #6366f1);
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 16px;
//       flex-shrink: 0;
//       overflow: hidden;
//       ${botLogo ? "padding: 5px;" : ""}
//     }

//     .plugai-header-info .title {
//       font-size: 13px;
//       font-weight: 600;
//       color: #fff;
//     }

//     .plugai-header-info .status {
//       font-size: 11px;
//       color: #22c55e;
//       display: flex;
//       align-items: center;
//       gap: 4px;
//       margin-top: 1px;
//     }

//     .plugai-header-info .status::before {
//       content: '';
//       width: 6px;
//       height: 6px;
//       background: #22c55e;
//       border-radius: 50%;
//       display: inline-block;
//       animation: plugai-pulse 2s infinite;
//     }

//     @keyframes plugai-pulse {
//       0%, 100% { opacity: 1; }
//       50%       { opacity: 0.4; }
//     }

//     .plugai-header-actions {
//       display: flex;
//       align-items: center;
//       gap: 6px;
//     }

//     .plugai-header-actions button {
//       background: rgba(255,255,255,0.06);
//       border: 1px solid rgba(255,255,255,0.08);
//       color: #a1a1aa;
//       font-size: 11px;
//       font-weight: 500;
//       cursor: pointer;
//       padding: 5px 10px;
//       border-radius: 8px;
//       font-family: 'Inter', sans-serif;
//       transition: all 0.15s;
//     }

//     .plugai-header-actions button:hover {
//       background: rgba(255,255,255,0.1);
//       color: white;
//     }

//     .plugai-close-btn {
//       width: 28px !important;
//       height: 28px !important;
//       padding: 0 !important;
//       display: flex !important;
//       align-items: center !important;
//       justify-content: center !important;
//       border-radius: 8px !important;
//       font-size: 14px !important;
//     }

//     .plugai-messages {
//       flex: 1;
//       padding: 14px;
//       overflow-y: auto;
//       display: flex;
//       flex-direction: column;
//       gap: 10px;
//       scrollbar-width: thin;
//       scrollbar-color: rgba(255,255,255,0.1) transparent;
//     }

//     .plugai-messages::-webkit-scrollbar       { width: 4px; }
//     .plugai-messages::-webkit-scrollbar-track  { background: transparent; }
//     .plugai-messages::-webkit-scrollbar-thumb  { background: rgba(255,255,255,0.1); border-radius: 4px; }

//     .plugai-input-area {
//       padding: 12px;
//       border-top: 1px solid rgba(255,255,255,0.06);
//       background: rgba(255,255,255,0.02);
//       flex-shrink: 0;
//     }

//     .plugai-input-row {
//       display: flex;
//       align-items: center;
//       gap: 8px;
//       background: rgba(255,255,255,0.05);
//       border: 1px solid rgba(255,255,255,0.08);
//       border-radius: 12px;
//       padding: 6px 6px 6px 12px;
//       transition: border-color 0.2s;
//     }

//     .plugai-input-row:focus-within {
//       border-color: rgba(99,102,241,0.5);
//     }

//     .plugai-input-row input {
//       flex: 1;
//       border: none;
//       background: transparent;
//       color: white;
//       outline: none;
//       font-size: 13px;
//       font-family: 'Inter', sans-serif;
//     }

//     .plugai-input-row input::placeholder { color: #52525b; }

//     .plugai-send-btn {
//       width: 32px;
//       height: 32px;
//       background: linear-gradient(135deg, #3b82f6, #6366f1);
//       border: none;
//       border-radius: 8px;
//       cursor: pointer;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       flex-shrink: 0;
//       transition: opacity 0.2s, transform 0.15s;
//     }

//     .plugai-send-btn:hover    { opacity: 0.9; transform: scale(1.05); }
//     .plugai-send-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
//     .plugai-send-btn svg { width: 15px; height: 15px; color: white; }

//     .plugai-powered {
//       text-align: center;
//       font-size: 10px;
//       color: #3f3f46;
//       margin-top: 8px;
//       font-family: 'Inter', sans-serif;
//     }

//     .plugai-powered span { color: #3b82f6; }

//     .msg-user { display: flex; justify-content: flex-end; }
//     .msg-ai   { display: flex; justify-content: flex-start; align-items: flex-end; gap: 8px; }

//     .msg-ai-icon {
//       width: 26px;
//       height: 26px;
//       border-radius: 8px;
//       background: linear-gradient(135deg, #3b82f6, #6366f1);
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       font-size: 12px;
//       flex-shrink: 0;
//       overflow: hidden;
//       ${botLogo ? "padding: 3px;" : ""}
//     }

//     .bubble {
//       display: inline-block;
//       padding: 10px 14px;
//       border-radius: 14px;
//       max-width: 78%;
//       font-size: 13px;
//       line-height: 1.5;
//       word-break: break-word;
//     }

//     .bubble.user {
//       background: linear-gradient(135deg, #3b82f6, #6366f1);
//       color: white;
//       border-bottom-right-radius: 4px;
//     }

//     .bubble.ai {
//       background: rgba(255,255,255,0.06);
//       border: 1px solid rgba(255,255,255,0.08);
//       color: #e4e4e7;
//       border-bottom-left-radius: 4px;
//     }

//     .bubble.typing {
//       display: flex;
//       gap: 4px;
//       align-items: center;
//       padding: 12px 16px;
//     }

//     .typing-dot {
//       width: 6px;
//       height: 6px;
//       background: #6366f1;
//       border-radius: 50%;
//       animation: plugai-bounce 1.2s infinite;
//     }
//     .typing-dot:nth-child(2) { animation-delay: 0.2s; }
//     .typing-dot:nth-child(3) { animation-delay: 0.4s; }

//     @keyframes plugai-bounce {
//       0%, 60%, 100% { transform: translateY(0); }
//       30%            { transform: translateY(-6px); }
//     }

//     @media (max-width: 480px) {
//       .plugai-chat {
//         width: calc(100vw - ${MARGIN * 2}px) !important;
//       }
//     }
//   `;
//   document.head.appendChild(style);

//   // ─── BUTTON ───────────────────────────────────────────────────────────────
//   const button = document.createElement("div");
//   button.className = "plugai-btn";
//   button.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//     <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//   </svg>`;

//   let btnX = window.innerWidth  - BTN_SIZE - MARGIN;
//   let btnY = window.innerHeight - BTN_SIZE - MARGIN;

//   function applyBtnPos() {
//     button.style.left   = btnX + "px";
//     button.style.top    = btnY + "px";
//     button.style.right  = "auto";
//     button.style.bottom = "auto";
//   }
//   applyBtnPos();

//   // ─── CHAT WINDOW ──────────────────────────────────────────────────────────
//   const chat = document.createElement("div");
//   chat.className = "plugai-chat";
//   chat.style.display = "none";

//   chat.innerHTML = `
//     <div class="plugai-header">
//       <div class="plugai-header-left">
//         <div class="plugai-avatar">${avatarHTML}</div>
//         <div class="plugai-header-info">
//           <div class="title">${botName}</div>
//           <div class="status">Online</div>
//         </div>
//       </div>
//       <div class="plugai-header-actions">
//         <button id="plugai-clear">New Chat</button>
//         <button class="plugai-close-btn" id="plugai-close">✕</button>
//       </div>
//     </div>

//     <div class="plugai-messages" id="plugai-messages"></div>

//     <div class="plugai-input-area">
//       <div class="plugai-input-row">
//         <input id="plugai-input" placeholder="Ask me anything..." />
//         <button class="plugai-send-btn" id="plugai-send">
//           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
//             <line x1="22" y1="2" x2="11" y2="13"></line>
//             <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
//           </svg>
//         </button>
//       </div>
//       <div class="plugai-powered">Powered by <span>PlugAI</span></div>
//     </div>
//   `;

//   document.body.appendChild(button);
//   document.body.appendChild(chat);

//   const messagesDiv = chat.querySelector("#plugai-messages");
//   const input       = chat.querySelector("#plugai-input");
//   const sendBtn     = chat.querySelector("#plugai-send");

//   const defaultMsg = `
//     <div class="msg-ai">
//       <div class="msg-ai-icon">${iconHTML}</div>
//       <div class="bubble ai">Hi! I'm here to help with <strong>${botName}</strong>. What would you like to know?</div>
//     </div>`;

//   messagesDiv.innerHTML = localStorage.getItem(STORAGE_KEY) || defaultMsg;

//   // ─── SMART POSITIONING ────────────────────────────────────────────────────
//   function positionChat() {
//     const vw = window.innerWidth;
//     const vh = window.innerHeight;
//     const chatH = Math.min(CHAT_MAX_H, vh - MARGIN * 2);
//     const chatW = Math.min(CHAT_W, vw - MARGIN * 2);

//     const spaceAbove = btnY;
//     const spaceBelow = vh - (btnY + BTN_SIZE);

//     let top, left;

//     if (spaceAbove >= chatH + GAP) {
//       top = btnY - chatH - GAP;
//     } else if (spaceBelow >= chatH + GAP) {
//       top = btnY + BTN_SIZE + GAP;
//     } else {
//       top = Math.max(MARGIN, Math.min(vh - chatH - MARGIN, btnY + BTN_SIZE / 2 - chatH / 2));
//     }

//     left = btnX + BTN_SIZE - chatW;
//     if (left < MARGIN) left = btnX;
//     left = Math.max(MARGIN, Math.min(vw - chatW - MARGIN, left));

//     chat.style.top    = top  + "px";
//     chat.style.left   = left + "px";
//     chat.style.right  = "auto";
//     chat.style.bottom = "auto";
//     chat.style.width  = chatW + "px";
//   }

//   // ─── DRAGGABLE BUTTON ─────────────────────────────────────────────────────
//   let chatOpen  = false;
//   let isDragging = false;

//   button.addEventListener("mousedown", (e) => {
//     if (e.button !== 0) return;
//     isDragging = false;
//     const startX = e.clientX - btnX;
//     const startY = e.clientY - btnY;
//     button.classList.add("dragging");

//     function onMove(ev) {
//       isDragging = true;
//       btnX = Math.max(0, Math.min(window.innerWidth  - BTN_SIZE, ev.clientX - startX));
//       btnY = Math.max(0, Math.min(window.innerHeight - BTN_SIZE, ev.clientY - startY));
//       applyBtnPos();
//       if (chatOpen) positionChat();
//     }

//     function onUp() {
//       button.classList.remove("dragging");
//       document.removeEventListener("mousemove", onMove);
//       document.removeEventListener("mouseup",   onUp);
//       if (!isDragging) toggleChat();
//     }

//     document.addEventListener("mousemove", onMove);
//     document.addEventListener("mouseup",   onUp);
//     e.preventDefault();
//   });

//   button.addEventListener("touchstart", (e) => {
//     isDragging = false;
//     const t0 = e.touches[0];
//     const startX = t0.clientX - btnX;
//     const startY = t0.clientY - btnY;

//     function onMove(ev) {
//       isDragging = true;
//       const t = ev.touches[0];
//       btnX = Math.max(0, Math.min(window.innerWidth  - BTN_SIZE, t.clientX - startX));
//       btnY = Math.max(0, Math.min(window.innerHeight - BTN_SIZE, t.clientY - startY));
//       applyBtnPos();
//       if (chatOpen) positionChat();
//       ev.preventDefault();
//     }

//     function onEnd() {
//       button.removeEventListener("touchmove", onMove);
//       button.removeEventListener("touchend",  onEnd);
//       if (!isDragging) toggleChat();
//     }

//     button.addEventListener("touchmove", onMove, { passive: false });
//     button.addEventListener("touchend",  onEnd);
//   }, { passive: true });

//   // ─── OPEN / CLOSE ─────────────────────────────────────────────────────────
//   function toggleChat() {
//     chatOpen = !chatOpen;
//     if (chatOpen) {
//       chat.style.display = "flex";
//       positionChat();
//       input.focus();
//     } else {
//       chat.style.display = "none";
//     }
//   }

//   chat.querySelector("#plugai-close").onclick = () => {
//     chatOpen = false;
//     chat.style.display = "none";
//   };

//   chat.querySelector("#plugai-clear").onclick = () => {
//     localStorage.removeItem(STORAGE_KEY);
//     messagesDiv.innerHTML = defaultMsg;
//   };

//   window.addEventListener("resize", () => {
//     btnX = Math.min(btnX, window.innerWidth  - BTN_SIZE);
//     btnY = Math.min(btnY, window.innerHeight - BTN_SIZE);
//     applyBtnPos();
//     if (chatOpen) positionChat();
//   });

//   // ─── MESSAGING ────────────────────────────────────────────────────────────
//   async function fetchWithRetry(url, options, retries = 2) {
//     try {
//       const res = await fetch(url, options);
//       if (res.status === 404) return { __status: 404 };
//       if (res.status === 403) return { __status: 403 };
//       if (!res.ok) throw new Error("Request failed");
//       const data = await res.json();
//       data.__status = 200;
//       return data;
//     } catch (err) {
//       if (retries > 0) return fetchWithRetry(url, options, retries - 1);
//       throw err;
//     }
//   }

//   function addMessage(html) {
//     messagesDiv.innerHTML += html;
//     messagesDiv.scrollTop  = messagesDiv.scrollHeight;
//   }

//   function disableInput(placeholder) {
//     input.disabled    = true;
//     sendBtn.disabled  = true;
//     input.placeholder = placeholder;
//   }

//   async function sendMessage() {
//     const message = input.value.trim();
//     if (!message) return;

//     addMessage(`
//       <div class="msg-user">
//         <div class="bubble user">${message}</div>
//       </div>`);

//     input.value = "";

//     const typingId = "typing-" + Date.now();
//     addMessage(`
//       <div class="msg-ai" id="${typingId}">
//         <div class="msg-ai-icon">${iconHTML}</div>
//         <div class="bubble ai typing">
//           <div class="typing-dot"></div>
//           <div class="typing-dot"></div>
//           <div class="typing-dot"></div>
//         </div>
//       </div>`);

//     try {
//       const data = await fetchWithRetry(API_URL, {
//         method:  "POST",
//         headers: { "Content-Type": "application/json" },
//         body:    JSON.stringify({ message, botId }),
//       });

//       document.getElementById(typingId)?.remove();

//       if (data.__status === 404) {
//         addMessage(`<div class="msg-ai"><div class="msg-ai-icon">${iconHTML}</div><div class="bubble ai">This chatbot is no longer available.</div></div>`);
//         disableInput("Chatbot unavailable");
//         return;
//       }

//       if (data.__status === 403) {
//         addMessage(`<div class="msg-ai"><div class="msg-ai-icon">${iconHTML}</div><div class="bubble ai">This chatbot has been disabled.</div></div>`);
//         disableInput("Chat disabled");
//         return;
//       }

//       addMessage(`
//         <div class="msg-ai">
//           <div class="msg-ai-icon">${iconHTML}</div>
//           <div class="bubble ai">${data.reply}</div>
//         </div>`);

//       localStorage.setItem(STORAGE_KEY, messagesDiv.innerHTML);

//     } catch (err) {
//       document.getElementById(typingId)?.remove();
//       addMessage(`<div class="msg-ai"><div class="msg-ai-icon">${iconHTML}</div><div class="bubble ai">Unable to connect. Please try again later.</div></div>`);
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
  const botLogo = scriptTag.getAttribute("data-bot-logo") || null;

  if (!botId) {
    console.error("❌ botId not found");
    return;
  }

  const STORAGE_KEY = `plugai-chat-${botId}`;
  const CHAT_W = 360;
  const CHAT_MAX_H = 500;
  const BTN_SIZE = 56;
  const MARGIN = 16;
  const GAP = 12;

  const avatarHTML = botLogo
    ? `<img src="${botLogo}" alt="bot" style="width:100%;height:100%;object-fit:contain;" />`
    : `🤖`;

  const iconHTML = botLogo
    ? `<img src="${botLogo}" alt="bot" style="width:100%;height:100%;object-fit:contain;" />`
    : `🤖`;

  // ─── MARKDOWN PARSER ──────────────────────────────────────────────────────
  function parseMarkdown(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/^\* (.+)$/gm, "<li>$1</li>")
      .replace(/(<li>.*?<\/li>(\n|$))+/gs, (match) =>
        `<ul style="margin:6px 0 6px 14px;padding:0;list-style:disc;">${match}</ul>`
      )
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g,
        `<a href="$2" target="_blank" style="color:#3b82f6;text-decoration:underline;">$1</a>`
      )
      .replace(/\n{2,}/g, "</p><p style='margin:6px 0;'>")
      .replace(/\n/g, "<br/>")
  }

  // ─── STYLES ───────────────────────────────────────────────────────────────
  const style = document.createElement("style");
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

    .plugai-btn {
      position: fixed;
      width: ${BTN_SIZE}px;
      height: ${BTN_SIZE}px;
      background: linear-gradient(135deg, #3b82f6, #6366f1);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: grab;
      z-index: 999999;
      box-shadow: 0 8px 32px rgba(99,102,241,0.5);
      transition: box-shadow 0.2s;
      user-select: none;
      -webkit-user-select: none;
    }

    .plugai-btn:hover {
      box-shadow: 0 12px 40px rgba(99,102,241,0.6);
    }

    .plugai-btn.dragging {
      cursor: grabbing;
      box-shadow: 0 16px 48px rgba(99,102,241,0.7);
    }

    .plugai-btn svg {
      width: 24px;
      height: 24px;
      pointer-events: none;
    }

    .plugai-chat {
      position: fixed;
      width: ${CHAT_W}px;
      max-height: ${CHAT_MAX_H}px;
      background: #09090b;
      color: white;
      border-radius: 20px;
      border: 1px solid rgba(255,255,255,0.08);
      box-shadow: 0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      z-index: 999998;
      font-family: 'Inter', sans-serif;
      animation: plugai-fadeIn 0.25s ease;
    }

    @keyframes plugai-fadeIn {
      from { opacity: 0; transform: translateY(10px) scale(0.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    .plugai-header {
      padding: 14px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      background: rgba(255,255,255,0.03);
      flex-shrink: 0;
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
      overflow: hidden;
      ${botLogo ? "padding: 5px;" : ""}
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
      50%       { opacity: 0.4; }
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
      width: 28px !important;
      height: 28px !important;
      padding: 0 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      border-radius: 8px !important;
      font-size: 14px !important;
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

    .plugai-messages::-webkit-scrollbar       { width: 4px; }
    .plugai-messages::-webkit-scrollbar-track  { background: transparent; }
    .plugai-messages::-webkit-scrollbar-thumb  { background: rgba(255,255,255,0.1); border-radius: 4px; }

    .plugai-input-area {
      padding: 12px;
      border-top: 1px solid rgba(255,255,255,0.06);
      background: rgba(255,255,255,0.02);
      flex-shrink: 0;
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

    .plugai-input-row input::placeholder { color: #52525b; }

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

    .plugai-send-btn:hover    { opacity: 0.9; transform: scale(1.05); }
    .plugai-send-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
    .plugai-send-btn svg { width: 15px; height: 15px; color: white; }

    .plugai-powered {
      text-align: center;
      font-size: 10px;
      color: #3f3f46;
      margin-top: 8px;
      font-family: 'Inter', sans-serif;
    }

    .plugai-powered span { color: #3b82f6; }

    .msg-user { display: flex; justify-content: flex-end; }
    .msg-ai   { display: flex; justify-content: flex-start; align-items: flex-end; gap: 8px; }

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
      overflow: hidden;
      ${botLogo ? "padding: 3px;" : ""}
    }

    .bubble {
      display: inline-block;
      padding: 10px 14px;
      border-radius: 14px;
      max-width: 78%;
      font-size: 13px;
      line-height: 1.6;
      word-break: break-word;
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

    .bubble.ai ul {
      margin: 6px 0 6px 14px;
      padding: 0;
      list-style: disc;
    }

    .bubble.ai li {
      margin: 3px 0;
      line-height: 1.5;
    }

    .bubble.ai strong {
      color: #ffffff;
      font-weight: 600;
    }

    .bubble.ai a {
      color: #3b82f6;
      text-decoration: underline;
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
      30%            { transform: translateY(-6px); }
    }

    @media (max-width: 480px) {
      .plugai-chat {
        width: calc(100vw - ${MARGIN * 2}px) !important;
      }
    }
  `;
  document.head.appendChild(style);

  // ─── BUTTON ───────────────────────────────────────────────────────────────
  const button = document.createElement("div");
  button.className = "plugai-btn";
  button.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>`;

  let btnX = window.innerWidth  - BTN_SIZE - MARGIN;
  let btnY = window.innerHeight - BTN_SIZE - MARGIN;

  function applyBtnPos() {
    button.style.left   = btnX + "px";
    button.style.top    = btnY + "px";
    button.style.right  = "auto";
    button.style.bottom = "auto";
  }
  applyBtnPos();

  // ─── CHAT WINDOW ──────────────────────────────────────────────────────────
  const chat = document.createElement("div");
  chat.className = "plugai-chat";
  chat.style.display = "none";

  chat.innerHTML = `
    <div class="plugai-header">
      <div class="plugai-header-left">
        <div class="plugai-avatar">${avatarHTML}</div>
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
  const input       = chat.querySelector("#plugai-input");
  const sendBtn     = chat.querySelector("#plugai-send");

  const defaultMsg = `
    <div class="msg-ai">
      <div class="msg-ai-icon">${iconHTML}</div>
      <div class="bubble ai">Hi! I'm here to help with <strong>${botName}</strong>. What would you like to know?</div>
    </div>`;

  messagesDiv.innerHTML = localStorage.getItem(STORAGE_KEY) || defaultMsg;

  // ─── SMART POSITIONING ────────────────────────────────────────────────────
  function positionChat() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const chatH = Math.min(CHAT_MAX_H, vh - MARGIN * 2);
    const chatW = Math.min(CHAT_W, vw - MARGIN * 2);

    const spaceAbove = btnY;
    const spaceBelow = vh - (btnY + BTN_SIZE);

    let top, left;

    if (spaceAbove >= chatH + GAP) {
      top = btnY - chatH - GAP;
    } else if (spaceBelow >= chatH + GAP) {
      top = btnY + BTN_SIZE + GAP;
    } else {
      top = Math.max(MARGIN, Math.min(vh - chatH - MARGIN, btnY + BTN_SIZE / 2 - chatH / 2));
    }

    left = btnX + BTN_SIZE - chatW;
    if (left < MARGIN) left = btnX;
    left = Math.max(MARGIN, Math.min(vw - chatW - MARGIN, left));

    chat.style.top    = top  + "px";
    chat.style.left   = left + "px";
    chat.style.right  = "auto";
    chat.style.bottom = "auto";
    chat.style.width  = chatW + "px";
  }

  // ─── DRAGGABLE BUTTON ─────────────────────────────────────────────────────
  let chatOpen   = false;
  let isDragging = false;

  button.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    isDragging = false;
    const startX = e.clientX - btnX;
    const startY = e.clientY - btnY;
    button.classList.add("dragging");

    function onMove(ev) {
      isDragging = true;
      btnX = Math.max(0, Math.min(window.innerWidth  - BTN_SIZE, ev.clientX - startX));
      btnY = Math.max(0, Math.min(window.innerHeight - BTN_SIZE, ev.clientY - startY));
      applyBtnPos();
      if (chatOpen) positionChat();
    }

    function onUp() {
      button.classList.remove("dragging");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup",   onUp);
      if (!isDragging) toggleChat();
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup",   onUp);
    e.preventDefault();
  });

  button.addEventListener("touchstart", (e) => {
    isDragging = false;
    const t0 = e.touches[0];
    const startX = t0.clientX - btnX;
    const startY = t0.clientY - btnY;

    function onMove(ev) {
      isDragging = true;
      const t = ev.touches[0];
      btnX = Math.max(0, Math.min(window.innerWidth  - BTN_SIZE, t.clientX - startX));
      btnY = Math.max(0, Math.min(window.innerHeight - BTN_SIZE, t.clientY - startY));
      applyBtnPos();
      if (chatOpen) positionChat();
      ev.preventDefault();
    }

    function onEnd() {
      button.removeEventListener("touchmove", onMove);
      button.removeEventListener("touchend",  onEnd);
      if (!isDragging) toggleChat();
    }

    button.addEventListener("touchmove", onMove, { passive: false });
    button.addEventListener("touchend",  onEnd);
  }, { passive: true });

  // ─── OPEN / CLOSE ─────────────────────────────────────────────────────────
  function toggleChat() {
    chatOpen = !chatOpen;
    if (chatOpen) {
      chat.style.display = "flex";
      positionChat();
      input.focus();
    } else {
      chat.style.display = "none";
    }
  }

  chat.querySelector("#plugai-close").onclick = () => {
    chatOpen = false;
    chat.style.display = "none";
  };

  chat.querySelector("#plugai-clear").onclick = () => {
    localStorage.removeItem(STORAGE_KEY);
    messagesDiv.innerHTML = defaultMsg;
  };

  window.addEventListener("resize", () => {
    btnX = Math.min(btnX, window.innerWidth  - BTN_SIZE);
    btnY = Math.min(btnY, window.innerHeight - BTN_SIZE);
    applyBtnPos();
    if (chatOpen) positionChat();
  });

  // ─── MESSAGING ────────────────────────────────────────────────────────────
  async function fetchWithRetry(url, options, retries = 2) {
    try {
      const res = await fetch(url, options);
      if (res.status === 404) return { __status: 404 };
      if (res.status === 403) return { __status: 403 };
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      data.__status = 200;
      return data;
    } catch (err) {
      if (retries > 0) return fetchWithRetry(url, options, retries - 1);
      throw err;
    }
  }

  function addMessage(html) {
    messagesDiv.innerHTML += html;
    messagesDiv.scrollTop  = messagesDiv.scrollHeight;
  }

  function disableInput(placeholder) {
    input.disabled    = true;
    sendBtn.disabled  = true;
    input.placeholder = placeholder;
  }

  async function sendMessage() {
    const message = input.value.trim();
    if (!message) return;

    addMessage(`
      <div class="msg-user">
        <div class="bubble user">${message}</div>
      </div>`);

    input.value = "";

    const typingId = "typing-" + Date.now();
    addMessage(`
      <div class="msg-ai" id="${typingId}">
        <div class="msg-ai-icon">${iconHTML}</div>
        <div class="bubble ai typing">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>`);

    try {
      const data = await fetchWithRetry(API_URL, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ message, botId }),
      });

      document.getElementById(typingId)?.remove();

      if (data.__status === 404) {
        addMessage(`<div class="msg-ai"><div class="msg-ai-icon">${iconHTML}</div><div class="bubble ai">This chatbot is no longer available.</div></div>`);
        disableInput("Chatbot unavailable");
        return;
      }

      if (data.__status === 403) {
        addMessage(`<div class="msg-ai"><div class="msg-ai-icon">${iconHTML}</div><div class="bubble ai">This chatbot has been disabled.</div></div>`);
        disableInput("Chat disabled");
        return;
      }

      addMessage(`
        <div class="msg-ai">
          <div class="msg-ai-icon">${iconHTML}</div>
          <div class="bubble ai">${parseMarkdown(data.reply)}</div>
        </div>`);

      localStorage.setItem(STORAGE_KEY, messagesDiv.innerHTML);

    } catch (err) {
      document.getElementById(typingId)?.remove();
      addMessage(`<div class="msg-ai"><div class="msg-ai-icon">${iconHTML}</div><div class="bubble ai">Unable to connect. Please try again later.</div></div>`);
    }
  }

  sendBtn.onclick = sendMessage;
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
})();