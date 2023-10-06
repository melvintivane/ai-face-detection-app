import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const NewPost = ({ image }) => {
  const { url, width, height } = image;
  const [isLoading, setIsLoading] = useState(false);
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
        <div class="left skeleton-km971twiw4p"></div>
      )}
      <div className="right">
        <h1>Share your post</h1>
        <input
          type="text"
          placeholder="What's on your mind?"
          className="rightInput"
        />
        <button className="rightButton">Send</button>
      </div>
    </div>
  );
};

export default NewPost;
