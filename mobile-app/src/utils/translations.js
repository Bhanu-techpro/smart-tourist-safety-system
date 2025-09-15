import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      login: "Login",
      email: "Email",
      password: "Password",
      loginFailed: "Login failed. Please check your credentials.",
      liveLocation: "Your Live Location",
      emergencyTitle: "Emergency Assistance",
      emergencySubtitle:
        "Press and hold the button below for 3 seconds if you are in danger.",
      panic: "PANIC",
      sending: "SENDING...",
      confirmPanicTitle: "Confirm Panic Alert",
      confirmPanicMessage:
        "Are you sure you want to send a panic alert? This should only be used in a real emergency.",
      cancel: "Cancel",
      confirm: "Confirm",
      alertSentTitle: "Alert Sent",
      alertSentMessage:
        "Your emergency alert has been sent to the monitoring center.",
      error: "Error",
      alertFailedMessage:
        "Failed to send alert. Please try again or contact support.",
      locationError:
        "Could not get your location. Please ensure location services are enabled.",
      profile: "Profile",
      name: "Name",
      nationality: "Nationality",
      loading: "Loading...",
      logout: "Logout",
      changeLanguage: "Change to Hindi",
    },
  },
  hi: {
    translation: {
      welcome: "स्वागत है",
      login: "लॉग इन करें",
      email: "ईमेल",
      password: "पासवर्ड",
      loginFailed: "लॉगिन विफल। कृपया अपनी जानकारी जांचें।",
      liveLocation: "आपकी लाइव लोकेशन",
      emergencyTitle: "आपातकालीन सहायता",
      emergencySubtitle:
        "यदि आप खतरे में हैं तो नीचे दिए गए बटन को 3 सेकंड के लिए दबाकर रखें।",
      panic: "घबराहट",
      sending: "भेज रहा है...",
      confirmPanicTitle: "पैनिक अलर्ट की पुष्टि करें",
      confirmPanicMessage:
        "क्या आप वाकई पैनिक अलर्ट भेजना चाहते हैं? इसका उपयोग केवल वास्तविक आपातकाल में ही किया जाना चाहिए।",
      cancel: "रद्द करें",
      confirm: "पुष्टि करें",
      alertSentTitle: "अलर्ट भेजा गया",
      alertSentMessage:
        "आपका आपातकालीन अलर्ट निगरानी केंद्र को भेज दिया गया है।",
      error: "त्रुटि",
      alertFailedMessage:
        "अलर्ट भेजने में विफल। कृपया पुनः प्रयास करें या सहायता से संपर्क करें।",
      locationError:
        "आपका स्थान प्राप्त नहीं हो सका। कृपया सुनिश्चित करें कि स्थान सेवाएं सक्षम हैं।",
      profile: "प्रोफ़ाइल",
      name: "नाम",
      nationality: "राष्ट्रीयता",
      loading: "लोड हो रहा है...",
      logout: "लॉग आउट",
      changeLanguage: "अंग्रेजी में बदलें",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
