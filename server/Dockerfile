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

FROM python:3.10-alpine
WORKDIR /usr/app
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .
CMD ["gunicorn", "--bind", "0.0.0.0:8888", "-w", "4","-t", "60", "wsgi:server"]