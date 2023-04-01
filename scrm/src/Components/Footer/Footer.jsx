import React from 'react'
import './footer.css'
import video2 from '../../Assets/video2.mp4'
import {FiSend} from 'react-icons/fi'
import Logo from '../Logo/Logo'
import { MdOutlineTravelExplore } from 'react-icons/md'
import { AiFillInstagram, AiFillYoutube, AiOutlineTwitter } from 'react-icons/ai'
import { FaTripadvisor } from 'react-icons/fa'
import { FiChevronRight } from 'react-icons/fi'


// will change the content!!
const Footer = () => {
  return (
    <section className='footer'>
      <div className="videoDiv">
        <video src={video2} loop autoPlay muted type="video/mp4"></video>
      </div>

      <div className="secContent container">
        <div className="contactDiv flex">
          <div className="text">
            <small>KEEP IN TOUCH</small>
            <h2>Travel with us</h2>
          </div>

          <div className="inputDiv flex">
            <input type="text" placeholder='Enter Email Address'/>
            <button className='btn flex' type='submit'>
              SEND <FiSend className='icon'/>
            </button>
          </div>
        </div>

        <div className="footerCard flex">
          <div className="footerIntro flex">
            <Logo className="logo"/>

            <div className="footerParagraph">
              Lorem ipsum fasdfdasfd dasfdasfgg
              fdasfdasfdfdsaf
              asffafdsaga
            </div>

            <div className="footerSocials">
              <AiOutlineTwitter className='icon'/>
              <AiFillYoutube className='icon'/>
              <AiFillInstagram className="icon"/>
              <FaTripadvisor className='icon'/>
            </div>

            <div className="footerLinks grid">
              {/* Group 1 */}
              <div className="linkGroup">
                <span className="groupTitle">
                  PARTNERS
                </span>

                <li className="footerList flex">
                  <FiChevronRight className='icon'/>
                  Bookings
                </li>

                <li className="footerList flex">
                  <FiChevronRight className='icon'/>
                  Rentcars
                </li>
                <li className="footerList flex">
                  <FiChevronRight className='icon'/>
                  HostelWorld
                </li>
                <li className="footerList flex">
                  <FiChevronRight className='icon'/>
                  Trivago
                </li>

                <li className="footerList flex">
                  <FiChevronRight className='icon'/>
                  Tripadvisor
                </li>




              </div>
              {/* Group 2 */}
              <div className="linkGroup">
                <span className="groupTitle">
                  OUR AGENCY
                </span>

                <li className="footerList flex">
                  <FiChevronRight className='icon'/>
                  Services
                </li>

                <li className="footerList flex">
                  <FiChevronRight className='icon'/>
                  Insurance
                </li>
                <li className="footerList flex">
                  <FiChevronRight className='icon'/>
                  Agency
                </li>
                <li className="footerList flex">
                  <FiChevronRight className='icon'/>
                  Tourism
                </li>

                <li className="footerList flex">
                  <FiChevronRight className='icon'/>
                  Payment
                </li>




              </div>
              {/* Group 3 */}
              <div className="linkGroup">
                <span className="groupTitle">
                  LAST MINUTE
                </span>

                <li className="footerList flex">
                  <FiChevronRight className='icon'/>
                  London
                </li>

                <li className="footerList flex">
                  <FiChevronRight className='icon'/>
                  California
                </li>
                <li className="footerList flex">
                  <FiChevronRight className='icon'/>
                  Indonesia
                </li>
                <li className="footerList flex">
                  <FiChevronRight className='icon'/>
                  Singapore
                </li>

                <li className="footerList flex">
                  <FiChevronRight className='icon'/>
                  Japan
                </li>




              </div>
            </div>

            <div className="footerDiv flex">
              <small>COPYRIGHTS RESERVED</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer