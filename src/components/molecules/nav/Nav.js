import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { isMobile } from "react-device-detect";
import BurgerMenu from "../burgerMenu/BurgerMenu";
import Link from "next/dist/client/link";
import classes from "./Nav.module.scss";

export default function Nav(contentModule) {
  const [isActive, setIsActive] = useState();
  const [mobileView, setMobileView] = useState();
  const handleToggle = () => setIsActive(!isActive);
  gsap.registerPlugin(ScrollTrigger);
  const navbarRef = useRef(null);

  useEffect(() => {
    setMobileView(isMobile);

    const showNav = gsap
      .fromTo(
        navbarRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.4,
        }
      )
      .progress(1);
    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        self.direction === -1 ? showNav.play() : showNav.reverse();
      },
    });
  }, []);

  const { menuLinks } = contentModule.contentModule;
  return (
    <nav className={classes.oNavMain} ref={navbarRef}>
      <span
        onClick={handleToggle}
        className={`${classes.burgerWrapper} ${
          isActive ? `${classes.navOpen}` : `${classes.navClosed}`
        }`}
      >
        <BurgerMenu />
      </span>
      {mobileView ? (
        <div
          className={`${classes.mNavMobile} ${
            isActive ? `${classes.navOpen}` : `${classes.navClosed}`
          }`}
        >
          <div onClick={handleToggle} className={classes.mNavBurger}>
            <BurgerMenu handleToggle={handleToggle} isActive={isActive} />
          </div>
          <ul className={classes.mMenu}>
            {menuLinks.map((link, index) => (
              <li className={classes.navLink} key={index}>
                <Link
                  onClick={handleToggle}
                  href={link.fields.url}
                  className={classes.aLink}
                  target={`${link.fields.isExternal ? "_blank" : "_parent"}`}
                >
                  {link.fields.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={`${classes.mNavDesktop}`}>
          <ul className={classes.mMenu}>
            {menuLinks.map((link, index) => (
              <li className={classes.navLink} key={index}>
                <Link
                  href={link.fields.url}
                  className={`${classes.aLink} fnt16b`}
                  target={`${link.fields.isExternal ? "_blank" : "_parent"}`}
                >
                  {link.fields.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
