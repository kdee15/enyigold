"use client";
import React, { useLayoutEffect, useRef } from "react";
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
  const introImage = useRef(null);

  useLayoutEffect(() => {
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
      .to(introImage.current, { height: "200px" }, 0);
  }, []);

  const { title, carouselImages } = props;

  return (
    <div className={classes.homeHeader}>
      <div className={classes.backgroundImage} ref={background}>
        <Image
          src={carouselImages[0].fields.image.fields.file.url}
          fill="true"
          layout="fill"
          alt="background image"
          priority={true}
        />
      </div>
      <div className={classes.intro}>
        <div
          ref={introImage}
          data-scroll
          data-scroll-speed="0.3"
          className={classes.introImage}
        >
          <Image
            src={carouselImages[1].fields.image.fields.file.url}
            alt="intro image"
            layout="fill"
            fill="true"
            priority={true}
          />
        </div>
        <h1
          className={`${classes.fntH1} fntH1`}
          data-scroll
          data-scroll-speed="0.7"
        >
          {title}
        </h1>
      </div>
    </div>
  );
}
