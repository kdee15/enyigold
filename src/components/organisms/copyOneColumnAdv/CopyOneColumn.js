import React, { useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import classes from "./CopyOneColumn.module.scss";

export default function CopyOneColumn(props) {
  const { title, copy } = props;
  const [lettersRef, setLettersRef] = useArrayRef();
  const triggerRef = useRef(null);

  function useArrayRef() {
    const lettersRef = useRef([]);
    lettersRef.current = [];
    return [lettersRef, (ref) => ref && lettersRef.current.push(ref)];
  }

  gsap.registerPlugin(ScrollTrigger);
  const text = copy;

  const phrases = [`${title}`];

  useEffect(() => {
    const reveal = gsap.to(lettersRef.current, {
      scrollTrigger: {
        trigger: triggerRef.current,
        scrub: true,
        start: "top center",
        end: "bottom 80%",
      },
      color: "white",
      duration: 5,
      stagger: 1,
    });
    return () => {
      reveal.kill();
    };
  }, []);

  return (
    <section className={`${classes.oCopyBlock}`}>
      <div className={`${classes.oContainer} container`}>
        <div className={`${classes.oRow} row`}>
          <div className={`${classes.description}`}>
            {phrases.map((phrase, index) => {
              return <AnimatedText key={index}>{phrase}</AnimatedText>;
            })}
          </div>
          <div className={`${classes.reveal} reveal`}>
            <div ref={triggerRef}>
              {text.split("").map((letter, index) => (
                <span
                  className={`${classes.revealText} reveal-text`}
                  key={index}
                  ref={setLettersRef}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedText({ children }) {
  const text = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(text.current, {
      scrollTrigger: {
        trigger: text.current,
        scrub: true,
        start: "0px bottom",
        end: "bottom+=400px bottom",
      },
      opacity: 0,
      left: "-200px",
      ease: "power3.Out",
    });
  }, []);

  return (
    <h2 className={`fntH2`} ref={text}>
      {children}
    </h2>
  );
}
