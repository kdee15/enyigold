import React, { useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import classes from "./CopyOneColumn.module.scss";

export default function CopyOneColumn(props) {
  gsap.registerPlugin(ScrollTrigger);
  const { title, copy } = props;
  const phrases = [`${title}`];
  const bodyCopy = useRef(null);

  function AnimatedText({ children }) {
    const text = useRef(null);
    useLayoutEffect(() => {
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

  useLayoutEffect(() => {
    gsap.from(bodyCopy.current, {
      scrollTrigger: {
        trigger: bodyCopy.current,
        scrub: true,
        start: "0px bottom",
        end: "bottom+=500px bottom",
      },
      opacity: 0,
      left: "-2%",
      ease: "power3.Out",
    });
  }, []);

  return (
    <section className={`${classes.oCopyBlock}`}>
      <div className={`${classes.oContainer} container`}>
        <div className={`${classes.oRow} row`}>
          <h2 className={`${classes.aTitle}`}>
            {phrases.map((phrase, index) => {
              return <AnimatedText key={index}>{phrase}</AnimatedText>;
            })}
          </h2>
          <div className={`${classes.mBodyCopy} mBodyCopy`} ref={bodyCopy}>
            {documentToReactComponents(copy)}
          </div>
        </div>
      </div>
    </section>
  );
}
