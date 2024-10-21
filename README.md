**Patient-Doctor Flutter App**
A mobile application built using Flutter, with Firebase Authentication for user management, providing an easy platform for users to manage health appointments.

Login and Sign-up using email and password.
Social login via Google and Facebook.
Logout functionality and session management using flutter_secure_storage.
Dashboard:

Displays a welcome message and allows users to log in or log out.
Simple and responsive UI with reusable components.
project_root/
│
├── lib/
│   ├── Providers/ 
│   │   └── SignIn_provider.dart        # ViewModel logic for authentication
│   ├── Screens/
│   │   ├── Dashboard.dart              # Dashboard screen
│   │   ├── Signin_screen.dart          # Login screen
│   │   └── Signup_screen.dart          # Sign-up screen
│   └── main.dart                       # Main entry point
├── assets/
│   └── images/                         # App images (logos, etc.)
├── pubspec.yaml                        # Dependencies and configurations
└── README.md                           # Documentation

Installation and Setup
Prerequisites
Flutter SDK installed. (Install Flutter)
Firebase Project Setup (Firebase Console)
Enable Email/Password Authentication.
Set up Google and Facebook Login providers.
Android Studio or VSCode (with Flutter/Dart plugins).
1. Clone the repository
git clone https://github.com/KavindaBGK/task_app
cd project_root
2. Install dependencies
flutter pub get
3.Run the App
flutter run

---------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Patient-Doctor React App**
This web application provides a complete authentication system using React with Firebase Authentication and social login options via Google OAuth and Facebook Login. 
Users can sign in, sign up, and manage sessions, with a backend connection for further authentication logic.

How to Run the App
IMPORTANT: Need to run http://localhost:3000/
Prerequisites
Node.js and npm installed.
Firebase account with Authentication configured.
Google and Facebook OAuth credentials set up.
1.Clone the Repository:
git clone https://github.com/KavindaBGK/task_app
cd project_root
2.Install Dependencies:
npm install
3.Run the App
npm start

Dependencies
React Router DOM: For navigation between pages.
Firebase Authentication: Manages user authentication.
Axios: Handles API communication.
Google OAuth and Facebook Login: Enables social login.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Express + Firebase Authentication Server**

This project is a Node.js Express server that manages user authentication using Google, Facebook, and custom email/password sign-ups, 
leveraging Firebase Authentication.It also includes session management with express-session to maintain user state.
IMPORTANT: Need to run http://localhost:3000/

Project Structure
project_root/
│
├── database.json                # Firebase service account credentials
├── server.js                    # Main server logic (entry point)
├── package.json                 # Dependencies and scripts
└── README.md                    # Documentation

Features
User Authentication:
Google login with Firebase Authentication.
Facebook login with Firebase Authentication.
Email and password registration.
Session Management:

Uses express-session to store session data.
Session-based login and logout handling.
API Endpoints:

/signup: Registers users using email and password.
/signin: Verifies Firebase token and starts a session.
/auth/google: Handles Google login.
/auth/facebook: Handles Facebook login.
/session-check: Checks if a user is logged in.
/logout: Destroys the session and logs out the user.
Security:

Passwords managed through Firebase (automatically hashed).
CORS configured to allow frontend communication.

Installation and Setup
1.Clone the repository:
git clone https://github.com/KavindaBGK/task_app
cd <repository_name>
2.stall dependencies:
npm install

Dependencies
express: Web framework for Node.js
firebase-admin: Firebase Admin SDK for authentication
express-session: Session middleware
cors: Cross-origin resource sharing
bcrypt: Password hashing utility



















