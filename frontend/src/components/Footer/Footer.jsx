import React from "react";
import css from "./Footer.module.css";
import AskAQuastion from "../AskAQuestion/AskAQuastion";
import {Link} from "react-router-dom";

export const Footer = () => {


    return(
        <footer className={css.footerContainer}>
            <div className={css.footerInfo}>
                <div className={css.column}>
                    <p>We're delighted to have you back with us.<br/><br/>We are dedicated to providing you with the highest quality dental care in a comfortable and welcoming environment.<br/><br/>Our team of experienced professionals is committed to ensuring your dental health and well-being.
</p>

                </div>

                <div className={css.column}>
                    <h3>Contact info</h3>
                    <div className={css.contactInfoContainer}>
                        <div className={css.info}>
                            <p>+38 (066) 987-65-43</p>
                            <p>+38 (067) 123-45-67</p>
                            <p> +38 (095) 234-56-78</p>
                        </div>

                        <p>45 Park Avenue,
                        New York,
                        NY 10016,
                        United States</p>
                        
                        <p>dentalcareclinic.alerts@gmail.com</p>

                        <div className={css.socialLinks}>
                            <a href="https://web.telegram.org/"><img src="Telegram_logo.svg"/></a>
                            
                            <a href="https://www.instagram.com/"><img src="Instagram_logo.svg"/></a>
                            <a href="https://www.facebook.com/"><img src="Facebook_f_logo.svg"/></a>
                        </div>

                    </div>

                </div>
                
                <div className={css.column}>
                    <h3>Navigation</h3>
                    <Link to="/about">Schedule a meeting</Link>
                    <Link to="/about">About us</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/about">Log in</Link>
                    <Link to="/about">Sign up</Link>

                </div>
                <div className={css.column}>
                    <h3>Ask a question</h3>
                    <AskAQuastion/>
                </div>
            </div>
            <p className={css.footerText}>
                ©2024 Dental Clinic. All rights reserved. All materials posted on this website, including text, images, graphics, audio, and video materials, are subject to copyright protection. Any use of these materials without prior written consent of the copyright owner is prohibited.
            </p>
        </footer>
    )
}