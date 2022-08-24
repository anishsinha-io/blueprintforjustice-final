#! /bin/bash

timestamp() {
   date +"%Y-%m-%d_%H-%M-%S"
}

sudo apt update
killall node
killall gunicorn
echo "------------------------------------------------------------------------" >> /home/ubuntu/logs/initlog.log
echo "$(timestamp): STARTING INITIALIZATION" >> /home/ubuntu/logs/initlog.log
echo "$(timestamp): EXPORTING NVM VERSION" >> /home/ubuntu/logs/initlog.log
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
echo "$(timestamp): USING NODE VERSION 16.16.0 (LTS)" >> /home/ubuntu/logs/initlog.log
nvm use 16.16.0
cd /home/ubuntu/blueprintforjustice
cd client
echo "$(timestamp): SERVING PRODUCTION-OPTIMIZED CLIENT" >> /home/ubuntu/logs/initlog.log
npx serve -s build &
cd ../server
if test -f "/home/ubuntu/blueprintforjustice/server/db.sqlite3"; then
    echo "$(timestamp): USING EXISTING DATABASE" >> /home/ubuntu/logs/initlog.log
else
    echo "$(timestamp): DATABASE DOES NOT EXIST. RECREATING FROM MYSQL BACKUP" >> /home/ubuntu/logs/initlog.log
    /home/ubuntu/util/mysql2sqlite/mysql2sqlite /home/ubuntu/blueprintforjustice/server/create-links.sql | sqlite /home/ubuntu/blueprintforjustice/service/db.sqlite3
fi
echo "$(timestamp): STARTING gunicorn AND BINDING TO PORT 8888" >> /home/ubuntu/logs/initlog.log
gunicorn --bind 0.0.0.0:8888 -w 4 -t 60 wsgi:server &
echo "$(timestamp): STARTING nginx" > /home/ubuntu/logs/initlog.txt
if [ -e /var/run/nginx.pid ]; then sudo nginx -s reload
else 
        sudo nginx
fi
echo "$(timestamp): APPLICATION INITIALIZATION COMPLETE\n" >> /home/ubuntu/logs/initlog.log
echo "------------------------------------------------------------------------" >> /home/ubuntu/logs/initlog.log