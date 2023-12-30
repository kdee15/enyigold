import React, { useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import classes from "./CopyOneColumn.module.scss";

export default function CopyOneColumn(props) {
  gsap.registerPlugin(ScrollTrigger);
  const {
    title,
    copy,
    image,
    backgroundColor,
    backgroundColorEnd,
    transparencyStart,
    transparency,
    customClass,
  } = props;
  const phrases = [`${title}`];
  const bodyCopy = useRef(null);
  const divTrim = useRef(null);

  function AnimatedText({ children }) {
    const text = useRef(null);
    useEffect(() => {
      gsap.from(text.current, {
        scrollTrigger: {
          trigger: text.current,
          scrub: true,
          start: "0px bottom",
          end: "bottom+=400px bottom",
        },
        opacity: 0,
        left: "-5%",
        ease: "power3.Out",
      });
    }, []);
    return <span ref={text}>{children}</span>;
  }

  useEffect(() => {
    gsap.from(bodyCopy.current, {
      scrollTrigger: {
        trigger: bodyCopy.current,
        scrub: true,
        start: "0px bottom",
        end: "bottom+=500px bottom",
      },
      opacity: 0,
      left: "-5%",
      ease: "power3.Out",
    });
  }, []);

  useEffect(() => {
    gsap.to(divTrim.current, {
      scrollTrigger: {
        trigger: divTrim.current,
        scrub: true,
        start: "0px bottom",
        end: "bottom+=500px bottom",
      },
      opacity: transparency,
      backgroundColor: backgroundColorEnd,
    });
  }, []);

  return (
    <section className={`${classes.oCopyBlock} ${classes[customClass]}`}>
      <div className={`${classes.oContainer} container`}>
        <div className={`${classes.oRow} row`}>
          <div className={`${classes.oColBody} col-12`}>
            <h2 className={`${classes.aTitle} fntH2`}>
              {phrases.map((phrase, index) => {
                return <AnimatedText key={index}>{phrase}</AnimatedText>;
              })}
            </h2>
            <div
              className={`${classes.mBodyCopy} mBodyCopy fnt16`}
              ref={bodyCopy}
            >
              {documentToReactComponents(copy)}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${classes.aBackgroundColor} aBackgroundColor`}
        ref={divTrim}
      ></div>
      {image ? (
        <figure
          className={`${classes.aBackgroundImage}`}
          style={{
            backgroundImage: `url(http:${image.fields.file.url})`,
          }}
        ></figure>
      ) : null}

      <style global jsx>{`
        .aBackgroundColor {
          background-color: ${backgroundColor};
          transparency: ${transparencyStart};
        }
      `}</style>
    </section>
  );
}
