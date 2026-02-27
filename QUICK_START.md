# Quick Start Guide

## Project Setup Complete ✅

Your VeriSynth deepfake detection application is now fully integrated with the backend API!

## What's Been Done

### 1. **API Integration** ✅
- Created `lib/api.js` with API service layer
- Integrated health check endpoint
- Integrated video prediction endpoint
- Full error handling and response parsing

### 2. **Modular Components** ✅
Created separate component files for better code organization:
- `Components/LandingPage.js` - Hero section and feature highlights
- `Components/AuthPage.js` - Login/signup forms
- `Components/Dashboard.js` - Video upload interface
- `Components/ReadyPage.js` - Pre-analysis confirmation
- `Components/ResultPage.js` - Results display

### 3. **State Management** ✅
- Centralized state in `app/page.js`
- Real-time loading states
- Error handling and user feedback
- File management

### 4. **Environment Configuration** ✅
- Created `.env.local` for backend URL configuration
- Ready for different deployment environments

## Getting Started

### Step 1: Start Backend Server
Ensure your backend API is running:
```bash
# Your backend server should be running on:
# http://localhost:8000
# Or update NEXT_PUBLIC_API_URL in .env.local
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 4: Test the Application
1. Click "Get Started" on the landing page
2. Log in with credentials:
   - Email: `nmoger58`
   - Password: `Nagu@123`
3. Upload a video file
4. Click "Start Analysis"
5. Wait for results from your backend API

## API Response Handling

The application now properly handles both success and error responses from your backend:

### Success Response
```json
{
  "filename": "video.mp4",
  "prediction": {
    "label": "REAL",
    "raw_score": 0.06,
    "confidence": 0.94,
    "is_deepfake": false
  },
  "status": "success"
}
```

### Error Response
```json
{
  "error": "No faces detected in video",
  "filename": "video.mp4"
}
```

## File Structure Overview

```
Components/
├── LandingPage.js         # Landing page
├── AuthPage.js            # Authentication
├── Dashboard.js           # Main interface
├── ReadyPage.js           # Ready screen
└── ResultPage.js          # Results

lib/
└── api.js                 # API service

app/
├── page.js                # Main component + state
├── layout.js              # App layout
└── globals.css            # Global styles
```

## Key Features Implemented

✅ **Responsive Design** - Works on all screen sizes
✅ **Dark Theme** - Modern dark UI with accent colors
✅ **API Integration** - Full backend communication
✅ **Error Handling** - User-friendly error messages
✅ **Loading States** - Visual feedback during processing
✅ **Report Generation** - Download analysis results
✅ **Modular Code** - Easy to maintain and extend

## Customization

### Change Backend URL
Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=https://your-production-url.com
```

### Customize Colors
In `app/page.js`, modify the CSS variables:
```javascript
style={{
  '--primary': '#4CADE4',      // Main color
  '--success': '#12C99B',      // Success color
  '--danger': '#FF4C4C',       // Error color
  // ... other colors
}}
```

### Update Demo Credentials
In `Components/AuthPage.js`, update the login check:
```javascript
if (loginData.email === 'your-email' && loginData.password === 'your-password')
```

## Troubleshooting

### Backend Connection Error
**Problem**: "Analysis failed" error
**Solution**: 
- Check if backend server is running
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check browser console for detailed error

### Video Not Processing
**Problem**: "No faces detected" error
**Solution**:
- Backend cannot detect faces in the video
- Try with a video that has clear face visibility
- Check video format is supported

### Build Issues
**Problem**: TypeScript/compilation errors
**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules .next package-lock.json
npm install
npm run dev
```

## Next Steps

1. **Production Deployment**
   - Update `.env.local` with production backend URL
   - Configure appropriate CORS settings on backend
   - Set up proper authentication (replace demo credentials)

2. **Enhancements**
   - Add database for user history
   - Implement real user authentication
   - Add batch video processing
   - Create analytics dashboard

3. **Security**
   - Remove hardcoded credentials
   - Implement proper auth tokens
   - Add rate limiting
   - Enable HTTPS

## Support

For issues or questions:
1. Check the INTEGRATION_GUIDE.md for detailed documentation
2. Review API responses in browser DevTools Console
3. Ensure backend API is responding correctly

---

**Happy Testing!** 🚀
