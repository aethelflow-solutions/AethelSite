# Aethel Flow Website

🌐 **Live Site:** https://www.aethelflow.com/

Welcome to the Aethel Flow website project — the official frontend repository for the AI & Automation Solutions landing page for Aethel Flow.

---

## 📦 Table of Contents

- [About](#about)
- [Demo](#demo)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🧠 About

Aethel Flow is a modern informational site showcasing AI and automation services, mission, and offerings of Aethel Flow Solutions Pvt. Ltd.

---

## 🎥 Demo

You can see the website live at: https://www.aethelflow.com

---


## 🚀 Getting Started

### 📌 Prerequisites

Make sure you have the following installed:

- Git
- Node.js (if using a Node framework)
- Package manager (npm / yarn / pnpm)

---

### 🪝 Clone the Repository

```bash
git clone https://gitlab.com/aethelflowsolutions/aethelsitev1/aethelSite.git
```

## 🔐 Environment Variables

This project uses environment variables to configure EmailJS integration and public contact details.

Create a `.env.production` (or `.env`) file in the root of the project and add the following:

```env
# ===============================
# EmailJS Configuration
# ===============================
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_THANKYOU_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_REPLY_TO_EMAIL=

# ===============================
# WhatsApp and Contact Info
# ===============================
NEXT_PUBLIC_CONTACT_PHONE=917416656592
NEXT_PUBLIC_WHATSAPP_NUMBER=917416656592
NEXT_PUBLIC_CONTACT_EMAIL=contact@aethelflow.com
```