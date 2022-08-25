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

import { useContext } from "react";

import HeadingImage from "assets/blackmothersloveandresist.png";

import SettingsCtx from "components/ctx";

const Heading = () => {
  const ctx = useContext(SettingsCtx);
  return (
    <>
      <section className="app-heading">
        <div className={`app-heading__text ${ctx.darkmode ? "" : "darkmode"}`}>
          Blueprint for Justice is a resource dedicated to supporting victims of
          policy brutality and their affected communities, built around the
          learnings and strategies from the Mothers of the Movement.
        </div>
        <img
          className="app-heading__img"
          src={HeadingImage}
          alt="black mothers heading"
        />
      </section>
    </>
  );
};

export default Heading;
