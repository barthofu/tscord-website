# TSCord Website

> Ever wanted an easy-to-setup front homepage for your discord bot? `TSCord Website` is here for you!

This [Next.js](https://nextjs.org/) full static website is meant to be used with a bot created from the [tscord bot template](https://github.com/barthofu/tscord).

## Usage

1. Click on the **use this template** button
2. Clone your newly created repo
3. Fill the `.env.example` with the API URL and API key of your tscord based bot and then rename it `.env`
4. Fill the `config.json` as you want
5. Make sure your bot is running and that the API is accessible
6. Run `npm run build`

Then you have two options for the deployment:

-   Just run `npm run start` and you will be able to access the website using the port of the next.js server. This is the simpliest way to run the website, and it will enable [ISR](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration) on the website, which permit to keep the advantage of a static website *while* refreshing the data and rebuilding automaticaly individual pages every X time (by default: 12 hours).
But the main downside is the need of a next.js server instance to be running 24/7.

-   The other solution is to run `npm run export`, which will create a full static version of the website with no need of a next.js server instance to run in the background. This command exports the website in the `out` directory, and you'll next have the choice of deploying this directory anywhere you want (e.g: Github Pages, CDN, the `/var/www` folder of your private server, etc).

    In this solution, and as a contrast with the other, the main downside is that you'll have to re-build and re-deploythe website each time your data (list of commands, articles, etc) change. 
    You can still resolve this by automating all of this with a well configured CI/CD ecosystem (e.g: Github Actions, cron jobs on your server or on your bot, etc). 
    It will take you more effort for sure, but will result in the best of the two solutions!

## Screenshots

![](https://i.imgur.com/fpIcsu1.gif)