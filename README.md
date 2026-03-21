# 🎯 Digital Heroes

A full-stack web application where users can subscribe, contribute to charities, and participate in monthly prize draws.

---

## 🚀 Features

- 🔐 Authentication using Clerk  
- 💳 Subscription system (Stripe)  
- 🎁 Monthly lucky draw system  
- ❤️ Charity contribution selection  
- 🏆 Winner management (Admin)  
- 📊 Admin dashboard  

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), Tailwind CSS, shadcn/ui  
- **Backend:** Next.js API Routes  
- **Database:** PostgreSQL (Prisma ORM)  
- **Auth:** Clerk  
- **Payments:** Stripe  

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/lazytech614/Digital-Heroes.git
cd digital-heroes
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup environment variables

Create a `.env` file in the root directory and add:

```env
# Base url of the app
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Database
DATABASE_URL=
DIRECT_URL=

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Admin
NEXT_PUBLIC_ADMIN_EMAIL=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

```

---

### 4. Setup database

```bash
npx prisma generate
npx prisma migrate dev
```

---

### 5. Run the development server

```bash
npm run dev
```

---

## 🌐 Deployment (Vercel)

1. Push your code to GitHub  
2. Import project into Vercel  
3. Add all environment variables in Vercel dashboard  
4. Deploy 🚀  

---

## 🔐 Admin Access

Admin is determined by email:

```env
NEXT_PUBLIC_ADMIN_EMAIL=your-email@example.com
```

---

## ⚠️ Important Notes

- Always run `prisma generate` before build  
- Ensure environment variables are correctly set in production  
- Use `export const dynamic = "force-dynamic"` for admin pages  

---

## 🤝 Contributing

Pull requests are welcome! Feel free to open issues or suggest improvements.

---

## 💡 Author

Built with ❤️ by Rupanjan