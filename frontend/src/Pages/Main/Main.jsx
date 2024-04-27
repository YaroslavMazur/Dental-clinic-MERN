import React from "react";
import css from "./Main.module.css";
import AskAQuastion from "../../components/AskAQuestion/AskAQuastion";
import Loader from "../../components/Loader/Loader";
import GoogleMaps from "../../components/GoogleMaps/GoogleMaps";
import TypeWriter from "../../components/TypeWriter/TypeWriter";
import { Link } from "react-router-dom";
import Magnetic from "../../components/Magnetic/Magnetic"
import FAQ from "../../components/FAQ/FAQ";
import data from "../../components/FAQ/QA.js";
import InfiniteCarousel from "../../components/InfititeCarousel/InfiniteCarousel.jsx";


export const Main = () => {

    const beforeImages = [
        "./teeths/before/before.jpg",
        "./teeths/before/before1.jpg",
        "./teeths/before/before11.jpg",
        "./teeths/before/before3.jpg",
        "./teeths/before/before4.jpg",
        "./teeths/before/before5.jpg",
        "./teeths/before/before7.jpg",
        "./teeths/before/before8.jpg",
        "./teeths/before/before9.jpg",
        "./teeths/before/before10.jpg"


      ].map((image) => ({
        id: crypto.randomUUID(),
        image
      }));

      const afterImages = [
        "./teeths/after/after1.jpg",
        "./teeths/after/after2.jpg",
        "./teeths/after/after3.jpg",
        "./teeths/after/after4.jpg",
        "./teeths/after/after5.jpg",
        "./teeths/after/after6.jpg",
        "./teeths/after/after7.jpg",
        "./teeths/after/after8.jpg",
        "./teeths/after/after9.jpg",
        "./teeths/after/after10.jpg"

      ].map((image) => ({
        id: crypto.randomUUID(),
        image
      }));


    return (

        <div className={css.mainContainer}>

            <div className={css.textBlock}>
                <div className={css.leftBlock}>
                    <p className={css.staticText}>Dentistry that</p>
                    <TypeWriter className={css.dynamicText}
                        dynamicTexts={["boosts your self-assurance.", "contributes to your positive self-image.", "promotes a sense of well-being.", "elevates your quality of life."]}
                    />
                    <p className={css.regularText}>
                        We invite you to join our dental family, where your health and comfort are our priority. Contact us today and we will be happy to help you realize your dental dreams.
                    </p>

                    <div className={css.mainButtons}>

                        <Link to="/appointment">
                            <Magnetic>
                                <button className={css.callToActionBtn}>Make an appointmant</button>
                            </Magnetic>
                        </Link>

                        <Link to="/about">
                            <Magnetic>
                                <button className={`${css.callToActionBtn} ${css.borders}`}>Explore more</button>
                            </Magnetic>
                        </Link>
                    </div>

                </div>

                <div className={css.rightBlock}>

                    <img src="./main1.jpg" alt="photo1" className={css.photoMain} />
                </div>

            </div>

            <div className={css.block2}>
                <div className={css.leftBlock} >
                    <img src="./cabinet1.jpeg" />
                </div>

                <div className={css.rightBlock}>
                    <h1>
                        Discover Your Smile's Perfect Partner
                    </h1>
                    <p>
                        Welcome to our dental clinic, where your smile's health and beauty are our top priorities. With a team of highly skilled dentists and medical staff, we offer a comprehensive range of dental care services, from preventative to surgical procedures. We understand that every smile is unique, so we work individually with each patient to ensure the best results.
                        <br />
                        <br />
                        Equipped with state-of-the-art technology, our clinic provides a comfortable and serene atmosphere. We strive to provide you with convenience and confidence during every visit.
                        <br />
                        <br />

                        Come to us and entrust your smile to our experts. Together, we can achieve your dental goals and provide you with the healthy and attractive smile you deserve.
                        <br />
                        <br />

                        Your trust means everything to us, and we are committed to earning it through our professionalism, expertise, and genuine concern for your well-being. From the moment you walk through our doors, you'll experience the difference in our approach to dental care. We're here to partner with you on your journey to optimal oral health and a radiant smile that you'll be proud to show off.
                    </p>

                </div>

            </div>

            <div className={css.block3}>

                <InfiniteCarousel images={beforeImages} speed={40000} direction="right" />
                <InfiniteCarousel images={afterImages} speed={40000} direction="left" />
            </div>
            <div className={css.block4}>
            <h1 style={{textAlign:"center", color:"white"}}>Frequently Asked Questions</h1>
                <FAQ data={data}/>
            </div>
            <GoogleMaps />
        </div>
    )
}