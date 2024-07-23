import React from "react";
import user_image from "../../assets/user.png";
import user_video from "../../assets/video_bg.mp4";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import "./profile.css";

const Profile = () => {
  return (
    <div className="profile_container">
      <video autoPlay muted loop src={user_video} id="profile_video"></video>
      <div className="profile_overlay"></div>
      <div className="profile_image">
        <img src={user_image} alt="user_image" />
        <div className="profile_name">John Doe</div>
        <div className="profile_description">Web Developer & Designer</div>
      </div>
      <div className="social_icons">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn />
        </a>
      </div>
    </div>
  );
};

export default Profile;
