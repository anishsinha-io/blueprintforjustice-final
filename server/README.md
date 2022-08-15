### Backend Service for Blueprint For Justice

This directory contains the backend service for Blueprint For Justice which is responsible for handling email signups, contact emails, and resource validation.

To build this service by itself you'll need to set up a SQLite database called db.sqlite3 and create a table called links with the following columns. You can install SQLite from any package manager, (brew, ports, apt) etc.

`id` int NOT NULL AUTO_INCREMENT,
`text` text NOT NULL,
`description` text NOT NULL,
`href` varchar(255) NOT NULL,
`space` varchar(100) NOT NULL,
`category` varchar(255) NOT NULL,
`valid` tinyint(1) DEFAULT '1',
PRIMARY KEY (`id`)

For the mail service to work, you'll need to create a SendInBlue account and get an API key. Once you do that, run:
`export SIB_API_KEY=<your key>` and `export BFJ_EMAIL_ADDRESS=<the email address you want contact emails sent to>`

or you could place those inside an environment variable file called `.env` in the root directory of the server.

This backend is built using Python and Flask, with a very modular architecture and good, commented documentation. If anything is missing or wrong, or if you find any errors, feel free to email anishsinha0128@gmail.com and I'll get back to you when I can.
