import Image from "next/dist/client/image";
import Link from "next/dist/client/link";
import classes from "./Footer.module.scss";

export default function Footer(contentModule) {
  const { title, logo, menues } = contentModule.contentModule;
  const socialMenu = menues[0].fields.menuLinks;
  const menuFields = menues[0].fields;
  return (
    <section className={classes.oFooter}>
      <div className={`${classes.oContainer} container`}>
        <div className={`${classes.oRow} row`}>
          <div className={`${classes.oColText} col-12 col-md-6`}>
            <h3 className={`${classes.aTitle} fntH3`}>{title}</h3>
            <figure className={`${classes.mImage}`}>
              <Image
                src={logo.fields.file.url}
                width={logo.fields.file.details.image.width}
                height={logo.fields.file.details.image.height}
                alt="Enyi Logo"
                priority={true}
                layout="responsive"
              />
            </figure>
          </div>
          <div className={`${classes.oColDetails} col-12 col-md-6`}>
            <h4 className={classes.aTitle}>{menuFields.title}</h4>
            <ul
              className={`${classes.oMenu} ${classes[menuFields.customClass]}`}
            >
              {socialMenu.map((item, index) => (
                <li key={index} className={classes.mListItem}>
                  <Link href={item.fields.url}>
                    <a
                      className={classes.aLink}
                      target={`${
                        item.fields.isExternal ? "_blank" : "_parent"
                      }`}
                    >
                      {item.fields.image ? (
                        <figure className={`${classes.mImage}`}>
                          <Image
                            src={item.fields.image.fields.file.url}
                            alt="Enyi Logo"
                            priority={true}
                            layout="fill"
                          />
                        </figure>
                      ) : (
                        <span>{item.fields.label}</span>
                      )}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
