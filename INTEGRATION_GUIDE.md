# VeriSynth - Deepfake Detection Platform

## Architecture Overview

This is a modularized React/Next.js application that integrates with a backend deepfake detection API.

### Project Structure

```
react1/
├── app/
│   ├── page.js                 # Main app component with state management
│   ├── globals.css             # Global styles
│   └── layout.js               # Layout wrapper
├── Components/                 # Modular UI components
│   ├── LandingPage.js         # Landing page component
│   ├── AuthPage.js            # Authentication (login/signup)
│   ├── Dashboard.js           # Main dashboard with upload
│   ├── ReadyPage.js           # Pre-analysis confirmation
│   └── ResultPage.js          # Analysis results display
├── lib/
│   └── api.js                 # API service with backend integration
├── public/                    # Static assets
├── package.json
├── jsconfig.json
├── next.config.mjs
├── tailwind.config.js
├── postcss.config.mjs
└── .env.local                 # Environment variables
```

## Backend API Integration

### Endpoints Used

1. **Health Check**
   - `GET /health`
   - Returns: `{ status, device, model, num_frames, face_size }`

2. **Video Prediction**
   - `POST /predict_video`
   - Upload: `multipart/form-data` with video file
   - Returns on success:
     ```json
     {
       "filename": "video.mp4",
       "prediction": {
         "label": "REAL" | "DEEPFAKE",
         "raw_score": 0.0-1.0,
         "confidence": 0.0-1.0,
         "is_deepfake": true | false
       },
       "status": "success"
     }
     ```
   - Returns on error:
     ```json
     {
       "error": "No faces detected in video",
       "filename": "video.mp4"
     }
     ```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Backend URL
Edit `.env.local` and update the `NEXT_PUBLIC_API_URL`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Or for production:
```
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

### 3. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
npm run start
```

## Features

### 1. Landing Page
- Hero section with feature highlights
- Statistics display
- Call-to-action buttons

### 2. Authentication
- Login with hardcoded credentials (demo): `nmoger58` / `Nagu@123`
- Sign up form (demo purpose)
- Password visibility toggle

### 3. Dashboard
- Video upload area (drag & drop support)
- Analysis statistics
- Recent scans history

### 4. Analysis Flow
- File selection → Ready confirmation → API call → Results display
- Real-time loading states
- Error handling with user feedback

### 5. Results
- Deepfake/Authentic detection status
- Confidence percentage with progress bar
- Raw prediction score
- Download report as text file
- New analysis button

## Component API Props

### LandingPage
```jsx
<LandingPage onGetStarted={() => {}} />
```

### AuthPage
```jsx
<AuthPage 
  onLogin={() => {}} 
  onSignupSuccess={() => {}} 
/>
```

### Dashboard
```jsx
<Dashboard onFileSelect={(file) => {}} />
```

### ReadyPage
```jsx
<ReadyPage 
  file={File}
  onStartAnalysis={() => {}}
  onCancel={() => {}}
  isLoading={boolean}
/>
```

### ResultPage
```jsx
<ResultPage 
  file={File}
  analysisResult={object}
  onNewAnalysis={() => {}}
  onDownload={() => {}}
/>
```

## API Service (lib/api.js)

### Health Check
```javascript
const health = await apiService.checkHealth();
// Returns: { status, device, model, num_frames, face_size }
```

### Predict Video
```javascript
const result = await apiService.predictVideo(file);
// Returns: { status, filename, prediction } or { error, filename }
```

## Styling

- **Framework**: Tailwind CSS
- **Color Scheme**:
  - Primary: `#4CADE4` (Blue)
  - Primary Dark: `#063356` (Dark Blue)
  - Success: `#12C99B` (Green)
  - Danger: `#FF4C4C` (Red)
  - Warning: `#F4AA2A` (Yellow)
  - Neutral 600: `#303235` (Dark Gray)
  - Neutral 900: `#1A1D1F` (Very Dark)

## Error Handling

The application handles:
- Backend connection failures
- API errors with user-friendly messages
- File upload validation
- Analysis timeout handling
- Network errors

## Future Enhancements

- [ ] Database integration for user history
- [ ] Batch video processing
- [ ] Video preview before analysis
- [ ] Advanced analytics dashboard
- [ ] Real-time notification system
- [ ] User authentication with JWT
- [ ] Download detailed JSON reports
- [ ] Mobile app version

## Troubleshooting

### Backend Connection Issues
- Check if backend server is running at the configured URL
- Verify CORS settings on backend
- Check `.env.local` for correct `NEXT_PUBLIC_API_URL`

### Video Upload Problems
- Ensure video file size is under 500MB
- Check browser console for specific error messages
- Verify backend can process the video format

### State Management
All state is managed in `app/page.js`:
- `currentPage`: Current view state
- `uploadedFile`: Selected file object
- `isAnalyzing`: Loading state
- `analysisResult`: API response
- `error`: Error messages

## Security Notes

**Demo Credentials (Change in Production)**:
- Username: `nmoger58`
- Password: `Nagu@123`

Do not hardcode credentials in production. Implement proper authentication.
