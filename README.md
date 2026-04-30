<div align="center">

<img src="/public/icon.svg" alt="PlugAI Logo" width="80" height="80" />

# 🚀 PlugAI – AI Chatbot SaaS Platform

PlugAI is a full-stack SaaS platform that enables businesses to create and deploy custom AI-powered customer support chatbots with ease.
Users can train chatbots using their own business knowledge and embed them on any website using a simple JavaScript widget.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-plugai.com-blue?style=for-the-badge&logo=vercel)](https://plugai.com)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?style=for-the-badge&logo=mongodb)](https://mongodb.com)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

</div>

---

## 📖 Overview

**PlugAI** is a multi-tenant SaaS platform that lets businesses create and deploy AI-powered customer support chatbots — without writing a single line of code.

Users sign up, create a bot, train it with their business knowledge, and embed it on any website using one script tag. The AI responds to customer queries 24/7, based strictly on the provided knowledge base.

---

## ✨ Features

- 🤖 **AI-Powered Responses** — Powered by Cohere's `command-a-03-2025` model
- 🧠 **Custom Knowledge Base** — Train your bot with your own FAQs, pricing, policies
- 🔌 **One-Line Embed** — Drop a single `<script>` tag on any website
- 🎨 **Fully Customizable** — Bot name, branding, support email
- 💬 **Smart Fallback** — Routes unanswerable queries to support email
- 💰 **Subscription Plans** — Free, Pro, and Business tiers via Razorpay
- 🔒 **Secure & Private** — No hallucination, no data leakage
- 📱 **Mobile Responsive** — Draggable floating widget on all screen sizes
- 🔐 **Auth** — Google OAuth + Credentials via NextAuth

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Database | MongoDB + Mongoose |
| Auth | NextAuth.js (Google + Credentials) |
| AI | Cohere API (`command-a-03-2025`) |
| Payments | Razorpay |
| Deployment | Vercel |
| Styling | Tailwind CSS |

---


## ⚙️ API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/chat` | POST | Handles chatbot AI responses |
| `/api/bots` | GET / POST | List / create bots |
| `/api/bots/[botId]` | PUT / DELETE | Update or delete a bot |
| `/api/create-order` | POST | Creates Razorpay payment order |
| `/api/razorpay/webhook` | POST | Updates user plan after payment |
| `/api/user/me` | GET | Returns current user + plan info |

---

## 💰 Pricing Plans

| Feature | Free | Pro | Business |
|---------|------|-----|----------|
| Chatbots | 1 | 5 | Unlimited |
| Messages/month | 100 | 5,000 | Unlimited |
| Custom branding | ❌ | ✅ | ✅ |
| Analytics | ❌ | ✅ | ✅ |
| Priority support | ❌ | ❌ | ✅ |
| Price | ₹0 | ₹999/mo | ₹2,999/mo |

---

## 🤖 AI System

PlugAI uses **Cohere API** with a carefully engineered prompt system:

- **Model:** `command-a-03-2025`
- **No hallucination** — bot only answers from the knowledge base
- **Smart fallback** — unknown queries are redirected to support email
- **Token optimization** — knowledge is trimmed to reduce API costs
- **Markdown rendering** — responses are formatted and rendered as HTML in the widget

---

## 🔌 Embedding a Bot

After creating a bot and adding knowledge, users get an embed script:

```html
<script
  src="https://plugai.com/chatbot.js"
  data-bot-id="YOUR_BOT_ID"
  data-bot-name="Support"
  data-bot-logo="https://yourdomain.com/logo.svg"
></script>
```

Paste this before the closing `</body>` tag — that's it. The floating chat widget appears on your website instantly.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database (Atlas recommended)
- Cohere API key
- Razorpay account
- Google OAuth credentials

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/plugai.git
cd plugai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Auth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# AI
COHERE_API_KEY=your_cohere_api_key

# Payments
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Security

- CORS configured for widget cross-origin requests
- Basic rate limiting on `/api/chat`
- Webhook signature verification for Razorpay
- Knowledge base trimming to prevent prompt injection
- Plan-based access control on bot creation

---

## 🗺️ Roadmap

- [ ] Per-message credit deduction system
- [ ] Advanced analytics dashboard
- [ ] File upload for knowledge base (PDF, DOCX)
- [ ] Multi-language support
- [ ] Conversation history & export
- [ ] White-label option for agencies
- [ ] Abuse prevention & spam detection
- [ ] Team collaboration support

---

## 👨‍💻 Built By

<div align="center">

**Sahil Gupta**

*Founder & Developer — Building simple and powerful AI tools for real-world use cases.*

[![Email](https://img.shields.io/badge/Email-sahilgupta@gmail.com-blue?style=flat-square&logo=gmail)](mailto:sahilgupta@gmail.com)

</div>

---

## 📄 License

This project is proprietary and not open source.
All rights reserved © 2026 PlugAI.

---

<div align="center">

**PlugAI** — AI chatbot for your website 🚀

[plugai.com](https://plugai.com) · [Docs](https://plugai.com/dashboard/docs) · [Pricing](https://plugai.com/dashboard/pricing)

</div>
