import React from "react";
import "./footer.css";
import video2 from "../../Assets/video2.mp4";
import { FiSend } from "react-icons/fi";
import Logo from "../Logo/Logo";
import { MdOutlineTravelExplore } from "react-icons/md";
import {
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { FaTripadvisor } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

// will change the content!!
const Footer = () => {
  return (
    <section className="footer">
      <div className="videoDiv">
        <video src={video2} loop autoPlay muted type="video/mp4"></video>
      </div>

      <div className="secContent container">
        <div className="contactDiv flex">
          <div className="text">
            <small>Let's go KiaKia</small>
            <h2>Travel with us</h2>
          </div>
        </div>

        <div className="footerCard flex">
          <div className="footerIntro flex">
            <Logo className="logo" />

            <div className="footerParagraph">
              IS3106 AY2023 Sem 2 Group Project by Michelle, Natasha, Shino,
              Vinessa, Varrene
            </div>

            <div className="footerDiv flex">
              <small>COPYRIGHTS RESERVED</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
