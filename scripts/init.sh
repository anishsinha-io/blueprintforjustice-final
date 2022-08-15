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

#! /bin/bash

timestamp() {
   date +"%Y-%m-%d_%H-%M-%S"
}

sudo apt update
echo "\n$(timestamp): STARTING INITIALIZATION"
echo "$(timestamp): EXPORTING NVM VERSION"
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
echo "$(timestamp): USING NODE VERSION 16.16.0 (LTS)"
nvm use 16.16.0
cd /home/ubuntu/BlueprintForJustice
cd client
echo "$(timestamp): SERVING PRODUCTION-OPTIMIZED CLIENT"
npx serve -s build &
cd ../server
echo "$(timestamp): INSTALLING PACKAGES"
pip install -r requirements.txt
echo "$(timestamp): VERIFYING SQLITE"
if test -f "/Users/anishsinha/Home/pythonprojects/blueprintforjustice-flask/v3/blueprintforjustice/server/db.sqlite3"; then
    echo "$(timestamp): USING EXISTING DATABASE"
else
    echo "$(timestamp): DATABASE DOES NOT EXIST. RECREATING FROM MYSQL BACKUP"
    /home/ubuntu/util/mysql2sqlite/mysql2sqlite /home/ubuntu/blueprintforjustice/server/create-links.sql | sqlite /home/ubuntu/blueprintforjustice/service/db.sqlite3
fi
echo "$(timestamp): STARTING gunicorn AND BINDING TO PORT 8888"
gunicorn --bind 0.0.0.0:8888 -w 4 -t 60 wsgi:server &
echo "$(timestamp): STARTING nginx"
if [ -e /var/run/nginx.pid ]; then sudo nginx -s reload
else 
	sudo nginx
fi
echo "$(timestamp): APPLICATION INITIALIZATION COMPLETE"
