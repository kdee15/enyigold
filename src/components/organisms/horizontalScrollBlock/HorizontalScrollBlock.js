import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { isMobile } from "react-device-detect";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import classes from "./HorizontalScrollBlock.module.scss";

function HorizontalScrollBlock(props) {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const [mobileView, setMobileView] = useState();

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    setMobileView(isMobile);
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: "-400vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
        },
      }
    );
    return () => {
      {
        /* A return function for killing the animation on component unmount */
      }
      pin.kill();
    };
  }, []);

  const { title, introText, backgroundImage, cardList } = props;

  return (
    <section
      className={`${classes.scrollSectionOuter} ${classes.oHorizontalScroll} scroll-section-outer`}
      style={{
        backgroundImage: `url(http:${backgroundImage.fields.file.url})`,
      }}
    >
      {/* The section up act just as a wrapper. If the trigger (below) is the
      first jsx element in the component, you get an error on route change */}

      {/* The div below act just as a trigger. As the doc suggests, the trigger and 
      the animation should alway be two separated refs */}
      <div ref={triggerRef} className={`${classes.blockWrapper}`}>
        <div
          ref={sectionRef}
          className={`${classes.scrollSectionInner} scroll-section-inner`}
        >
          <div
            className={`${classes.scrollSection} ${classes.oIntroBlock} scroll-section`}
          >
            <h3 className={`${classes.aTitle} fnt120`}>
              {documentToReactComponents(introText)}
            </h3>
          </div>
          {cardList.map((card, index) => {
            return (
              <div
                className={`${classes.scrollSection} ${classes.oCard} scroll-section`}
                key={index}
              >
                <div className={`${classes.mBody}`}>
                  <h3 className={`${classes.aTitle} fnt120`}>
                    {card.fields.title}
                  </h3>
                  <div className={`${classes.mCopy} fnt28`}>
                    {documentToReactComponents(card.fields.copy)}
                  </div>
                </div>
                {mobileView ? (
                  <figure
                    className={`${classes.mImageMobile}`}
                    style={{
                      backgroundImage: `url(${card.fields.imageMobile.fields.file.url})`,
                    }}
                  ></figure>
                ) : (
                  <figure className={`${classes.mImageDesk}`}>
                    <Image
                      src={`https:${card.fields.image.fields.file.url}`}
                      width={card.fields.image.fields.file.details.image.width}
                      height={
                        card.fields.image.fields.file.details.image.height
                      }
                      alt="founder image"
                      priority={true}
                      layout="responsive"
                    />
                  </figure>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HorizontalScrollBlock;
