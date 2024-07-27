import React from "react";
import { MdDelete } from "react-icons/md";

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
