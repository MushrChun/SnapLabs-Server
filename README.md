## Prerequisites
Install MongoDB

Install PM2

    npm install pm2 -g

Install nginx

Install gulp-cli
    npm install gulp-cli -g

## Install the dependency
    npm install

## Compile the frontend resource
    gulp

## Init the Mongo (Do it for the first time)
    node script/db.init.js

## Run the application
    pm2 start bin/www

## Stop the application
    pm2 stop bin/www

## Check application status
    pm2 status bin/www

## API documentation
check the [Wiki](https://github.com/tmac2470/SnapLabs-Server/wiki) page

## Quick Start Script
    ./deploy.sh
this script help do the operations mentioned above in one command
