import React, { useState, useEffect, useRef, createRef } from "react";
import { useLocation } from "react-router-dom";
import { fetchMusics, deleteMusic } from "../../api";
import BeatUpload from "./BeatUpload";
import Form from "../Form/Form";
import { MdDelete } from "react-icons/md";
import disc_image from "../../assets/beats-section/record.png";
import disc_shade from "../../assets/beats-section/record-shade.png";
import tonearm from "../../assets/beats-section/player-key.png";
import "./beats.css";

const Beats = () => {
  const location = useLocation();
  const canvasRef = useRef(null);
  const [audioContext, setAudioContext] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [audioSrcs, setAudioSrcs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [musicName, setMusicName] = useState("");
  const [musicData, setMusicData] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const musicRefs = useRef([]);
  const formRef = useRef(null);

  useEffect(() => {
    if (analyser) {
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext("2d");

      const draw = () => {
        if (!analyser) return;
        requestAnimationFrame(draw);

        analyser.getByteFrequencyData(dataArray);

        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        canvasCtx.fillStyle = "rgba(0, 0, 0, 0.2)";
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i] / 2;

          canvasCtx.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
          canvasCtx.fillRect(
            x,
            canvas.height - barHeight / 2,
            barWidth,
            barHeight
          );

          x += barWidth + 1;
        }
      };

      draw();
    }
  }, [analyser]);

  const handleAudioPlay = async (index, music_name) => {
    let context = audioContext;
    if (!context) {
      context = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(context);
    }

    const newAudio = musicRefs.current[index].current;

    if (currentAudio && currentAudio !== newAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    if (audioSrcs[index]) {
      audioSrcs[index].disconnect();
    }

    const newAudioSrc =
      audioSrcs[index] || context.createMediaElementSource(newAudio);
    const newAnalyser = context.createAnalyser();
    newAudioSrc.connect(newAnalyser);
    newAnalyser.connect(context.destination);

    setAnalyser(newAnalyser);
    setAudioSrcs((prevAudioSrcs) => {
      const updatedAudioSrcs = [...prevAudioSrcs];
      updatedAudioSrcs[index] = newAudioSrc;
      return updatedAudioSrcs;
    });
    setCurrentAudio(newAudio);

    newAudio.play();
    setMusicName(music_name);
    setIsPlaying(true);

    setTimeout(() => setShowForm(true), 5000);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMusic(id);
      setMusicData((prevData) => prevData.filter((music) => music._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getMusicData = async () => {
      try {
        const { data } = await fetchMusics();
        setMusicData(data.data);
        musicRefs.current = data.data.map(() => createRef());
      } catch (error) {
        console.log(error);
      }
    };
    getMusicData();
  }, []);

  useEffect(() => {
    if (showForm) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showForm]);

  const searchParams = new URLSearchParams(location.search);
  const isAdmin =
    searchParams.get(process.env.REACT_APP_ADMIN_CHECK) === "true";

  return (
    <>
      <div className="beats-container">
        <div className="beats-header">
          What type of beat do you want to hear?
        </div>
        <div className="canvas-container">
          <canvas ref={canvasRef}></canvas>
          {musicName !== "" && <div className="music-name">{musicName}</div>}
        </div>
        <div className="beats-list">
          {musicData.map((music_beat, index) => (
            <div key={music_beat._id} className="beat-item">
              <div className="audio-container">
                <audio
                  ref={musicRefs.current[index]}
                  src={music_beat.musicFile}
                  controls
                  onPlay={() => handleAudioPlay(index, music_beat.musicName)}
                  onPause={() => setIsPlaying(false)}
                  controlsList="nodownload"
                />
                {isAdmin && (
                  <span
                    className="delete-button"
                    onClick={() => handleDelete(music_beat._id)}
                  >
                    <MdDelete />
                  </span>
                )}
              </div>
            </div>
          ))}
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
        {isAdmin && <BeatUpload />}
      </div>
      {showForm && <Form isAdmin={isAdmin} formRef={formRef} />}
    </>
  );
};

export default Beats;
