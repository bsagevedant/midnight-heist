# Midnight Heist: The Jewel Thief

<img width="1582" alt="Screenshot 2025-03-18 at 10 22 44 PM" src="https://github.com/user-attachments/assets/ffa1acb4-b243-49eb-8841-2e049c58cf8e" />



## 📌 Overview

https://github.com/user-attachments/assets/0a40c6f7-4f01-4a67-b256-8f27b175870b

**Midnight Heist: The Jewel Thief** is an immersive stealth-action game where players assume the role of a master thief, infiltrating high-security locations to steal valuable jewels. The game features AI-powered security, dynamic environments, and realistic stealth mechanics to challenge the player's strategic thinking and precision.

## 🎮 Features
- **Stealth-Based Gameplay:** Avoid detection using shadows, disguises, and silent movement.
- **AI-Powered Guards:** Dynamic pathfinding and alert levels for a realistic challenge.
- **Multiple Levels & Heists:** Break into museums, banks, and private vaults, each with unique obstacles.
- **Advanced Physics & Animations:** Realistic movement, AI patrols, and environmental interactions.
- **Customizable Loadouts:** Choose gadgets and tools to enhance your stealth strategy.
- **Engaging Storyline:** Unravel a mystery behind the most valuable heist of the century.

## 🛠️ Tech Stack
- **Game Engine:** Unity (C#)
- **Rendering:** URP (Universal Render Pipeline)
- **AI & Pathfinding:** Unity NavMesh, Behavior Trees
- **Physics & Collision:** PhysX Engine
- **Networking (Multiplayer Mode - Optional):** Photon Unity Networking (PUN)
- **Audio & Visual Effects:** FMOD for sound, Shader Graph for visual effects
- **User Interface:** Unity UI Toolkit, TextMeshPro
- **Version Control:** Git & GitHub

## 🚀 Installation & Setup
### Prerequisites
- Unity **2022.x** or later
- Git installed
- Visual Studio (or any C# IDE)

### Clone the Repository
```bash
git clone https://github.com/yourusername/midnight-heist.git
cd midnight-heist
```

### Open in Unity
1. Launch Unity Hub.
2. Click **Open** and navigate to the project folder.
3. Select the project and wait for dependencies to resolve.

### Install Dependencies
Ensure you have the required Unity packages:
- **Cinemachine** for dynamic camera control
- **TextMeshPro** for advanced UI
- **NavMesh Components** for AI pathfinding

### Run the Game
Click **Play** in the Unity Editor to test the game.

## 📌 Game Controls
| Action         | Key (Default) |
|---------------|--------------|
| Move          | `W A S D`     |
| Crouch        | `Ctrl`        |
| Sprint        | `Shift`       |
| Interact      | `E`           |
| Use Gadget    | `Q`           |
| Pause Menu    | `Esc`         |

## 🛠️ Development Guide
### Folder Structure
```
Midnight-Heist/
│── Assets/
│   ├── Scripts/        # Game logic and AI
│   ├── Models/         # 3D assets and environments
│   ├── UI/             # UI elements and menus
│   ├── Sounds/         # Game audio assets
│   ├── Materials/      # Textures and shaders
│── ProjectSettings/    # Unity project settings
│── README.md           # Documentation
```

### AI Behavior
The guards in the game use **Finite State Machines (FSM)** for state transitions:
- **Patrolling:** Guards follow a predefined route.
- **Investigating:** If a suspicious sound/movement is detected, guards investigate.
- **Chasing:** If the player is spotted, guards enter pursuit mode.
- **Returning to Patrol:** If the player escapes, guards return to their route.

## 🛠️ Contribution Guide
### Fork & Clone
1. Fork the repo on GitHub.
2. Clone it using:
```bash
git clone https://github.com/yourusername/midnight-heist.git
```
3. Create a new branch for your feature:
```bash
git checkout -b feature-name
```

### Submitting Changes
1. Commit your changes:
```bash
git commit -m "Added new heist mission"
```
2. Push your changes:
```bash
git push origin feature-name
```
3. Open a **Pull Request** on GitHub.

## 🛠️ Troubleshooting
### Common Issues & Fixes
- **Game not loading in Unity:** Check if all assets and dependencies are properly imported.
- **AI Guards not patrolling:** Ensure NavMesh is baked correctly and AI has waypoints.
- **Performance Issues:** Lower graphics settings or optimize light baking.

## 📜 License
This project is licensed under the **MIT License**. Feel free to use and modify the game.

## 📩 Contact  
https://x.com/sagevedant

Happy Heisting! 🕵️‍♂️💎
