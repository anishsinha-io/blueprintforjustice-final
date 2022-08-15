import requests
from app import get_conn


def ping(href: str) -> bool:
    return requests.get(href).status_code == 200


# limiter.limit("1/minute")(bp1)
def ping_all():
    sql = "SELECT * FROM links"
    conn = get_conn()
    cursor = conn.cursor()
    rows = cursor.execute(sql)
    for row in rows:
        row = dict(row)
        if not ping(row["href"]):
            sql = "UPDATE links SET valid=? WHERE id=?"
            cursor.execute(sql, [False, row["id"]])
            conn.commit()
    return rows


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


def get_valid_links(space: str) -> dict:
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
