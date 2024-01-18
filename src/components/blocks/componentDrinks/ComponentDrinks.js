import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import classes from "./ComponentDrinks.module.scss";

function ComponentDrinks(contentModule) {
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
          scrub: true,
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

  const { title, recipes } = contentModule.contentModule;
  return (
    <div className={`${classes.oDrinksBlock}`}>
      <h2 className={`${classes.aBlockTitle}`}>{title}</h2>
      <div className={`${classes.oContainer} container`}>
        {recipes.map((recipe, index) => (
          <div
            className={`${classes.oCard} ${
              classes[recipe.fields.customClass]
            } row no-gutters oCard`}
            key={index}
            ref={setScrollRef}
          >
            <div className={`${classes.oColBody} col-12 col-md-6`}>
              <div className={`${classes.mBodyWrapper}`}>
                <h2>{recipe.fields.title}</h2>
                <div className={`${classes.mBodyCopy}`}>
                  {documentToReactComponents(recipe.fields.copy)}
                </div>
              </div>
            </div>
            <div className={`${classes.oColImage} col-12 col-md-6`}>
              <figure className={`${classes.mImage}`}>
                <Image
                  src={`${recipe.fields.images[0].fields.file.url}`}
                  width={
                    recipe.fields.images[0].fields.file.details.image.width
                  }
                  height={
                    recipe.fields.images[0].fields.file.details.image.height
                  }
                  style={{ objectFit: "scale-down" }}
                  alt="project image"
                  priority={true}
                  className={`${classes.aImage} scrollImage`}
                />
              </figure>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComponentDrinks;
