// Base English translations for VeriSynth
// All other languages will be dynamically translated using Google Translate API
export const baseTranslations = {
  // Navigation & Common
  app_name: 'VeriSynth',
  tagline: 'Deepfake Detection Platform',
  get_started: 'Get Started',
  history: 'History',
  language: 'Language',
  login: 'Login',
  signup: 'Sign Up',
  logout: 'Logout',
  cancel: 'Cancel',
  back: 'Back',
  next: 'Next',
  submit: 'Submit',
  download: 'Download',
  download_report: 'Download Report',
  new_analysis: 'New Analysis',
  start_analyzing: 'Start Analyzing',
  start_analysis: 'Start Analysis',

  // Landing Page
  landing_title: 'Detect Deepfakes with',
  landing_title_highlight: 'AI Precision',
  landing_subtitle: 'Advanced deepfake detection platform powered by cutting-edge AI technology. Protect your content authenticity with 99.2% accuracy.',
  feature_detection_title: 'Advanced Detection',
  feature_detection_desc: 'State-of-the-art AI algorithms detect even the most sophisticated deepfakes',
  feature_accuracy_title: '99.2% Accuracy',
  feature_accuracy_desc: 'Industry-leading accuracy rates backed by continuous model training',
  feature_formats_title: 'Multiple Formats',
  feature_formats_desc: 'Support for MP4, AVI, MOV, WebM formats up to 500MB',
  stat_videos_analyzed: 'Videos Analyzed',
  stat_accuracy: 'Detection Accuracy',
  stat_analysis_time: 'Average Analysis Time',
  stat_availability: 'Platform Availability',

  // Auth Page
  welcome_back: 'Welcome Back',
  create_account: 'Create Account',
  email_address: 'Email Address',
  email_placeholder: 'you@example.com',
  password: 'Password',
  password_placeholder: '••••••••',
  confirm_password: 'Confirm Password',
  full_name: 'Full Name',
  full_name_placeholder: 'John Doe',
  remember_me: 'Remember me',
  forgot_password: 'Forgot password?',
  sign_in: 'Sign In',
  create_account_btn: 'Create Account',
  no_account: "Don't have an account?",
  have_account: 'Already have an account?',
  invalid_credentials: 'Invalid credentials. Use username: nmoger58, password: Nagu@123',
  passwords_mismatch: 'Passwords do not match!',
  account_created: 'Account created! Please login.',

  // Dashboard
  upload_video: 'Upload Video for Analysis',
  upload_subtitle: 'Upload a video file to detect potential deepfake manipulation',
  drop_video: 'Drop your video here, or click to browse',
  supported_formats: 'Supports: MP4, AVI, MOV, WebM (Max 500MB)',
  analysis_statistics: 'Analysis Statistics',
  videos_analyzed: 'Videos Analyzed',
  detection_accuracy: 'Detection Accuracy',
  recent_scans: 'Recent Scans',

  // Ready Page
  ready_to_analyze: 'Ready to Analyze',
  file_size: 'File Size',
  analyze: 'Analyze',

  // Analyzing Page
  analyzing_video: 'Analyzing Video...',
  please_wait: 'This may take a few moments',

  // Results Page
  analysis_complete: 'Analysis Complete',
  deepfake_detected: 'Deepfake Detected',
  authentic_video: 'Authentic Video',
  confidence: 'Confidence',
  key_indicators: 'Key Indicators',
  error_details: 'Error Details',
  status: 'Status',
  label: 'Label',
  raw_score: 'Raw Score',
  is_deepfake: 'Is Deepfake',
  yes: 'Yes',
  no: 'No',
  success: 'Success',

  // Detection Indicators (Real)
  indicator_natural_movements: 'Natural facial movements',
  indicator_consistent_lighting: 'Consistent lighting',
  indicator_no_artifacts: 'No frame artifacts',
  indicator_audio_sync: 'Audio-visual sync verified',

  // Detection Indicators (Deepfake)
  indicator_frame_inconsistencies: 'Detected frame inconsistencies',
  indicator_eye_movements: 'Unnatural eye movements',
  indicator_audio_mismatch: 'Audio mismatch detected',
  indicator_facial_manipulation: 'Facial manipulation markers',

  // Error Messages
  error_no_faces: 'No faces detected in video',
  error_analysis_failed: 'Analysis failed. Please try again.',
  error_backend_connection: 'Cannot connect to backend. Please ensure the server is running.',
  error_invalid_file: 'Invalid file selected. Please choose a video file.',
  error_upload_failed: 'Upload failed. Please try again.',
};

// Supported languages with metadata
export const supportedLanguages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },   // Kannada just below English

  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', flag: '🇮🇳' },
  { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'or', name: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'ur', name: 'اردو', flag: '🇮🇳' },

  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];


// Get translation by language and key
// For non-English languages, this will trigger dynamic translation
export const t = (language, key) => {
  // English is the base language
  if (language === 'en') {
    return baseTranslations[key] || key;
  }
  
  // Other languages will be handled by the dynamic translation service
  // This acts as a fallback to English
  return baseTranslations[key] || key;
};
