# Template Viber Bot using Ebony Framework

This is a template for a Viber chatbot using the [Ebony Framework](https://github.com/chrispanag/ebony). Start from here and create the best chatbot.
Customize the colors and the persistent menu elements to your desire.
Then add modules with your flows and let your imagination run wild.

## How to start

### A] Clone and config the template

1. Press ``Use this template``

    Give a repository name to much your bot app and press ``Create repository from template``

    **Best Practice: 
    Choose a repository name that you will use acrose all platfroms to reference in this bot**

5. First you have to create a .env file

    Before we can run the dockers we need to config the envirment variables.

    Copy the `example.env` as `.env` and fill the fields.
    
    This .env is not saved in github and should not be saved to github.
    
### B] Deploy Bot to Heroku
You can deploy the docker container in any server. But we use heroku to deploy the bot docker in order to not deal with dev ops when it comes to requests handling performance.

2. First you have to create a Heroku pipeline 

    Go [here](https://dashboard.heroku.com/pipelines/new) and create a new pipeline

3. Create your Heroku Apps

    After creating the pipeline it is time to create a staging and a production app.
    At each section press `Add app`
    and then `Create new app...`
    
    **Best Practice: 
    Choose the production app's name to match the pipeline's name and the staging app's name to also much the pipeline's name followed by "-staging"**

4. Connect with github
   
   Go to your github repo into ```Settings -> Secrets -> Actions```
   Press ```New repository secret```
   This way you can add enviroment variables for the heroku deploy.
   You have to specify the following params 

    * HEROKU_EMAIL
  
    *The email address associated with your Heroku accound*
    * HEROKU_API_KEY
  
    *Heroku API key associated with provided user's email.
    Api Key is available under your Heroku account settings.*
    * HEROKU_MAIN_APP_NAME
    * HEROKU_STAGING_APP_NAME

    *Name of the heroku application to which the build is to be sent.*

5. Heroku environment variables
   As we have moved out from the docker container and into heroku we need to spesify some variables. We can copy the following variables from the .env that we created in step 2 above:

   * VIBER_AUTH_TOKEN
   * WEBHOOK_DOMAIN 
   * MONGODB_URI
    
    Only this variables are needed in order for the bot to run

### C] Deploy

6. `./deploy.dev.sh`

    To deploy in a development environment.

7. `./deploy.sh`

    To deploy in a Production Environment.

8. Heroku

    Deploy to heroku is performed automatically

9. Server
    
    After you have clone the repo in your server you can set your server access keys in the github secret tab.
    This will allow the github action deploy to auto deploy your changies to the server.
    
    Your ssh config virables.
    * USERNAME
    * PASSWORD
    * HOST
  
    * PORT = 22

10. Browse the template and see some kinds of messages you can possibly send.



## App Endpoints

* /bot
The bot app which communicates with viber

* /bot/api
The backend api which communicates with the frontend and handles broadcasts etc

* / 
The Admin Panel
Part of the panel is a strapi app.