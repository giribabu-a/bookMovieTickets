import "./Footer.css";
import bmslogo from "../../assets/logo/bmslogo.png";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

function Footer() {
    return (
        <div className="footer_container">
            <div className="container-fluid">
                <div className='footer_logo_container'>
                    <div className="footer_line"></div>
                    <div className="footer_logo">
                        <img src={bmslogo} alt="logo" className="w-100" />
                    </div>
                    <div className="footer_line"></div>
                </div>
                <div className="d-flex justify-content-center align-items-center py-4">
                    <div className="social_media_link"><FaFacebookF /></div>
                    <div className="social_media_link"><FaXTwitter /></div>
                    <div className="social_media_link"><FaInstagram /></div>
                    <div className="social_media_link"><FaYoutube /></div>
                    <div className="social_media_link"><FaPinterestP /></div>
                    <div className="social_media_link"><FaLinkedinIn /></div>
                </div>
                <div className="footer_bootom_text">
                    <div>Copyright 2024 &#169; Bigtree Entertainment Pvt. Ltd. All Rights Reserved.</div>
                    <div>
                        The content and images used on this site are copyright protected  and copyrights vests with the respective owners.
                        The usage of the content and images on this website is intended to promote the works and no endorsement of the artist shall
                        be implied. Unauthorized use is prohibited and published by law.
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Footer;