## ⚙️ General CLI

### What command shows the current Capacitor CLI version or help?

```bash
npx cap --version
npx cap --help
```

---

## 📁 Project Initialization

### How do you initialize a new Capacitor project?

```bash
npx cap init [appName] [appId]
```

---

### How do you create a new standalone Capacitor project with a plugin template?

```bash
npm init @capacitor/plugin@latest
```

---

## 📦 Add Platforms

### How do you add the iOS platform to a Capacitor project?

```bash
npx cap add ios
```

---

### How do you add the Android platform to a Capacitor project?

```bash
npx cap add android
```

---

## 🔄 Sync & Updates

### How do you sync the web assets and plugins to native platforms?

```bash
npx cap sync
```

---

### How do you only copy web assets to native platforms?

```bash
npx cap copy
```

---

### How do you only update native platform code and plugins?

```bash
npx cap update
```

---

## 🛠️ Building, Running, Opening

### How do you build a native app for a specific platform?

```bash
npx cap build [platform]
```

---

### How do you run the app on a simulator or connected device?

```bash
npx cap run [platform]
```

---

### How do you open the native project in the corresponding IDE?

```bash
npx cap open [platform]
```

---

## 🔍 Development Tools

### How do you serve the web app during development?

```bash
npx cap serve
```

---

### How do you check the health and version consistency of your Capacitor setup?

```bash
npx cap doctor
```

---

## 🔌 Plugin Development

### How do you list all installed plugins for a platform?

```bash
npx cap ls [platform]
```

---

### How do you migrate a Capacitor project to a newer major version?

```bash
npx cap migrate
```

---
