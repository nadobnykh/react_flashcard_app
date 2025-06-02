## Core Concepts

### Q: A syntax extension that allows you to write UI components using XML-like tags directly in JavaScript.
JSX

---

### Q: The building blocks of a React Native app, either functional (`function`) or class-based.
Components

---

### Q: Read-only inputs passed to components to customize their behavior.
Props

---

### Q: A component's internal data storage, managed via `useState` or class state, triggering re-renders when updated.
State

---

### Q: Functions like `useState`, `useEffect`, and `useRef` that allow functional components to use state and lifecycle features.
Hooks

---

### Q: A React Native abstraction for defining styles in a JavaScript object, similar to CSS.
StyleSheet

---

### Q: The primary layout system used to arrange views and components on the screen.
Flexbox

---

### Q: Managed using libraries like `React Navigation` for moving between screens and handling routes.
Navigation

---

### Q: Platform-specific modules (Java/Kotlin for Android, Swift/Obj-C for iOS) exposed to JavaScript for native capabilities.
Native Modules

---

## Core Components

### Q: A container that supports layout with Flexbox, styling, and touch handling. Similar to a `div`.
View

---

### Q: For displaying text content. Must be used to render any text.
Text

---

### Q: Displays images, supports both local and remote sources.
Image

---

### Q: Input field for user text entry.
TextInput

---

### Q: A generic scrollable container. Useful for views that may be longer than the screen.
ScrollView

---

### Q: Highly optimized component for rendering large lists with better performance than `ScrollView`.
FlatList

---

### Q: Like `FlatList`, but with support for sections and headers.
SectionList

---

### Q: A wrapper for making views respond to touches with visual feedback.
TouchableOpacity

---

### Q: A newer and more customizable component for handling touch interactions.
Pressable

---

### Q: A basic button component with a label and `onPress` handler.
Button

---

## Essential APIs & Utilities

### Q: React hook to add state to functional components.
useState

---

### Q: Runs side effects (e.g., data fetching, subscriptions).
useEffect

---

### Q: Holds mutable values without causing re-renders.
useRef

---

### Q: Lets you detect the platform (iOS, Android, Web) and run platform-specific logic.
Platform

---

### Q: Provides screen width/height; useful for responsive design.
Dimensions

---

### Q: For creating smooth, performant animations.
Animated

---

### Q: Registers the root component of the app.
AppRegistry

---

### Q: API to handle deep linking and opening external URLs.
Linking

---

### Q: Handles runtime permissions on Android devices.
PermissionsAndroid

---

## Navigation (via React Navigation)

### Q: Top-level container managing navigation state.
NavigationContainer

---

### Q: Creates a stack-based navigation flow.
createStackNavigator

---

### Q: Creates a bottom tab bar navigation.
createBottomTabNavigator

---

### Q: Hook to programmatically navigate between screens.
useNavigation

---

### Q: Hook to access route params and info.
useRoute

---

## Styling & Theming

### Q: Helps organize styles in a structured and performant way.
StyleSheet.create

---

### Q: Styles defined directly on a component as JavaScript objects.
inline styles

---

### Q: Achieved using `Dimensions`, `Flexbox`, or libraries like `react-native-responsive-dimensions`.
responsive design

---

### Q: Can be custom-built or integrated with libraries like `styled-components` or `react-native-paper`.
theming

---

## Platform-Specific Features

### Q: Returns `'ios'`, `'android'`, or `'web'`.
Platform.OS

---

### Q: Lets you specify platform-specific values or components.
Platform.select

---

### Q: Use custom native code for functionality not covered by JS APIs.
Native Modules

---

## Debugging & Testing

### Q: React Native’s packager that serves the app in development mode.
Metro Bundler

---

### Q: Used to inspect component hierarchy and props/state.
React DevTools

---

### Q: Debugging platform for React Native apps (especially on Android).
Flipper

---

### Q: Default testing framework for unit tests.
Jest

---

### Q: A utility for writing better tests for React Native components.
React Native Testing Library

---
