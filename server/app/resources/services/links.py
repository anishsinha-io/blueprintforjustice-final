# Blueprint For Justice
# Copyright (C) 2022 Anish Sinha
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# you should have received a copy of the GNU General Public License
# along with this program.  If not, see http://www.gnu.org/licenses/.
#

import requests
from app import get_conn


# determine validity of a link
def ping(href: str) -> bool:
    return requests.get(href).status_code == 200


# determine validity of all links and update their `valid` attribute in the database
def ping_all():
    sql = "SELECT * FROM links"
    conn = get_conn()
    cursor = conn.cursor()
    rows = cursor.execute(sql).fetchall()
    print("here")
    for row in rows:
        print("within loop")
        row = dict(row)
        if not ping(row["href"]):
            print("reached condition of invalid link")
            sql = "UPDATE links SET valid=? WHERE id=?"
            cursor.execute(sql, [False, row["id"]])
            conn.commit()
        else:
            sql = "UPDATE links SET valid=? WHERE id=?"
            if row["valid"] == False:
                cursor.execute(sql, [True, row["id"]])
                conn.commit()
    return "{msg: successfully refreshed all links}"


# get an array of space categories that will be used as dict keys in get_valid_links
def get_space_categories(space: str) -> list[str]:
    conn = get_conn()
    categories: list[str] = []
    sql = "SELECT DISTINCT category FROM links WHERE space=?"
    cursor = conn.cursor()
    rows = cursor.execute(sql, [space.capitalize()])
    for row in rows:
        row = dict(row)
        categories.append(row["category"])
    return categories


# get all links in a space
def get_space_links(space: str) -> dict:
    conn = get_conn()
    categories: list[str] = get_space_categories(space)
    out: dict = {}
    for category in categories:
        out[category] = []
    cursor = conn.cursor()
    sql = "SELECT text, description, href, category, valid FROM links WHERE space=?"
    rows = cursor.execute(sql, [space.capitalize()])
    for row in rows:
        row = dict(row)
        row_category = row["category"]
        row_valid = row["valid"]
        del row["category"]
        del row["valid"]
        if row_valid:
            out[row_category].append(row)
    for key in out:
        if len(out[key]) == 0:
            del out[key]
    return out


# get all links with no specification
def get_all_links() -> list[dict]:
    conn = get_conn()
    sql = "SELECT * FROM links"
    cursor = conn.cursor()
    rows = cursor.execute(sql)
    out = []
    for row in rows:
        row = dict(row)
        out.append(row)
    return out
