# 🍕 Mini Food Ordering App

A modern, feature-rich food ordering mobile app built with **React Native** and **Firebase**. It offers users a seamless experience for browsing menu items, managing a cart, and placing orders in real-time.

---

## 📱 Screenshots

Place the following screenshots in the `screenshots/` folder:

- `Image of app showing menu.jpg` – Menu browsing
- `Image of app showing menu (2).jpg` – Food item with add to cart
- `Checking out the cart and customizing the items quantity in the cart.jpg` – Cart view
- `After Checking out getting order summary.jpg` – Order confirmation
- `Pressing the order and getting order ID.jpg` – Loading state

---

## ✨ Features

### 🎨 UI/UX
- Responsive layout for mobile devices
- Gradient backgrounds and smooth animations
- Card-based food item views with images and pricing
- Empty state and loading indicators

### 🔥 Firebase Integration
- Firestore for real-time database
- Cloud storage for menu and orders
- Offline data support
- Scalable structure for future features

### 🛒 Core Features
- Menu browsing by category
- Cart with quantity control and real-time updates
- Order placement and confirmation
- State synced across screens

---

## 🛠️ Tech Stack

- **Frontend:** React Native + Expo
- **Backend:** Firebase Firestore
- **Navigation:** React Navigation v6
- **State Management:** React Context API + useReducer
- **Styling:** StyleSheet + Linear Gradients
- **Icons:** React Native Vector Icons

---

## 📋 Prerequisites

Ensure the following tools are installed:

- Node.js (v14+)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Firebase account
- Android/iOS emulator or device

---

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd FoodOrderingApp
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Firebase Configuration
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a project and enable Firestore
3. Replace `firebase.config.js` with your credentials:

```js
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-messaging-id",
  appId: "your-app-id",
};
```

### 4. Firestore Collections

#### `menuItems` collection:
```json
{
  "name": "Margherita Pizza",
  "description": "Fresh tomatoes, mozzarella, and basil",
  "price": 12.99,
  "imageUrl": "https://...",
  "category": "pizza",
  "available": true
}
```

---

## ▶️ Running the App

```bash
# Start Expo server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

---

## 📁 Project Structure

```
FoodOrderingApp/
├── src/
│   ├── components/        # UI components (FoodItem, CartItem, etc.)
│   ├── screens/           # App screens (Home, Cart, Order Summary)
│   ├── services/          # Firebase-related services
│   ├── context/           # Context API (CartContext)
│   └── utils/             # Helper functions
├── firebase.config.js     # Firebase credentials
├── App.js                 # Entry point
└── README.md
```

---

## 🔧 Firebase Rules

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /menuItems/{document} {
      allow read: if true;
    }
    match /orders/{document} {
      allow create, read: if true;
    }
  }
}
```

---

## 🎯 User Guide

- **Browse**: Scroll through available food items
- **Add to Cart**: Select item → Choose quantity → Add
- **Manage Cart**: Update or remove items
- **Place Order**: Enter delivery info and submit

---

## 🧪 Testing Checklist

- [ ] Menu items load correctly
- [ ] Items added to cart with selected quantity
- [ ] Cart updates live
- [ ] Orders placed and confirmed
- [ ] Loading and empty states display
- [ ] Handles network/offline issues
- [ ] Works on iOS and Android

---

## 🧪 Developer Notes

### Add Menu Items Programmatically
```js
const newItem = {
  name: "Veggie Wrap",
  description: "Healthy and fresh veggie wrap",
  price: 8.99,
  imageUrl: "https://...",
  category: "wrap",
  available: true
};
```

### Style Customization
```js
const theme = {
  primary: '#667eea',
  secondary: '#764ba2',
  font: 'Roboto',
};
```

---

## 🚀 Build & Deployment

### Build Commands
```bash
expo build:android
expo build:ios
expo build:web
```

### Deployment Guides
- [Android: Expo Play Store Guide](https://docs.expo.dev/distribution/play-store/)
- [iOS: Expo App Store Guide](https://docs.expo.dev/distribution/app-store/)

---

## 🔒 Security

- Follow Firebase security rules
- Validate user input
- Use environment variables for API keys
- Optionally add user authentication

---

## 🤝 Contributing

1. Fork this repo
2. Create a branch: `git checkout -b feature/feature-name`
3. Commit your changes
4. Open a Pull Request

> Follow best practices and test new features on both platforms.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👥 Authors

- **Anunay Minj** – [@Reaper095](https://github.com/Reaper095)

---

## 🙏 Acknowledgments

- [React Native](https://reactnative.dev/)
- [Firebase](https://firebase.google.com/)
- [Expo](https://docs.expo.dev/)
- [Unsplash](https://unsplash.com/) – for images

---

## 📞 Contact

- 📧 Email: anunayminj@gmail.com

---

**Made with ❤️ using React Native and Firebase**