"use client";
import { createClient } from "contentful";
import { useEffect } from "react";
import Nav from "../components/molecules/nav/Nav";
import CopyOneColumn from "../components/organisms/copyOneColumn/CopyOneColumn";
import HeroBanner from "../components/organisms/heroBanner/HeroBanner";
import ComponentDrinks from "../components/blocks/componentDrinks/ComponentDrinks";
import HorizontalScrollBlock from "../components/organisms/horizontalScrollBlock/HorizontalScrollBlock";
import Footer from "../components/organisms/footer/Footer";
import TwoColumnMediaText from "../components/organisms/twoColumnMediaText/TwoColumnMediaText";
import ContactForm from "../components/organisms/contactForm/ContactForm";
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

  const resFooter = await client.getEntries({
    content_type: "componentFooter",
    include: 10,
  });

  return {
    props: {
      Page: resPage,
      PageFooter: resFooter.items[0].fields,
    },
    revalidate: 1,
  };
}

export default function Home({ Page, PageFooter }) {
  const mainMenu = Page[0].fields.components[0].fields;
  const heroBanner = Page[0].fields.components[1].fields;
  const aboutCopy = Page[0].fields.components[2].fields;
  const flavourCopy = Page[0].fields.components[3].fields;
  const awardsBlock = Page[0].fields.components[4].fields;
  const founders = Page[0].fields.components[5].fields;
  const drinksBlock = Page[0].fields.components[6].fields;
  const contact = Page[0].fields.components[7].fields;

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
      <CopyOneColumn {...aboutCopy} />
      <CopyOneColumn {...flavourCopy} />
      <TwoColumnMediaText contentModule={awardsBlock} />
      <HorizontalScrollBlock {...founders} />
      <ComponentDrinks contentModule={drinksBlock} />
      <ContactForm contentModule={contact} />
      <Footer contentModule={PageFooter} />
    </div>
  );
}
