import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import { addMusic } from "../../api";
import "./beats.css";

const BeatUpload = () => {
  const [musicData, setMusicData] = useState({
    musicName: "",
    musicFile: "",
    musicImg: "",
  });
  const [successfully, setSuccessfully] = useState(false);
  const [fileKey, setFileKey] = useState(Date.now());

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMusic(musicData);
      setSuccessfully(true);
      clear();
    } catch (error) {
      console.error("Error uploading music:", error);
    }
  };

  const clear = () => {
    setMusicData({
      musicName: "",
      musicFile: "",
      musicImg: "",
    });
    setFileKey(Date.now);
  };

  return (
    <div className="beat-upload">
      <h2>Upload Music</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Music Name: </label>
          <input
            type="text"
            value={musicData.musicName}
            onChange={(e) =>
              setMusicData({ ...musicData, musicName: e.target.value })
            }
          />
        </div>
        <div>
          <label>Music File: </label>
          <FileBase64
            key={fileKey}
            multiple={false}
            onDone={(file) =>
              setMusicData({ ...musicData, musicFile: file.base64 })
            }
            accept="audio/*"
          />
        </div>
        <div>
          <label>Image File: </label>
          <FileBase64
            key={fileKey}
            multiple={false}
            onDone={(file) =>
              setMusicData({ ...musicData, musicImg: file.base64 })
            }
          />
        </div>
        {successfully && (
          <div className="success-message">Data Uploaded Successfully!!</div>
        )}
        <button type="submit">Upload</button>
        <button type="button" onClick={clear}>
          Clear
        </button>
      </form>
    </div>
  );
};

export default BeatUpload;
