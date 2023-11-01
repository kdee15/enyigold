import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { projects } from "../../../helpers/data/CONTENT_PROJECTS";
import classes from "./ScrollBlocks.module.scss";

function ScrollBlocks() {
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    ScrollTrigger.create({
      start: 1,
      end: "max",
      onLeaveBack: (self) => self.scroll(ScrollTrigger.maxScroll(window) - 2),
      onLeave: (self) => self.scroll(2),
    });
  }, []);

  return (
    <section className={`${classes.infiniteScroll}`}>
      <div className={`${classes.fixedBlock}`}>
        <div>bloashfskj sf sf g fsdg fd</div>
      </div>
      <div className={`${classes.projectBlock}`}>
        {projects.map((project, index) => (
          <div
            className={`${classes.projectItem}`}
            key={index}
            style={{
              backgroundImage: `url(${project.image})`,
            }}
          >
            <h2>{project.name}</h2>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ScrollBlocks;
