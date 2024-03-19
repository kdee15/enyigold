import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { projects } from "../../../helpers/data/CONTENT_PROJECTS";
import classes from "./ImageAnimate.module.scss";

function ImageAnimate() {
  const [scrollRef, setScrollRef] = useArrayRef();

  function useArrayRef() {
    const scrollRef = useRef([]);
    scrollRef.current = [];
    return [scrollRef, (ref) => ref && scrollRef.current.push(ref)];
  }

  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    scrollRef.current.forEach((project) => {
      const scrollImage = project.querySelector(".mProjectBackground");
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
        },
        "<"
      );
    });
  }, []);

  return (
    <section className={`${classes.infiniteScroll}`}>
      <div className={`${classes.projectItem}`} key={index} ref={setScrollRef}>
        <div
          className={`${classes.mColImage} mProjectBackground`}
          style={{
            backgroundImage: `url(${project.image})`,
          }}
        ></div>
        <div className={`${classes.mColBody} mBodyText`}></div>
        <h2>{project.name}</h2>
      </div>
    </section>
  );
}

export default ImageAnimate;
