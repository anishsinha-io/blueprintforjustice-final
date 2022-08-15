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
echo "$(timestamp): SEARCHING FOR `blueprintforjustice` VIRTUAL ENVIRONMENT"
if { conda env list | grep 'blueprintforjustice'; } >/dev/null 2>&1; then
   	conda activate blueprintforjustice
else
	conda create -n blueprintforjustice
fi
echo "$(timestamp): ACTIVATING VIRTUAL ENVIRONMENT"
conda activate blueprintforjustice
echo "$(timestamp): INSTALLING PACKAGES"
pip install -r requirements.txt
echo "$(timestamp): STARTING gunicorn AND BINDING TO PORT 8888"
gunicorn --bind 0.0.0.0:8888 -w 4 -t 60 wsgi:server &
echo "$(timestamp): STARTING nginx"
if [ -e /var/run/nginx.pid ]; then sudo nginx -s reload
else 
	sudo nginx
fi
echo "$(timestamp): APPLICATION INITIALIZATION COMPLETE"
