import React, { useState, useEffect, useRef, createRef } from "react";
import { useLocation } from "react-router-dom";
import { fetchMusics, deleteMusic } from "../../api";
import MyBeats from "./MyBeats";
import BeatsCanvas from "./BeatsCanvas";
import BeatUpload from "./BeatUpload";
import Form from "../Form/Form";
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
  const [isLoading, setIsLoading] = useState(true);
  const musicRefs = useRef([]);
  const formRef = useRef(null);

  useEffect(() => {
    if (analyser) {
      analyser.fftSize = 4096; // Use a larger FFT size for smoother waves
      const bufferLength = analyser.fftSize;
      const dataArray = new Uint8Array(bufferLength);

      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext("2d");

      const draw = () => {
        if (!analyser) return;
        requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray);

        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

        canvasCtx.lineWidth = 2;
        const gradient = canvasCtx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, "rgba(255, 99, 132, 0.6)");
        gradient.addColorStop(0.5, "rgba(54, 162, 235, 0.6)");
        gradient.addColorStop(1, "rgba(75, 192, 192, 0.6)");
        canvasCtx.strokeStyle = gradient;

        canvasCtx.beginPath();
        const sliceWidth = (canvas.width * 1.0) / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0;
          const y = (v * canvas.height) / 1.75;

          if (i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width, canvas.height / 2);
        canvasCtx.stroke();
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
      setIsPlaying(false);
      setTimeout(() => setIsPlaying(true), 200);
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

    if (!isAdmin) {
      setTimeout(() => setShowForm(true), 5000);
    }
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
      setIsLoading(true);
      try {
        const { data } = await fetchMusics();
        setMusicData(data?.data);
        musicRefs.current = data.data.map(() => createRef());
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
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
        <MyBeats
          isLoading={isLoading}
          musicData={musicData}
          isAdmin={isAdmin}
          handleAudioPlay={handleAudioPlay}
          setIsPlaying={setIsPlaying}
          handleDelete={handleDelete}
          musicRefs={musicRefs}
        />
        <BeatsCanvas
          canvasRef={canvasRef}
          musicName={musicName}
          isPlaying={isPlaying}
        />
        {isAdmin && <BeatUpload />}
      </div>
      {showForm && <Form isAdmin={isAdmin} formRef={formRef} />}
      {isAdmin && <Form isAdmin={isAdmin} formRef={formRef} />}
    </>
  );
};

export default Beats;
