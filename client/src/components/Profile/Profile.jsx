import React from "react";
import user_image from "../../assets/devesh_sharma.jpeg";
import user_video from "../../assets/video_bg.mp4";
import { FaInstagram, FaYoutube, FaEnvelope } from "react-icons/fa";
import { SiBeatstars } from "react-icons/si";
import "./profile.css";

const Profile = () => {
  return (
    <div className="profile_container">
      <video autoPlay muted loop src={user_video} id="profile_video"></video>
      <div className="profile_overlay"></div>
      <div className="profile_image">
        <img src={user_image} alt="insane_beats" />
        <div className="profile_name">Insane Beats</div>
        <div className="profile_description">Music Producer</div>
      </div>
      <div className="social_icons">
        <a
          href="https://beatstars.com/drillking59"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiBeatstars />
        </a>
        <a
          href="https://instagram.com/yo_that_sounds_mad"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.youtube.com/@insane_beats"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube />
        </a>
        <a href="mailto:drillking59@gmail.com" rel="noopener noreferrer">
          <FaEnvelope />
        </a>
      </div>
    </div>
  );
};

export default Profile;
