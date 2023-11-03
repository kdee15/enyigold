"use client";
import { createClient } from "contentful";
import { useEffect } from "react";
import Nav from "../components/molecules/nav/Nav";
import HeroCarousel from "../components/organisms/heroCarousel/HeroCarousel";
import TwoColumnMediaText from "../components/organisms/twoColumnMediaText/TwoColumnMediaText";
import CopyOneColumn from "../components/organisms/copyOneColumn/CopyOneColumn";
import ScrollBlocks from "../components/organisms/scrollBlocks/ScrollBlocks";
import HeroBanner from "../components/organisms/heroBanner/HeroBanner";
const { C_SPACE_ID, C_DELIVERY_KEY } = require("../helpers/contentful-config");

export async function getStaticProps(context) {
  const client = createClient({
    space: C_SPACE_ID,
    accessToken: C_DELIVERY_KEY,
  });

  const resPage = await client
    .getEntries({
      content_type: "pageHome",
      include: 10,
    })

    .then((entries) => entries.items);

  return {
    props: {
      Page: resPage,
    },
    revalidate: 1,
  };
}

export default function Home({ Page }) {
  const mainMenu = Page[0].fields.components[0].fields;
  const heroBanner = Page[0].fields.components[1].fields;
  const aboutCopy = Page[0].fields.components[2].fields;
  const recipeOneBlock = Page[0].fields.components[3].fields;
  const recipeTwoBlock = Page[0].fields.components[4].fields;

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  return (
    <div className="anchor" id="top">
      <Nav contentModule={mainMenu} />
      <HeroBanner {...heroBanner} />
      <TwoColumnMediaText contentModule={recipeOneBlock} />
      <TwoColumnMediaText contentModule={recipeTwoBlock} />
      {/* <HeroCarousel {...heroBanner} /> */}
      {/* <CopyOneColumn {...aboutCopy} />
      <ScrollBlocks />
      <TwoColumnMediaText contentModule={recipeOneBlock} />
      <TwoColumnMediaText contentModule={recipeTwoBlock} /> */}
    </div>
  );
}
