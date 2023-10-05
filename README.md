# React Social Media Post Application

This documentation provides an overview of a simple React-based social media post creation application. The application allows users to select an image, perform facial recognition on it using the face-api.js library, and share posts.

## Table of Contents
- [App.js](#appjs)
- [NewPost.js](#newpostjs)
- [Usage](#usage)

---

## App.js

`App.js` serves as the main entry point for the application. It is responsible for managing the state of image selection and rendering the navigation bar and the post creation form.

### State Management

- `file`: Represents the selected image file.
- `image`: Stores information about the selected image once it's loaded, including URL, width, and height.

### useEffect

A `useEffect` hook is used to perform the following tasks:

1. Load and process the selected image when the `file` state changes.
2. Set the `image` state with the image URL, width, and height.

### Components

- `Navbar`: Renders the application's navigation bar.
- `NewPost`: Conditionally renders the post creation form or the facial recognition component based on whether an image is selected.

## NewPost.js

`NewPost.js` is a component responsible for displaying the selected image and running facial recognition on it using the face-api.js library.

### Props

- `image`: Receives information about the selected image, including its URL, width, and height.

### useRef

- `imgRef`: A `useRef` hook used to reference the image element.
- `canvasRef`: A `useRef` hook used to reference the canvas element for drawing facial recognition results.

### handleImage Function

The `handleImage` function is responsible for performing facial recognition on the selected image using the face-api.js library. It detects faces, facial landmarks, and expressions and then draws them on the canvas.

### useEffect

Inside the `useEffect` hook:

1. The necessary face-api.js models are loaded asynchronously from the "/models" directory.
2. Once the models are loaded and the `imgRef` is available, the `handleImage` function is called to perform facial recognition.

### Rendering

The component renders a container with two sections:

1. Left Section:
   - Displays the selected image.
   - Includes a canvas where facial recognition results are drawn.

2. Right Section:
   - Provides an input field for creating posts.
   - Includes a button for sharing posts.

## Usage

1. Clone this repository to your local machine.

2. Ensure you have Node.js and npm installed.

3. Navigate to the project directory and run the following commands to install dependencies and start the development server:

   ```sh
   npm install
   npm start

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh