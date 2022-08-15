### Build scripts for Blueprint For Justice

This directory contains build scripts for Blueprint For Justice, the most important of which is the init script. If you are on an Ubuntu instance, run `crontab -e` and at the bottom of the file add the line `@reboot /path/to/init/script` so you can have the server launch everytime the instance is rebooted.
