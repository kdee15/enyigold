import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import classes from "./ScrollBlocks.module.scss";

function ScrollBlocks() {
  const [scrollRef, setScrollRef] = useArrayRef();

  function useArrayRef() {
    const scrollRef = useRef([]);
    scrollRef.current = [];
    return [scrollRef, (ref) => ref && scrollRef.current.push(ref)];
  }

  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    scrollRef.current.forEach((recipe) => {
      const scrollImage = recipe.querySelector(".scrollImage");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: recipe,
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
      <div className={`${classes.fixedBlock}`}>
        <div>bloashfskj sf sf g fsdg fd</div>
      </div>
      <div className={`${classes.projectBlock}`}>
        {recipes.map((recipe, index) => (
          <div
            className={`${classes.projectItem}`}
            key={index}
            ref={setScrollRef}
          >
            <div
              className={`${classes.mColImage} scrollImage`}
              style={{
                backgroundImage: `url(${recipe.image})`,
              }}
            ></div>
            <div className={`${classes.mColBody} mBodyText`}></div>
            <h2>{recipe.name}</h2>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ScrollBlocks;
