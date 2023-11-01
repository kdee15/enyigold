import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import classes from "./TwoColumnMediaText.module.scss";

function TwoColumnMediaText({ contentModule }) {
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
          <div className={`${classes.oColImage} col-12 col-md-6`}>
            <figure
              className={`${classes.mImage}`}
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
