# Guild wars team builder

Main repo for the  guild wars web based
'team builder' application. 

## Overview 

This application is intended to be a **web based** replacement 
of the legacy guild wars team builder application: https://wiki.guildwars.com/wiki/Team_Builder

This application is open sourced, requires no login, and just requires a browsere to use. 

To see the live version of the app, see here: https://xxdunedainxx.github.io/GuildWarsOneTeamBuilderWeb/site/#/

### Components of the application

1. **Data mining** - A simple python script is used to mine the data required for the 'database' of this application.
This script will pull all the skill related data and spit it out into the `dataMiningResults` directory within this repository. It will also pull all skill related images.
This data is pulled from the GW Wiki: https://wiki.guildwars.com/wiki/Main_Page
2. **Site UI** - The site UI is built in react/vite. All UI related code can be found in the `ui` directory. 
3. **Transpiled Site UI** - You can find the final version of the site's code in the `site` directory. 
This is what is used in the actual github site that hosts the application. 
4. **Web hosting** - The site itself is hosted as a github site, and is a light weight standalone site which does not require any additional web servers. 

## Documentation Links 

* [Development Change Log](docs/CHANGELOG.md)
* [Contribution Guide](docs/CONTRIBUTING.md)
* [Future Feature Ideas & Requests](docs/FEATURES.md)

