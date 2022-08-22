/** Blueprint For Justice
 ** Copyright (C) 2022 Anish Sinha
 **
 ** This program is free software: you can redistribute it and/or modify
 ** it under the terms of the GNU General Public License as published by
 ** the Free Software Foundation, either version 3 of the License, or
 ** (at your option) any later version.
 **
 ** This program is distributed in the hope that it will be useful,
 ** but WITHOUT ANY WARRANTY; without even the implied warranty of
 ** MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 ** GNU General Public License for more details.
 **
 ** You should have received a copy of the GNU General Public License
 ** along with this program.  If not, see http://www.gnu.org/licenses/.
 **/

import { useState, useContext } from "react";

import Credits from "components/About/Credits";
import Card from "components/Reusables/Card";
import CommunityConnections from "assets/resource-images/community-connections.png";

import { ReactComponent as MainLogoDark } from "assets/svg/blackmothersfilm-logo-dark.svg";
import { ReactComponent as UpArrow } from "assets/svg/up-arrow.svg";
import { ReactComponent as UpArrowDark } from "assets/svg/up-arrow-dark.svg";

import SettingsCtx from "components/ctx";

import founders from "components/About/founders";

import LucyMcBath from "assets/mothers/LucyMcBath.jpeg";

const About = () => {
  const ctx = useContext(SettingsCtx);
  const [showWebsiteTeam, setShowWebsiteTeam] = useState<boolean>(false);
  const Arrow = ctx.darkmode ? UpArrowDark : UpArrow;
  const foundersCards = founders.map(
    (founder: { name: string; bio: string; url?: string; imgSrc: string }) => {
      console.log(founder.imgSrc);
      return (
        <Card
          className="about-card"
          key={founder.name}
          title={founder.name}
          label={founder.name}
          imgSrc={founder.imgSrc}
          imgAlt={founder.name}
          icon={MainLogoDark}
          text={founder.bio}
          size="md"
          absolute={true}
          link={founder.url}
        />
      );
    }
  );
  return (
    <section className="app-about">
      <div className="about-main">
        <div className="app-about__main">
          <h1 className="about-title">About Us</h1>
          This project was developed to allow those that have experienced this
          hardship to find the assistance they need, as well as those that hope
          to get involved. as a part of the Black Mothers Film. We set out with
          the task to compile the best resources for ease of access. The film
          "Black Mothers Love & Resist", linked in the "Documentary" section in
          the footer as well as in the homepage, followed the mothers of the
          movement over five years and kept track of the challenges they faced
          and strategies they adapted, and this platform is inspired by the{" "}
          <em>blueprint for justice</em> they helped to shape.
        </div>
        <div className="app-about__mission">
          <h1 className="about-mission">Mission and Statement</h1>
          This project was developed to allow those that have experienced this
          hardship to find the assistance they need, as well as those that hope
          to get involved. We set out with the task to compile the best
          resources for ease of access. This platform is built in the hope that
          it will be a useful tool to combat racist police brutality and its
          broader repercussions on both the families and the communities it
          harms.
        </div>
        <div className="app-about__team">
          <h1 className="about-team">Featured Mothers</h1>
          Comprised of professionals versed in all facets of activism and UX, we
          share a sense of community &#8212;united in a desire to give back and
          prevent the harm that police violence causes.
        </div>
      </div>
      <div className="about-body">
        <div className="about--cards">{foundersCards}</div>
      </div>
      <div className="show-more">
        <h3 className="show-more__text">Creative Team</h3>
        <Arrow
          onClick={() => setShowWebsiteTeam(() => !showWebsiteTeam)}
          className={`show-more__icon show-more__icon${
            ctx.darkmode ? "--dark" : ""
          } ${showWebsiteTeam || "flipped"}`}
        />
      </div>
      {showWebsiteTeam && <Credits />}
    </section>
  );
};

export default About;
