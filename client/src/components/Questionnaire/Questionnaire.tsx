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

import SettingsCtx from "components/ctx";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "components/Reusables/Button";

import { setPromptQuestionnaire, getPromptQuestionnaire } from "components/ctx";
import { optionsList, getRecommendations } from "components/Questionnaire/qctx";
import BreonnaTaylor from "assets/breonna-taylor-img-asset.jpeg";
import GeorgeFloyd from "assets/george-floyd-img-asset.png";

import CommunityConnections from "assets/resource-images/community-connections.png";
import TakingAction from "assets/resource-images/taking-action.png";
import LegalAid from "assets/resource-images/legal-aid.png";
import GeneralResources from "assets/resource-images/general-resources.png";

import { ReactComponent as HealingIcon } from "assets/resource-icons/healing.svg";
import { ReactComponent as CommunityConnectionsIcon } from "assets/resource-icons/community-connections.svg";
import { ReactComponent as TakingActionIcon } from "assets/resource-icons/taking-action.svg";
import { ReactComponent as LegalIcon } from "assets/resource-icons/legal.svg";
import { ReactComponent as MediaIcon } from "assets/resource-icons/media.svg";
import { ReactComponent as GeneralIcon } from "assets/resource-icons/general.svg";

import { ReactComponent as MainLogoDark } from "assets/svg/blackmothersfilm-logo-dark.svg";

import Card from "components/Reusables/Card";

const Questionnaire = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  const navigate = useNavigate();
  const ctx = useContext(SettingsCtx);
  const [slide, setSlide] = useState<number>(0);
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);
  const [done, setDone] = useState<boolean>(false);
  const [topRecommendations, setTopRecommendations] = useState<any>([]);
  const [disabledOthers, setDisabledOthers] = useState<boolean>(false);
  const [scores, setScores] = useState<any>({
    legal: 0,
    healing: 0,
    action: 0,
    community: 0,
    media: 0,
    general: 0,
  });
  const handleExit = () => {
    setPromptQuestionnaire(false);
    ctx.setPromptQuestionnaire(getPromptQuestionnaire());
    navigate("/");
  };

  const handleNext = () => {
    if (slide === 5) setDone(() => true);
    setSlide(() => slide + 1);
    setChecked(() => [false, false, false]);
    setDisabledOthers(false);
    setTopRecommendations(getRecommendations(scores));
  };
  const cards: any = {
    healing: (
      <Card
        key="healing"
        label="Healing and Support"
        imgSrc={BreonnaTaylor}
        imgAlt="healing and support card"
        icon={MainLogoDark}
        title="Healing and Support"
        link="/healing-and-support"
        cover={HealingIcon}
        size="md"
      />
    ),
    community: (
      <Card
        key="community"
        label="Community Connections"
        imgSrc={CommunityConnections}
        imgAlt="community connections card"
        icon={MainLogoDark}
        title="Community Connections"
        link="/community-connections"
        cover={CommunityConnectionsIcon}
        size="md"
      />
    ),
    action: (
      <Card
        key="action"
        label="Taking Action"
        imgSrc={TakingAction}
        imgAlt="taking action card"
        icon={MainLogoDark}
        title="Taking Action"
        link="/taking-action"
        cover={TakingActionIcon}
        size="md"
      />
    ),
    legal: (
      <Card
        key="legal"
        label="Legal Aid"
        imgSrc={LegalAid}
        imgAlt="legal aid card"
        icon={MainLogoDark}
        title="Legal Aid"
        link="/legal-aid"
        cover={LegalIcon}
        size="md"
      />
    ),
    media: (
      <Card
        key="media"
        label="Media Preparedness"
        imgSrc={GeorgeFloyd}
        imgAlt="media preparedness card"
        icon={MainLogoDark}
        title="Media Preparedness"
        link="/media-preparedness"
        cover={MediaIcon}
        size="md"
      />
    ),
    general: (
      <Card
        key="general"
        label="General Resources"
        imgSrc={GeneralResources}
        imgAlt="general resources card"
        icon={MainLogoDark}
        title="General Resources"
        link="/general"
        cover={GeneralIcon}
        size="md"
      />
    ),
  };

  const cardsHtml = topRecommendations.map((rec: any, i: number) => {
    if (i < 3) return cards[`${rec[0]}`];
  });

  console.log(cardsHtml);
  return (
    <div className="app-questionnaire">
      {!done && (
        <fieldset className="questionnaire-wrapper">
          <legend>
            <h2>Question {slide + 1 ?? "--"}/6</h2>
          </legend>
          <div className="questionnaire-wrapper__question">
            <p>{optionsList[slide][0]}</p>
          </div>
          <div className={`option-checkbox ${ctx.darkmode ? "dark" : ""}`}>
            <input
              type="checkbox"
              id="option1"
              name="interest"
              value="option1"
              checked={checked[0]}
              disabled={disabledOthers}
              onChange={() => {
                setChecked(() => [!checked[0], checked[1], checked[2]]);
                setDisabledOthers(true);
                setScores(() => ({
                  ...scores,
                  [optionsList[slide][1].category]:
                    scores[`${optionsList[slide][1].category}`] +
                    optionsList[slide][1].points,
                }));
              }}
            />
            <label htmlFor="option1">
              {optionsList[slide][1].text ?? "--"}
            </label>
          </div>
          <div className={`option-checkbox ${ctx.darkmode ? "dark" : ""}`}>
            <input
              type="checkbox"
              id="option2"
              name="interest"
              value="option2"
              checked={checked[1]}
              disabled={disabledOthers}
              onChange={() => {
                setChecked(() => [checked[0], !checked[1], checked[2]]);
                setDisabledOthers(true);
                setScores(() => ({
                  ...scores,
                  [optionsList[slide][2].category]:
                    scores[`${optionsList[slide][2].category}`] +
                    optionsList[slide][2].points,
                }));
              }}
            />
            <label htmlFor="option2">
              {optionsList[slide][2].text ?? "--"}
            </label>
          </div>
          <div
            className={`option-checkbox ${ctx.darkmode ? "dark" : ""} ${
              disabledOthers && "option-checkbox--disabled"
            }`}
          >
            <input
              type="checkbox"
              id="option3"
              name="interest"
              value="option3"
              checked={checked[2]}
              disabled={disabledOthers}
              onChange={() => {
                setChecked(() => [checked[0], checked[1], !checked[2]]);
                setDisabledOthers(true);
                setScores(() => ({
                  ...scores,
                  [optionsList[slide][3].category]:
                    scores[`${optionsList[slide][3].category}`] +
                    optionsList[slide][3].points,
                }));
              }}
            />
            <label htmlFor="option3">
              {optionsList[slide][3].text ?? "--"}
            </label>
          </div>
          <Button
            className="btn btn-questionnaire questionnaire-next"
            text="next"
            onClick={handleNext}
          />
        </fieldset>
      )}
      {done && (
        <div className="top-recommendations">
          <div className="top-recommendations__title">
            Here are some resources you might find helpful.
          </div>
          {cardsHtml}
        </div>
      )}
      {!done && (
        <Button
          className="btn btn-questionnaire questionnaire-exit"
          text="exit"
          onClick={handleExit}
        ></Button>
      )}
    </div>
  );
};

export default Questionnaire;
