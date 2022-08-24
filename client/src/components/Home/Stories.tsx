import { useState } from "react";

import Poster from "assets/new-poster.png";

import { ReactComponent as PlayButton } from "assets/svg/play-button.svg";
import { ReactComponent as PlayButtonDark } from "assets/svg/play-button-dark.svg";

const Stories = () => {
  const [overlay, setOverlay] = useState<boolean>(false);
  return (
    <section className="app-stories">
      <div className="app-stories__title">
        <div className="stories-title">
          <h3>Stories from the mothers of the movement</h3>
          <p>
            The Black Mother's Film follows the journey of two women working to
            disrupt the cycle of racist police violence within our country's
            judicial system.
          </p>
        </div>
      </div>
      <div className="app-stories__img">
        <img
          src={Poster}
          alt="legal aid"
          className={`stories-img`}
          loading="lazy"
        ></img>
        <a
          href="https://www.blackmothersfilm.com/"
          target="_blank"
          rel="noreferrer"
          className={`film-link`}
        >
          <PlayButtonDark />
        </a>
        <a
          href="https://www.blackmothersfilm.com/"
          target="_blank"
          rel="noreferrer"
          className="film-link"
        >
          <PlayButton />
        </a>
      </div>
      <div className="app-stories__description">
        <div className="stories-description">
          <h3 className="stories-description__header">
            Black Mothers Love & Resist
          </h3>
          <p>
            The Blueprint for Justice was built off the stories and learnings of
            the mothers of the movement. This feature-length documentary follows
            the mothers of young Black men victimized by police brutality, as
            they come together and build a network of community-led support,
            mutual aid, and healing in this trenchant documentary spanning
            Oakland's Fruitvale to the American South. Long before George
            Floyd's murder and the BLM protests in 2020, Oscar Grant's 2009
            fateful encounter with law enforcement on a BART platform seeded
            public awareness and cultural consciousness of systemic racism and
            its discontents. Paying forward lessons learned and advocating
            against anti-Black violence in memory of her son, Oscar, Wanda
            Johnson holds space for Angela Williams, whose teen son, Ulysses,
            survives a police encounter in Troy, Alabama, living to tell his
            story. Radical empathy fuels this timely exposé. Directed by Débora
            Souza Silva and produced by David Felix Sutcliffe & Adina Luo.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Stories;
