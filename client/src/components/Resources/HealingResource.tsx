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

import SettingsCtx from "components/ctx";

import ResourceLoading from "components/Resources/ResourceLoading";
import getBaseUrl from "config";

const HealingResource = () => {
  const ctx = useContext(SettingsCtx);

  const [linkData, setLinkData] = useState<LinkData>({});
  const [loading, setLoading] = useState<boolean>(true);

  const getLinks = async () => {
    const res = await axios.get(`${getBaseUrl()}/resources?resource=healing`);
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
          <h3>{k}</h3> {items}
          <hr />
        </div>
      );
    });
    jsx = (
      <div className="resource-wrapper">
        <h1 className="resource-title">Resource Links</h1>
        {final}
      </div>
    );
  }

  return (
    <div className="app-resource">
      <div className="resource-header">
        <div className="resource-header__name">
          <h3>Healing and Support</h3>
        </div>
        <div className="resource-header__body">
          <div className="resource">
            <div
              className={`resource__subheading${ctx.darkmode ? "--dark" : ""}`}
            >
              Overview
            </div>
            <div className="resource__content">
              Taking care of yourself is crucial to the healing process.
              Remember that you deserve to be seen, heard, and understood. Your
              feelings and emotions are valid. There are many resources and
              organizations available to support you in processing your trauma
              and emotions, as well as for self care, but what does self care
              look like? Self-care looks different for everybody. For some
              people, it looks like therapy, exercising, or journaling. For
              others it could be crying, praying, spending time with friends and
              family, or joining a community organization. Read below to learn
              more about how the Mothers of the Movement created space for
              healing in their communities.
            </div>
            <div
              className={`resource__subheading${ctx.darkmode ? "--dark" : ""}`}
            >
              Stories from Mothers of the Movement
            </div>
            <div className="resource__content">
              <strong>
                The{" "}
                <a
                  href="https://oscargrantfoundation.org/"
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-link${ctx.darkmode ? "-dark" : ""}`}
                >
                  Oscar Grant Foundation
                </a>
              </strong>
              , led by Reverend Wanda Johnson, emphasizes the need for
              destigmatizing mental health within the Black community. Through
              their{" "}
              <a
                href="https://oscargrantfoundation.org/healing-hurting-hearts/"
                className={`inline-link${ctx.darkmode ? "-dark" : ""}`}
                target="_blank"
                rel="noreferrer"
              >
                Healing Hurting Hearts
              </a>{" "}
              program, the organization hosts monthly support sessions for
              mothers whose children died from gun violence. The organization
              also recognizes that while the murder of innocent black men and
              women impacts the families, trauma from the incident affects the
              entire community. They approach this issue by focusing on the
              grieving process. <br />
              <br />
              Mothers on a Mission, founded by Angela Williams in Alabama, holds
              space for mothers, and herself, to find support through regular
              meetings.
              <br />
              <br />
              Stephon's House: Stephon House's family says it's a museum,
              library, resource and recreation center, but it also has its own
              therapy room, staffed with a therapist who gets it. Stephon's
              House is located in Sacramento.
            </div>
          </div>
        </div>
        <hr />
      </div>
      {loading ? <ResourceLoading /> : jsx}
    </div>
  );
};

export default HealingResource;
