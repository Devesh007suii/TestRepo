import React from "react";
import { MdDelete } from "react-icons/md";
import disc_image from "../../assets/beats-section/record.png";

const MyBeats = ({
  isLoading,
  musicData,
  isAdmin,
  handleAudioPlay,
  setIsPlaying,
  handleDelete,
  musicRefs,
}) => {
  return (
    <div style={{ position: "relative", margin: "35px 0px" }}>
      {isLoading ? (
        <div className="loadingCircle"></div>
      ) : (
        <div className="beats-list">
          {musicData.map((music_beat, index) => (
            <div key={music_beat._id} className="beat-item">
              <div className="audio-container">
                <div className="music-info">
                  <img
                    className="music-image"
                    src={music_beat.musicImg ? music_beat.musicImg : disc_image}
                    alt={music_beat.musicName}
                  />
                  <div className="music-details">
                    <h3 className="beat-name">{music_beat.musicName}</h3>
                  </div>
                </div>
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
      )}
    </div>
  );
};

export default MyBeats;
