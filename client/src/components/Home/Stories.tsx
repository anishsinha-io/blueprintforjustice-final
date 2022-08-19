import { useState } from "react";

import GeneralResources from "assets/resource-images/general-resources.png";

import { ReactComponent as PlayButton } from "assets/svg/play-button.svg";
import { ReactComponent as PlayButtonDark } from "assets/svg/play-button-dark.svg";

const Stories = () => {
  const [overlay, setOverlay] = useState<boolean>(false);
  return (
    <section className="app-stories">
      <div className="app-stories__title">
        <div className="stories-title">
          <h1>Stories from the mothers of the movement</h1>
          <p>
            The Black Mother's Film follows the journey of two women working to
            disrupt the cycle of racist police violence within our country's
            judicial system.
          </p>
        </div>
      </div>
      <div className="app-stories__img">
        <img
          src={GeneralResources}
          alt="legal aid"
          className={`stories-img stories-img${overlay ? "--overlay" : ""}`}
          onMouseOver={() => setOverlay(() => true)}
          onMouseLeave={() => setOverlay(() => false)}
        ></img>
        <a
          href="https://www.blackmothersfilm.com/"
          target="_blank"
          rel="noreferrer"
          className={!overlay ? "film-link" : "film-link--hidden"}
          onMouseOver={() => setOverlay(() => true)}
          onMouseLeave={() => setOverlay(() => false)}
        >
          <PlayButtonDark />
        </a>
        <a
          href="https://www.blackmothersfilm.com/"
          target="_blank"
          rel="noreferrer"
          className={overlay ? "film-link" : "film-link--hidden"}
          onMouseOver={() => setOverlay(() => true)}
          onMouseLeave={() => setOverlay(() => false)}
        >
          <PlayButton />
        </a>
      </div>
      <div className="app-stories__description">
        <div className="stories-description">
          <h3>Black Mothers Documentary</h3>
          <p>
            Directed by Debora Silva Souza, and David Felix Sutcliffe in 2020,
            the Black Mother's Film is an incredibly important informational
            work in the context of police violence and brutality. To learn more,
            click on the image and follow the link.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Stories;
