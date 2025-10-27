# 🔐 Admin Authentication Setup Guide

Your admin panel now has **secure authentication** with multiple options! Here's how to set it up:

## 🚀 Quick Setup (5 minutes)

### 1. Set Your Password

Run this command to generate a secure password hash:

```bash
npm run generate-password-hash
```

Follow the prompts and copy the generated hash to your `.env.local` file.

### 2. Update Environment Variables

Create or update your `.env.local` file:

```bash
# Copy the example file
cp .env.local.example .env.local
```

Edit `.env.local` and add your configuration:

```env
# Your admin email
ADMIN_EMAIL=your-email@domain.com

# Generated password hash from step 1
ADMIN_PASSWORD_HASH=your-generated-hash-here

# Random secret key (generate a strong one!)
SESSION_SECRET=your-super-secret-key-here

# Your app URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Start Using Authentication

That's it! Now when you visit `/admin`, you'll be redirected to a secure login page.

---

## 🎯 Authentication Methods Available

### 1. **Passkey/WebAuthn** (Recommended)
- **Uses**: Face ID, Touch ID, Windows Hello, or security keys
- **Setup**: First time login, click "Register This Device"
- **Security**: Highest level - biometric/hardware-based

### 2. **Password Authentication**
- **Uses**: Traditional password login
- **Setup**: Set via environment variables
- **Security**: Good when using strong passwords

---

## 📱 How Passkeys Work

1. **First Visit**: Go to `/auth/login`
2. **Register Device**: Click "Register This Device" 
3. **Biometric Prompt**: Your device will ask for fingerprint/face/PIN
4. **Future Logins**: Just click "Sign in with Passkey"

### Supported Devices:
- ✅ **iPhone/iPad**: Face ID, Touch ID
- ✅ **Android**: Fingerprint, face unlock
- ✅ **MacBook**: Touch ID, secure enclave
- ✅ **Windows**: Windows Hello, PIN
- ✅ **Hardware Keys**: YubiKey, etc.

---

## 🔧 Development vs Production

### Development Mode
- Default password: `admin123` (if no hash set)
- Passkey data stored in localStorage
- Less strict security requirements

### Production Mode
- **Must** set `ADMIN_PASSWORD_HASH`
- Passkey data stored in Supabase
- Enforced HTTPS for security

---

## 🛡️ Security Features

- **Session Management**: 7-day secure sessions
- **CSRF Protection**: Built-in token validation
- **Middleware Protection**: All admin routes secured
- **No Password Storage**: Only hashed values
- **Biometric Authentication**: Device-level security

---

## 🔄 Managing Access

### Reset Password
```bash
npm run generate-password-hash
```
Update the hash in `.env.local`

### Reset Passkeys
- Development: Clear browser localStorage
- Production: Clear `admin_credentials` table in Supabase

### Add Logout
A logout button is already added to your admin panel header.

---

## 🚨 Security Best Practices

1. **Strong Password**: Use a unique, complex password
2. **Secure SECRET**: Use a random 32+ character session secret
3. **HTTPS Only**: Enable HTTPS in production
4. **Regular Updates**: Keep dependencies updated
5. **Monitor Access**: Check server logs regularly

---

## 🐛 Troubleshooting

### Passkey Not Working?
- Check if your device supports WebAuthn
- Ensure you're on HTTPS (production) or localhost (dev)
- Clear browser cache and try again

### Can't Login?
- Verify `.env.local` is configured correctly
- Check password hash was generated properly
- Try password auth as fallback

### Session Issues?
- Clear browser cookies
- Restart development server
- Check session secret is set

---

## 📞 Need Help?

The authentication system is designed to be simple yet secure. If you need to customize it further, all the code is in:

- `src/lib/auth/` - Core authentication logic
- `src/app/auth/login/` - Login page
- `src/app/api/auth/` - Authentication APIs
- `src/middleware.ts` - Route protection

---

**🎉 You're all set!** Your admin panel is now secured with modern authentication.