# Self-Driving Car Simulation Without Libraries

![Demo](demo.png) <!-- Replace demo.png with your screenshot of the simulation -->

This is a **self-driving car simulation** implemented purely in **JavaScript**, HTML, and CSS — **no external libraries** are used. The project demonstrates AI-controlled cars navigating a road while avoiding obstacles and following lanes using simple neural networks.

---

## 🚗 Features

- AI-controlled cars using neural networks
- Sensor-based collision detection
- Multiple lanes and realistic road simulation
- Traffic (dummy cars) for AI cars to avoid
- Real-time visualization of the neural network
- Gradient and styling improvements for a better UI

---

## 🧩 Simulation Details

- **Cars:**
  - AI cars (blue) are controlled by neural networks.
  - Dummy cars (red) move along lanes as obstacles.
  - Each car has a sensor system to detect road borders and other cars.
- **Road:**
  - Divided into 3 lanes (default), with dashed lane markers.
  - Styled to resemble a real road with gradient effect.
- **Network Visualization:**
  - Displays neural network of the best car in real-time.
  - Gradient lines for a more appealing look.

---

## ⚙️ Tech Stack

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

---

## 📝 Project Structure

| File           | Description |
|----------------|-------------|
| `index.html`   | Main HTML structure with canvas elements and buttons. |
| `styles.css`   | CSS styling for canvases, buttons, and layout. |
| `main.js`      | Simulation setup, animation loop, and AI logic. |
| `car.js`       | Car class (AI & dummy), movement, and drawing. |
| `road.js`      | Road class and lane calculation. |
| `controls.js`  | Keyboard control and AI output mapping. |
| `sensor.js`    | Sensor system for cars to detect obstacles. |
| `network.js`   | Neural network logic and feed-forward calculations. |
| `visualizer.js`| Visualization of the neural network. |
| `utils.js`     | Utility functions like intersection detection and RGBA conversion. |

---

## 📂 Branches

### **main branch**
- Contains **stable version 1** of the simulation.
- Basic AI-controlled cars and traffic.
- Basic neural network visualization.

### **test branch**
- Contains **Version 2 improvements**:
  - Better road styling with gradients and lanes.
  - Improved network visualization styling.
  - Added multiple demo cars as obstacles.
  - Buttons for saving/discarding the best AI brain on the left side.
  - More appealing UI with shadows and rounded corners.

### **train branch**
- Reserved for experimentation and training:
  - You can test new AI algorithms here.
  - Does not affect the main or test branch unless merged.

---

## 🛠 How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/Samprit74/self-driven-car-simulation-without-library.git
Open index.html in a web browser (Chrome recommended).

Use the save 💾 and discard 🗑️ buttons to manage the best AI car brain.

Watch AI-controlled cars learn to navigate the road in real-time!

⚙️ Libraries

No external libraries are used.

Pure JavaScript, HTML, and CSS.

Neural networks and visualization are implemented manually in network.js and visualizer.js.

🌟 Future Improvements

Train AI with different neural network architectures.

Add more dynamic obstacles and road layouts.

Add stats dashboard for AI performance.
