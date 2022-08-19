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
import Slide from "components/Questionnaire/Slide";

import { setPromptQuestionnaire, getPromptQuestionnaire } from "components/ctx";
import { optionsList } from "components/Questionnaire/qctx";

const Questionnaire = () => {
  useEffect(() => window.scrollTo(0, 0), []);
  const navigate = useNavigate();
  const ctx = useContext(SettingsCtx);
  const [slide, setSlide] = useState<number>(0);
  const [checked, setChecked] = useState<boolean[]>([false, false, false]);
  const [done, setDone] = useState<boolean>(false);
  const [disabledOthers, setDisabledOthers] = useState<boolean>(false);
  const [scores, setScores] = useState<{
    legal: any;
    healing: any;
    action: any;
    community: any;
    media: any;
    general: any;
  }>({
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
  };
  const handlePrev = () => {
    setSlide(() => slide - 1);
  };
  return (
    <div className="app-questionnaire">
      {!done && (
        <fieldset className="questionnaire-wrapper">
          <legend>
            <h2>Question {slide + 1 ?? "--"}</h2>
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
                  [optionsList[slide][2].category]:
                    scores[
                      `${optionsList[slide][2].category}` as
                        | "legal"
                        | "healing"
                        | "media"
                        | "general"
                        | "action"
                        | "community"
                    ] + optionsList[slide][2].points,
                }));
                console.log(scores);
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
                    scores[
                      `${optionsList[slide][2].category}` as
                        | "legal"
                        | "healing"
                        | "media"
                        | "general"
                        | "action"
                        | "community"
                    ] + optionsList[slide][2].points,
                }));
              }}
            />
            <label htmlFor="option2">
              {optionsList[slide][2].text ?? "--"}
            </label>
          </div>
          <div className={`option-checkbox ${ctx.darkmode ? "dark" : ""}`}>
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
                  [optionsList[slide][2].category]:
                    scores[
                      `${optionsList[slide][2].category}` as
                        | "legal"
                        | "healing"
                        | "media"
                        | "general"
                        | "action"
                        | "community"
                    ] + optionsList[slide][2].points,
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
      <Button
        className="btn btn-questionnaire questionnaire-exit"
        text="exit"
        onClick={handleExit}
      ></Button>
    </div>
  );
};

export default Questionnaire;
