import React from "react";
import disc_image from "../../assets/beats-section/record.png";
import disc_shade from "../../assets/beats-section/record-shade.png";
import tonearm from "../../assets/beats-section/player-key.png";

const BeatsCanvas = ({ canvasRef, musicName, isPlaying }) => {
  return (
    <div className="canvas-record-player-container">
      <div className="canvas-container">
        <canvas ref={canvasRef}></canvas>
        {musicName !== "" && <div className="music-name">{musicName}</div>}
      </div>
      <div className="record-player">
        <div className={`player-main ${isPlaying ? "active" : ""}`}>
          <img src={disc_image} alt="disc_image" />
        </div>
        <div className="player-main-shade">
          <img src={disc_shade} alt="disc_shade" />
        </div>
        <div className={`tonearm ${isPlaying ? "active" : ""}`}>
          <img src={tonearm} alt="tonearm" />
        </div>
      </div>
    </div>
  );
};

export default BeatsCanvas;
