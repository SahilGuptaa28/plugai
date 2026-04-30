# 🚀 PlugAI – AI Chatbot SaaS Platform

PlugAI is a full-stack SaaS platform that enables businesses to create and deploy custom AI-powered customer support chatbots with ease.

Users can train chatbots using their own business knowledge and embed them on any website using a simple JavaScript widget.

---

## 🌐 Live Demo

👉 https://plugai.vercel.app

---

## ✨ Features

* 🔐 Authentication (Google + Credentials via NextAuth)
* 🤖 Create and manage multiple chatbots
* 🧠 Custom knowledge-based AI responses
* 🌍 Embeddable chatbot widget (`chatbot.js`)
* 💬 Real-time AI chat system
* 💳 Razorpay payment integration
* 📊 Subscription plans (Free / Pro / Business)
* ⚡ Fast deployment on Vercel

---

## 🧠 AI System

* Powered by Cohere API (v2)
* Model: `command-a-03-2025`
* Context-aware responses using:

  * Business name
  * Support email
  * Custom knowledge base
* Strict rules to:

  * Prevent hallucinations
  * Redirect unknown queries to support

---

## 🏗️ Tech Stack

* **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS
* **Backend:** Next.js API Routes
* **Database:** MongoDB (Mongoose)
* **Auth:** NextAuth
* **Payments:** Razorpay
* **AI:** Cohere API
* **Deployment:** Vercel

---

## ⚙️ API Routes

| Endpoint                | Description              |
| ----------------------- | ------------------------ |
| `/api/chat`             | Handles chatbot messages |
| `/api/create-order`     | Creates Razorpay order   |
| `/api/razorpay/webhook` | Updates user plan        |
| `/api/bots/[botId]`     | Update/Delete chatbot    |

---

## 💰 Monetization

* Free plan with limited usage
* Paid plans unlock higher usage
* Webhook automatically updates:

  * User plan
  * Credits

---

## 🔒 Security & Controls

* CORS enabled for external widget usage
* Basic rate limiting implemented
* Planned:

  * Credit-based usage control
  * Abuse prevention

---

## 📦 Installation

```bash
git clone https://github.com/SahilGuptaa28/plugai.git
cd plugai
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file:

```env
MONGODB_URL=your_mongodb_url
NEXTAUTH_SECRET=your_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

COHERE_API_KEY=your_cohere_api_key

RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

---

## 📌 Future Improvements

* Credit-based billing system
* Advanced analytics dashboard
* Multi-language chatbot support
* Streaming responses
* Better rate limiting (Redis)

---

## 👨‍💻 Author

**Sahil Gupta**

---

## ⭐ If you like this project

Give it a star ⭐ on GitHub!
