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
 ** along with this program. If not, see http://www.gnu.org/licenses/.
 **/

import React from "react";

export interface QContextProps {
  slideNum: number;
  action: number;
  media: number;
  community: number;
  general: number;
  legal: number;
  healing: number;
}

const QContext = React.createContext<QContextProps>({
  slideNum: 0,
  action: 0,
  media: 0,
  community: 0,
  general: 0,
  legal: 0,
  healing: 0,
});

const getRecommendations = (qctx: QContextProps): string[] => {
  return [];
};

export const optionsList: any = [
  [
    "To what end are you seeking resources?",
    {
      text: "I, or someone I know has been affected by police brutality.",
      category: "legal",
      points: 2,
    },
    {
      text: "My broader community has been affected by police brutality.",
      category: "action",
      points: 1,
    },
    {
      text: "I am seeking more information for learning.",
      category: "general",
      points: 1,
    },
  ],
  [
    "Do you feel you might require legal aid?",
    { text: "Yes", category: "legal", points: 2 },
    { text: "No", category: "legal", points: 0 },
    { text: "I'm not sure", category: "legal", points: 1 },
  ],
  [
    "Will you need to handle ongoing media/press coverage?",
    { text: "Yes, and I'd like to learn more", category: "media", points: 2 },
    {
      text: "No, there isn't any press coverage I need to handle",
      category: "media",
      points: 0,
    },
    {
      text: "I'm not sure",
      category: "media",
      points: 1,
    },
  ],
  [
    "Are you interested in additional resources for research",
    { text: "Yes", category: "general", points: 2 },
    { text: "No", category: "general", points: 0 },
    {
      text: "I'm not sure",
      category: "general",
      points: 1,
    },
  ],
  [
    "<action question>",
    { text: "Yes", category: "action", points: 2 },
    { text: "No", category: "action", points: 0 },
    {
      text: "I'm not sure",
      category: "action",
      points: 1,
    },
  ],
  [
    "<community question>",
    { text: "Yes", category: "community", points: 2 },
    { text: "No", category: "community", points: 0 },
    {
      text: "I'm not sure",
      category: "community",
      points: 1,
    },
  ],
];

export default QContext;
