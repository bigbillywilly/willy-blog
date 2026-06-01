# Local Testing Guide

## Quick Setup

### Start Backend (Terminal 1)
```powershell
cd c:\Users\willy\projects\WillyChapmanNgo\life-blog\backend
mvn spring-boot:run
```
Runs on: `http://localhost:8081`

### Start Frontend (Terminal 2)
```powershell
cd c:\Users\willy\projects\WillyChapmanNgo\life-blog\frontend
npm run dev
```
Opens: `http://localhost:5173`

---

## How It Works

- **`.env.local`** → Local testing (auto-active with `npm run dev`)
  - API calls go to `http://localhost:8081`

- **`.env.production`** → Production (used in build)
  - API calls go to `https://willy-blog-production.up.railway.app`

- **Git**: `.env.local` is in `.gitignore` so it won't be committed

---

## Test Photo Upload

1. Start both services ☝️
2. Go to http://localhost:5173/admin
3. Enter password: `WillyLove123`
4. Select "Hikes" or "Friends & Family"
5. Upload a photo (under 5MB)
6. Click "Create Post"
7. Check `http://localhost:5173/hikes` or `/friends` to see it

---

## Troubleshooting

**Backend won't start?**
- Make sure Java 17+ is installed: `java -version`
- Check if port 8081 is free: `netstat -ano | findstr :8081`

**Frontend won't start?**
- Delete `node_modules` and `package-lock.json`, then `npm install`

**API calls failing?**
- Backend must be running first!
- Check browser console (F12) for errors
- Check backend console for SQL/database errors
