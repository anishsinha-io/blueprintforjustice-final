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

import { useEffect, useState, useContext } from "react";
import axios from "axios";

import { LinkData, LinkAttrs } from "components/Resources/resourcetypes";

import ResourceBlock from "components/Resources/ResourceBlock";
import ResourceLoading from "components/Resources/ResourceLoading";

import SettingsCtx from "components/ctx";
import { shouldRefreshLinks } from "components/Resources/refresh";
import getBaseUrl from "config";

const Law101Resource = () => {
  const ctx = useContext(SettingsCtx);

  const [linkData, setLinkData] = useState<LinkData>({});
  const [loading, setLoading] = useState<boolean>(true);

  const getLinks = async () => {
    const res = await axios.get(`${getBaseUrl()}/resources?resource=legal`);
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
          <h3>Legal Aid</h3>
        </div>
        <div className="resource-header__body">
          <div className="resource">
            <div
              className={`resource__subheading${ctx.darkmode ? "--dark" : ""}`}
            >
              Documentation
            </div>
            <div className="resource__content">
              In pursuing legal action, it is important to document everything
              before beginning to ask questions. For example, a document from
              the FBI could provide insight into how police reports are written
              to best communicate. Documenting the events that have occurred
              allows for faster communication and processing.
            </div>
            <div
              className={`resource__subheading${ctx.darkmode ? "--dark" : ""}`}
            >
              Criminal vs. Civil Cases
            </div>
            <div className="resource__content">
              There are major differences in criminal and civil cases that are
              important to know. According to the Department of Justice,
              criminal cases are investigated and handled separately from civil
              cases, even if they concern the same incident. In a{" "}
              <a className={`inlinelink-no-href${ctx.darkmode ? "-dark" : ""}`}>
                criminal case
              </a>
              , the government brings a case against the accused person. In a{" "}
              <a className={`inlinelink-no-href${ctx.darkmode ? "-dark" : ""}`}>
                civil case
              </a>
              , the case is brought against a governmental authority or law
              enforcement agency. The evidence{" "}
              <a className={`inlinelink-no-href${ctx.darkmode ? "-dark" : ""}`}>
                in a criminal case
              </a>{" "}
              must establish proof "beyond a reasonable doubt,"{" "}
              <a className={`inlinelink-no-href${ctx.darkmode ? "-dark" : ""}`}>
                while in civil cases
              </a>
              , the proof only needs to satisfy the lower standard of a
              "preponderance of the evidence." Finally,{" "}
              <a className={`inlinelink-no-href${ctx.darkmode ? "-dark" : ""}`}>
                in criminal cases
              </a>
              , the Department's goal is to bring justice to an alleged
              wrongdoer by sending them to prison or other consequences. While{" "}
              <a className={`inlinelink-no-href${ctx.darkmode ? "-dark" : ""}`}>
                in civil cases
              </a>
              , the Department's goal is to correct a law enforcement agency's
              policies and practices that have been found to lead to
            </div>
            <div
              className={`resource__subheading${ctx.darkmode ? "--dark" : ""}`}
            >
              Preparing For Retaliation
            </div>
            <div className="resource__content">
              Retaliation from law enforcement is widely feared among families
              pursuing legal action and police accountability. Should you find
              yourself in a situation that involves further police misconduct,
              you can file a complaint through this publication by the{" "}
              <a
                className={`inline-link${ctx.darkmode ? "-dark" : ""}`}
                href="https://www.justice.gov/crt/addressing-police-misconduct-laws-enforced-department-justice"
                target="_blank"
                rel="noreferrer"
              >
                Department of Justice
              </a>{" "}
              (DOJ); this allows for anyone to file a complaint with the
              criminal and civil enforcement.
            </div>
            <div
              className={`resource__subheading${ctx.darkmode ? "--dark" : ""}`}
            >
              Body Camera Footage and the Need For Transparency
            </div>
            <div className="resource__content">
              Each law enforcement agency has different processes and standards
              around body camera footage. Getting access to such records and
              footage is often vital in any case. Whether it is for the
              courtroom or in public, it is important to bring awareness to the
              experience. The National Conference of State Legislatures provides
              a{" "}
              <a
                href="https://www.ncsl.org/research/civil-and-criminal-justice/body-worn-cameras-interactive-graphic.aspx#/"
                target="_blank"
                rel="noreferrer"
                className={`inline-link${ctx.darkmode ? "-dark" : ""}`}
              >
                Body Worn Cameras Interactive Database
              </a>
              . It is advised that body camera footage is requested immediately.
            </div>
          </div>
        </div>
        <hr />
      </div>
      {loading ? <ResourceLoading /> : jsx}
    </div>
  );
};

export default Law101Resource;
