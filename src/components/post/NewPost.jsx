import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const NewPost = ({ image }) => {
  const { url, width, height } = image;
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const imgRef = useRef();
  const canvasRef = useRef();

  const handleImage = async () => {
    const detections = await faceapi
      .detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks() // Detecta pontos de referência faciais.
      .withFaceExpressions(); // Detecta expressões faciais.

    // Cria um canvas a partir da imagem usando a biblioteca faceapi.
    canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imgRef.current);
    // Define as dimensões do canvas para corresponder às dimensões da imagem.
    faceapi.matchDimensions(canvasRef.current, {
      width,
      height,
    });
    setCount(detections.length);
    // Redimensiona os resultados da detecção para coincidir com as dimensões da imagem.
    const resized = faceapi.resizeResults(detections, {
      width,
      height,
    });
    // Desenha as detecções, expressões e pontos de referência faciais no canvas
    faceapi.draw.drawDetections(canvasRef.current, resized);
    faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
    faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
  };

  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ])
      .then(handleImage)
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    imgRef.current && loadModels();

    setTimeout(() => {
      setIsLoading(true);
    }, 1000);
  }, [isLoading]);

  const handleClick = (e) => {
    e.preventDefault();

    const inputElement = document.querySelector(".rightInput");
    const inputValue = inputElement.value.trim();

    if (inputValue) {
      window.alert("Feedback Sent!!");
      window.location.reload();
    } else {
      alert("Please enter feedback before submitting.");
    }
  };

  return (
    <div className="wrapper">
      {isLoading ? (
        <div className="left">
          <img
            className="img"
            src={url}
            ref={imgRef}
            crossOrigin="anonymous"
            alt=""
          />
          <canvas ref={canvasRef} className="canva" />
        </div>
      ) : (
        <div className="left skeleton-km971twiw4p"></div>
      )}
      <div className="right">
        {count == 0 ? (
          <h1>Scanning...</h1>
        ) : (
          <h1>
            {count} {count > 1 ? "Faces" : "Face"} <br/>Detected!
          </h1>
        )}
        <input
          type="text"
          placeholder="Have any feeback?"
          className="rightInput"
        />
        <button type="submit" onClick={handleClick} className="button">
          Tell us
        </button>
      </div>
    </div>
  );
};

export default NewPost;
