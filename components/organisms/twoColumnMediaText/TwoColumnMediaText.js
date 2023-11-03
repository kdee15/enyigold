import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import classes from "./TwoColumnMediaText.module.scss";

function TwoColumnMediaText({ contentModule }) {
  // SCROLL EFFECTS START
  const [scrollRef, setScrollRef] = useArrayRef();

  function useArrayRef() {
    const scrollRef = useRef([]);
    scrollRef.current = [];
    return [scrollRef, (ref) => ref && scrollRef.current.push(ref)];
  }

  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    scrollRef.current.forEach((project) => {
      const scrollImage = project.querySelector(".scrollImage");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: project,
          start: "top bottom",
          toggleActions: "restart none none reset",
        },
      });
      tl.to(
        scrollImage,
        {
          duration: 2,
          scale: 1,
          opacity: 1,
          y: "0",
        },
        "<"
      );
    });
  }, []);
  // SCROLL EFFECTS END
  const { title, copy, image, mediaOnLeft, customClass } = contentModule;

  return (
    <section
      className={`${classes.oTextImageBlock} ${classes[`${customClass}`]}`}
    >
      <div className={`${classes.oContainer} container`}>
        <div
          className={`${classes.oRow} row no-gutters ${
            mediaOnLeft ? classes.left : classes.right
          }`}
        >
          <div className={`${classes.oColText} col-12 col-md-6`}>
            <h2 className={`${classes.aBlockTitle} fntH2`}>{title}</h2>
            <div>{documentToReactComponents(copy)}</div>
          </div>
          <div
            className={`${classes.oColImage} col-12 col-md-6`}
            ref={setScrollRef}
          >
            <figure
              className={`${classes.mImage} scrollImage`}
              style={{
                backgroundImage: `url(http:${image.fields.file.url})`,
              }}
            ></figure>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TwoColumnMediaText;
