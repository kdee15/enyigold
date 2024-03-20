import React, { useState } from "react";
import classes from "./ContactForm.module.scss";

export default function ContactForm(contentModule) {
  // States for contact form fields
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState("");

  //   Form validation state
  const [errors, setErrors] = useState({});

  //   Setting button text on form submission
  const [buttonText, setButtonText] = useState("Send");

  // Setting success or failure messages states
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);

  // Validation check method
  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (fullname.length <= 0) {
      tempErrors["fullname"] = true;
      isValid = false;
    }
    if (email.length <= 0) {
      tempErrors["email"] = true;
      isValid = false;
    }
    if (subject.length <= 0) {
      tempErrors["subject"] = true;
      isValid = false;
    }
    if (message.length <= 0) {
      tempErrors["message"] = true;
      isValid = false;
    }
    if ((consent != "yes") | (consent.length <= 0)) {
      tempErrors["consent"] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    console.log("errors", errors);
    return isValid;
  };

  //   Handling form submit

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValidForm = handleValidation();

    if (isValidForm) {
      setButtonText("Sending");
      const res = await fetch("/api/sendgrid", {
        body: JSON.stringify({
          email: email,
          fullname: fullname,
          subject: subject,
          message: message,
          consent: consent,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();
      if (error) {
        console.log(error);
        setShowSuccessMessage(false);
        setShowFailureMessage(true);
        setButtonText("Send");
        return;
      }
      setShowSuccessMessage(true);
      setShowFailureMessage(false);
      setButtonText("Send");
    }
    console.log(fullname, email, subject, message, consent);
  };

  const { title, image } = contentModule.contentModule;
  return (
    <section className={classes.oContactForm}>
      <h1 className={`${classes.aTitle} fnt-h1`}></h1>
      <div className={`${classes.oContainer} container`}>
        <div className={`${classes.oRow} row`}>
          <div className={`${classes.oColImage} col-12 col-lg-6`}>
            <figure
              className={classes.mImage}
              style={{
                backgroundImage: `url(${image?.fields?.file?.url})`,
              }}
            ></figure>
          </div>
          <div className={`${classes.oColForm} col-12 col-lg-6`}>
            <div className={classes.oFormBlock}>
              <form onSubmit={handleSubmit} className={`${classes.oForm}`}>
                <h2 className={`${classes.aTitle} fntH2`}>{title}</h2>
                <div className={`${classes.mInput}`}>
                  <label htmlFor="fullname" className={`${classes.mLabel}`}>
                    <input
                      type="text"
                      value={fullname}
                      onChange={(e) => {
                        setFullname(e.target.value);
                      }}
                      name="fullname"
                      className={`${classes.aInput}`}
                      placeholder=""
                    />
                    <span className={`${classes.aLabel}`}>
                      Full name<span>*</span>
                    </span>
                  </label>
                  {errors?.fullname && (
                    <p className={`${classes.aError} fnt12`}>
                      Fullname cannot be empty.
                    </p>
                  )}
                </div>
                <div className={`${classes.mInput}`}>
                  <label htmlFor="email" className={`${classes.mLabel}`}>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      className={`${classes.aInput}`}
                      placeholder=""
                    />
                    <span className={`${classes.aLabel}`}>
                      E-mail<span>*</span>
                    </span>
                  </label>
                  {errors?.email && (
                    <p className={`${classes.aError} fnt12`}>
                      Email cannot be empty.
                    </p>
                  )}
                </div>
                <div className={`${classes.mInput}`}>
                  <label htmlFor="subject" className={`${classes.mLabel}`}>
                    <input
                      type="text"
                      name="subject"
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                      }}
                      className={`${classes.aInput} fnt18`}
                      placeholder=""
                    />
                    <span className={`${classes.aLabel}`}>
                      Subject<span>*</span>
                    </span>
                  </label>
                  {errors?.subject && (
                    <p className={`${classes.aError} fnt12`}>
                      Subject cannot be empty.
                    </p>
                  )}
                </div>
                <div className={`${classes.mInput}`}>
                  <label htmlFor="message" className={`${classes.mLabel}`}>
                    <textarea
                      name="message"
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                      className={`${classes.aInput} ${classes.aTextArea} fnt14`}
                      placeholder=""
                    ></textarea>
                    <span className={`${classes.aLabel}`}>
                      Message<span>*</span>
                    </span>
                  </label>
                  {errors?.message && (
                    <p className={`${classes.aError} fnt12`}>
                      Message body cannot be empty.
                    </p>
                  )}
                </div>

                <div className={`${classes.mInput}`}>
                  <label htmlFor="consent" className={`${classes.mLabel}`}>
                    <input
                      type="text"
                      name="consent"
                      value={consent}
                      onChange={(e) => {
                        setConsent(e.target.value);
                      }}
                      className={`${classes.aInput} fnt18`}
                      placeholder=""
                    />
                    <span className={`${classes.aLabel}`}>
                      Are you over 18 years old? &#40; type yes or no&#41;
                      <span>*</span>
                    </span>
                  </label>
                  {errors?.consent && (
                    <p className={`${classes.aError} fnt12`}>
                      Consent cannot be empty. You may not proceed if you are
                      under age.
                    </p>
                  )}
                </div>

                <div className={`${classes.mCta}`}>
                  <button type="submit" className={`aBtn`}>
                    {buttonText}
                  </button>
                </div>
                {showSuccessMessage && (
                  <div className={`${classes.mRedirect} ${classes.success}`}>
                    <p className={`${classes.aText} fnt28`}>
                      Thank you! <br />
                      <br />
                      Your Message has been delivered.
                    </p>
                  </div>
                )}
                {showFailureMessage && (
                  <p className="text-red-500">
                    Oops! Something went wrong, please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
