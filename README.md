# Business Automation Tool - Frontend

A modern **React + Tailwind CSS frontend** for a business automation tool designed to help business owners **reach out to customers automatically via SMS**. This interface allows users to manage customers, compose and schedule messages, and run campaigns efficiently.

---

## 🎯 Features

### Customer Management
- Add, edit, and track customer information
- View stats: total, active, inactive, recently added customers
- Manage customer lists easily with search and filters

![Customer Management Screenshot](./assets/customer-management.png)

### Messaging Automation
- Compose single or bulk messages
- AI-assisted message generation (e.g., ChatGPT API)
- Queue messages for later sending
- Track message status: PENDING, SENT, FAILED

![Message Automation Screenshot](./assets/message-automation.png)

### Campaign Management
- Schedule campaigns for specific dates and times
- Select templates and target customers
- Automatic sending for birthdays, new month greetings, promotions, and more
- View campaign history with status and sent time

![Campaign Management Screenshot](./assets/campaign-management.png)

### Dashboard & Stats
- Real-time stats on customers, campaigns, messages, and revenue
- Interactive charts for growth tracking
- Recent activity logs for transparency

![Dashboard Screenshot](./assets/dashboard.png)

### UI & Responsiveness
- Fully responsive, mobile-first design
- Modular components for easier maintenance and scalability
- Tailwind CSS for fast and consistent styling
- Recharts for visualizing stats

---

## 🚀 Demo
You can include a GIF to show the tool in action:

![App Demo](./assets/demo.gif)

---

## 🛠 Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Charts:** Recharts
- **Icons:** React Icons
- **Forms & Validation:** React Hook Form, Zod

---

## ⚡ Getting Started

### Prerequisites
- Node.js >= 18
- npm or yarn

### Installation
```bash
git clone https://github.com/yourusername/business-automation-frontend.git
cd business-automation-frontend
npm install
npm run dev
