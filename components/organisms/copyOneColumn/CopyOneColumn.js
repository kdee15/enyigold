import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import classes from "./CopyOneColumn.module.scss";

function CopyOneColumn(props) {
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
    <section className={`${classes.reveal} reveal`}>
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
    </section>
  );
}

export default CopyOneColumn;
