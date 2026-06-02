# 👋 Hand Gesture Recognition

A real-time browser-based hand gesture recognition application built with **Vanilla JavaScript** and **ml5.js Handpose**. The application uses your webcam to detect hand landmarks, visualize them on a canvas, classify gesture states (Open, Closed, and Finger Count), and provide live voice feedback using the Web Speech API.

---

## ✨ Features

* 🎥 Real-time hand tracking using your webcam
* ✋ Hand landmark and skeleton visualization on an HTML5 canvas
* 🤖 Gesture state detection:

  * `Closed`
  * `Open`
  * `N Fingers`
* 🔊 Voice feedback with the Web Speech API
* ⚡ Lightweight setup with no build tools required
* 🌐 Runs entirely in the browser

---

## 🛠 Tech Stack

### Frontend

* JavaScript (ES6+)
* HTML5 Canvas
* Tailwind CSS (CDN)

### Machine Learning

* ml5.js (`handpose` model)

### Browser APIs

* `navigator.mediaDevices.getUserMedia`
* `window.speechSynthesis`

---

## 📁 Project Structure

```text
Hand-Gesture-Recognition/
├── index.html   # UI layout and CDN imports
└── index.js     # Camera setup, model inference, drawing logic,
                 # gesture detection, and speech feedback
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/johnaljennegalos/Hand-Gesture-Recognition.git
cd Hand-Gesture-Recognition
```

### 2. Run a Local Server

Camera access works best when served locally.

Using Python:

```bash
python -m http.server 5500
```

Open your browser and navigate to:

```text
http://localhost:5500
```

### 3. Allow Camera Access

When prompted by your browser, grant webcam permission to start hand gesture detection.

---

## 🧠 How It Works

### 1. Camera Initialization

The webcam stream is accessed through:

```javascript
navigator.mediaDevices.getUserMedia()
```

### 2. Hand Detection

The ml5.js Handpose model loads and continuously processes video frames.

### 3. Landmark Tracking

For every detected hand:

* 21 hand landmarks are extracted
* Keypoints are drawn on the canvas
* Finger connections (skeleton) are rendered

### 4. Gesture Recognition

Finger positions are analyzed to determine whether the hand is:

* Open
* Closed
* Showing a specific number of fingers

### 5. UI Feedback

The application updates:

* Gesture labels
* Status colors
* Detection information

### 6. Speech Feedback

Gesture changes are announced using:

```javascript
window.speechSynthesis
```

---

## 📌 Notes & Limitations

* Best results are achieved in good lighting conditions.
* Plain backgrounds improve detection accuracy.
* Gesture thresholds are heuristic-based and may require tuning for different users or camera setups.
* Browser support is best on modern Chromium-based browsers such as:

  * Google Chrome
  * Microsoft Edge
  * Brave
  * Opera

---

## 🗺 Roadmap

* [ ] Add confidence score display
* [ ] Improve gesture smoothing and debounce logic
* [ ] Add mobile-responsive UI enhancements
* [ ] Add adjustable gesture detection thresholds
* [ ] Support custom gesture training
* [ ] Add multi-hand detection support

---

## 🤝 Contributing

Contributions are welcome!

If you'd like to improve the project:

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/my-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature/my-feature
```

5. Open a Pull Request

Feel free to open issues for bug reports, feature requests, or suggestions.

---

## 📄 License

This project is licensed under the MIT License.

You are free to use, modify, and distribute this project under the terms of the license.

---

## 👨‍💻 Author

**John Aljenne Galos**

If you found this project useful, consider giving it a ⭐ on GitHub.
