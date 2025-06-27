# 💸 Expense Tracker App

This is a **full-stack Expense Tracker** application built with:

✨ **React** (frontend)  
⚡ **FastAPI** (backend API)  
🍃 **MongoDB** (database)

It allows users to:

✅ Register and log in securely  
✅ Track their **current balance**, **total income**, **total expenses**, and **last month’s spending**  
✅ Add new income or expense transactions  
✅ View all transactions with **search, category filters, and date filters**  
✅ Visualize financial health in the **Analytics Dashboard**, including:  
📈 Income vs Expenses chart (last 6 months)  
🥧 Pie chart of expenses by category  

This app is designed to help **people of all ages—especially youngsters—easily track their money and spending habits** in a clear, intuitive way. 🧠💰

---

## ✨ Features

🔐 **User Authentication**
- 🔑 Sign up and log in
- 🛡️ Secure JWT-based sessions
- 🧭 Auto-redirect to dashboard after login

📊 **Dashboard**
- Overview of your finances:
  - 💰 **Current Balance**
  - 🟢 **Total Income**
  - 🔴 **Total Expenses**
  - 📆 **Net Last Month**

💵 **Transactions**
- ➕ Add income or expense transactions
- 📝 View transactions with:
  - 🔍 **Search bar**
  - 🗂️ **Category filter** (Food, Rent, Salary, etc.)
  - 📅 **Date filter**
  - ✏️ **Edit** and 🗑️ **Delete**

📈 **Analytics**
- 📊 **Income vs Expenses chart** (last 6 months)
- 🥧 **Pie chart of expenses by category**

⏳ **Session Management**
- ⌛ JWT tokens expire after 1 hour
- 🚪 Automatic logout on expiry

🌐 **Deployment**
- Frontend hosted on **Vercel**
- Backend API hosted on **Render (free tier)**
  - ⚠️ The backend may sleep after ~15 minutes of inactivity.
  - If you see errors, **open the backend URL once to wake it up**, wait ~30 seconds, and refresh the frontend.

---

## 🔗 Live Links

- 🌐 **Frontend Live Demo:**  
  [Expense Tracker Frontend](https://expense-tracker-indol-theta-22.vercel.app)

- ⚡ **Backend API:**  
  [Expense Tracker API](https://expensetracker-q5np.onrender.com)

- 🧪 **API Docs (Swagger UI):**  
  [Swagger UI](https://expensetracker-q5np.onrender.com/docs)


> 💡 **Tip:** Always wake up the backend by visiting the API link or Swagger UI before using the app if it’s been idle.
