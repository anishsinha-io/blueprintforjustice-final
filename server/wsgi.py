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

import os
import argparse
from app import create_app, limiter

# initialize app and rate limiter
server = create_app()
limiter.init_app(server)

if __name__ == "__main__":
    # when running in development mode (i.e. something like: python wsgi.py) in the terminal, add --development=true to enable the
    # debugger which is disabled in default. in production, this app runs with gunicorn, so the above doesn't apply. the command to
    # run the app in production is: gunicorn --bind 0.0.0.0:8888 -w 4 wsgi:server in the directory where wsgi.py is a file
    parser = argparse.ArgumentParser(description="setup options")
    parser.add_argument("--development")
    args = parser.parse_args()
    if args.development:
        os.environ["FLASK_ENV"] = "development"
    server.run(port=8888)
