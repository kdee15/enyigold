"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Slider from "react-slick";
import classes from "./HeroBanner.module.scss";

export default function HeroBanner(props) {
  /**
   * return null needed for react render func
   */
  if (!props) return null;

  const background = useRef(null);
  const logoImage = useRef(null);
  const siteTitle = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: true,
        start: "top",
        end: "+=500px",
      },
    });

    timeline
      .from(background.current, { clipPath: `inset(15%)` })
      .to(logoImage.current, { height: "200px" }, 0)
      .to(siteTitle.current, { y: "-20%" }, 0);
  }, []);

  const { title, carouselImages, logo } = props;

  return (
    <div className={classes.homeHeader}>
      <div className={classes.backgroundImage} ref={background}>
        <Image
          src={`https:${carouselImages[1].fields.image.fields.file.url}`}
          fill="true"
          layout="fill"
          alt="background image"
          priority={true}
        />
      </div>
      <div className={classes.intro}>
        <h1
          ref={siteTitle}
          className={`${classes.fntH1} fntH1`}
          data-scroll
          data-scroll-speed="0.7"
        >
          {title}
        </h1>
        <div
          ref={logoImage}
          data-scroll
          data-scroll-speed="0.3"
          className={classes.logoImage}
        >
          <Image
            src={`https:${logo.fields.file.url}`}
            alt="intro image"
            layout="fill"
            fill="true"
            priority={true}
          />
        </div>
      </div>
      <figure
        className={classes.aBlockBackground}
        style={{
          backgroundImage: `url(${carouselImages[2].fields.image.fields.file.url})`,
        }}
      ></figure>
    </div>
  );
}
