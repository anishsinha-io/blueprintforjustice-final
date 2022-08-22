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

import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { LinkData, LinkAttrs } from "components/Resources/resourcetypes";
import ResourceBlock from "components/Resources/ResourceBlock";

import ResourceLoading from "components/Resources/ResourceLoading";

import SettingsCtx from "components/ctx";

import getBaseUrl from "config";
import { shouldRefreshLinks } from "components/Resources/refresh";

const ActionResource = () => {
  const ctx = useContext(SettingsCtx);
  const [linkData, setLinkData] = useState<LinkData>({});
  const [loading, setLoading] = useState<boolean>(true);

  const getLinks = async () => {
    const res = await axios.get(`${getBaseUrl()}/resources?resource=action`);
    const data = await res.data;

    setLinkData(data);
    setLoading(false);
  };

  useEffect(() => {
    getLinks();
  }, []);

  let jsx;
  if (!loading) {
    const final = Object.entries(linkData).map(([k, v]) => {
      const items = v.map((link: LinkAttrs) => {
        return <ResourceBlock key={link.href} attrs={link} />;
      });
      return (
        <div key={k} className="block-container">
          <h1>{k}</h1> {items}
        </div>
      );
    });
    jsx = (
      <div className="resource-wrapper">
        <h1 className="resource-title">Taking Action</h1>
        {final}
      </div>
    );
  }

  return (
    <div className="app-resource">
      <div className="resource-header">
        <div className="resource-header__name">
          <h1>Taking Action</h1>
        </div>
        <div className="resource-header__body">
          <div className="resource">
            <div
              className={`resource__subheading${ctx.darkmode ? "--dark" : ""}`}
            >
              Overview
            </div>
            <div className="resource__content">
              There are many paths you can take to seek justice and advocate for
              change. Below are stories from Mothers of the Movement advocating
              for legislative change, running for office, and creating community
              organizations. Also below are resources for you to turn pain into
              passion and progress. Some examples of taking action are listed
              below:
            </div>
            <div
              className={`resource__subheading${ctx.darkmode ? "--dark" : ""}`}
            >
              Mothers Advocating for Legislative Change
            </div>
            <div className="resource__content">
              <strong>Geneva Reed-Veal</strong>, mother of{" "}
              <strong>Sandra Bland</strong>, is on a mission to carry out her
              daughter's legacy of fighting against social injustice. She has
              appeared in front of congressional leaders at the Congressional
              Caucus on Black Women and Girls at the Library of Congress. In
              2016, she pushed for police reform in Texas. She advocated for the{" "}
              <a
                href="https://capitol.texas.gov/tlodocs/85R/billtext/html/SB01849F.htm"
                target="_blank"
                rel="noreferrer"
                className={`inline-link${ctx.darkmode ? "-dark" : ""}`}
              >
                Sandra Bland Act
              </a>
              , which called for the revision of racial profiling laws, officer
              training, and other accountability measures.
              <br />
              <br />
              <strong>Sequette Clark</strong>, mother of{" "}
              <strong>Stephon Clark</strong>. Along with her family and
              surrounding community, Sequette rallies on the capitol steps every
              year on March 18th to raise awareness of her son's murder.
              <br />
              <br />
              <strong>Tamika Palmer</strong>, mother of{" "}
              <strong>Breonna Taylor</strong>, worked to bring her daughter's
              death to national attention. Because of the tireless advocacy of
              her mother, Taylor's death attracted global attention and created
              the hashtag{" "}
              <a
                href="https://www.aapf.org/sayhername"
                target="_blank"
                rel="noreferrer"
                className={`inline-link${ctx.darkmode ? "-dark" : ""}`}
              >
                #sayhername
              </a>
              . Palmer has also pushed for police reform legislation at the
              local and federal levels. Since then, cities and states have
              adopted laws, named after Taylor, that limit the use of no-knock
              warrants.
              <br />
              <br />
              <strong>Gwen Carr</strong>, mother of <strong>Eric Garner</strong>
              , has earned nation-wide recognition as an activist for the work
              she's done following her son's death. She has advocated for the
              anti-chokehold legislation and the{" "}
              <a
                href="https://www.congress.gov/bill/117th-congress/senate-bill/244#:~:text=Introduced%20in%20Senate%20(02%2F04%2F2021)&text=This%20bill%20modifies%20the%20criminal,including%20a%20law%20enforcement%20officer)."
                target="_blank"
                rel="noreferrer"
                className={`inline-link${ctx.darkmode ? "-dark" : ""}`}
              >
                Eric Garner Excessive Use of Force Prevention Act.
              </a>{" "}
              She was also present as a speaker at the Democratic National
              Convention, along with other Mothers of the Movement.
              <br />
              <br />
              <strong>Lezley McSpadden</strong> has since become an author and
              filmmaker in her journey to find justice for her son,
              <strong> Michael Brown</strong>. She founded{" "}
              <a
                href="https://michaelodbrown.org/"
                target="_blank"
                rel="noreferrer"
                className={`inline-link${ctx.darkmode ? "-dark" : ""}`}
              >
                The Michael Brown Foundation
              </a>{" "}
              and campaigned for the Michael Brown Bill.
              <br />
              <br />
              <strong>Samaria Rice</strong>, mother of{" "}
              <strong>Tamir Rice</strong>, has since founded the{" "}
              <a
                href="https://www.tamirericefoundation.org/ "
                target="_blank"
                rel="noreferrer"
                className={`inline-link${ctx.darkmode ? "-dark" : ""}`}
              >
                Tamir Rice Foundation
              </a>
              , which “invests in the growth and enrichment of all children
              through after-school programs in arts and culture.” She also works
              as an advocate for juvenile rights in Cleveland, Ohio.
            </div>
            <div
              className={`resource__subheading${ctx.darkmode ? "--dark" : ""}`}
            >
              Mothers Running for Office
            </div>
            <div className="resource__content">
              <strong>
                <a
                  href="https://mcbath.house.gov/"
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-link${ctx.darkmode ? "-dark" : ""}`}
                >
                  Representative Lucy McBath
                </a>{" "}
              </strong>
              ran for office after her son, <strong>Jordan Davis</strong>, was
              killed in 2012 by a man who fired 10 shots into his car. She
              decided to run for congress in 2017 after the Stoneman Douglas
              High School in Parkland, Florida. In January of 2019, she took her
              oath of office and “has sought bipartisan solutions to end gun
              violence, uplift small business and our economy, protect and serve
              our nation's veterans, and lower the cost of healthcare and
              prescription drugs.”
            </div>
          </div>
        </div>
        <hr />
      </div>
      {loading ? <ResourceLoading /> : jsx}
    </div>
  );
};

export default ActionResource;
