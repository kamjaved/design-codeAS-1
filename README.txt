   //------TO START THE PROJECT---------- 

after unzip the source code you will see a client folder in this folder all forntend code is placed and root folder contain all backend codes 

STEP:1 first create a config.env file in root folder and place the code below

                            NODE_ENV=development
                            PORT=5000

                            JWT_SECRET=my-ultra-secure-and-ultra-lng-secret
                            JWT_EXPIRES_IN=90d
                            JWT_COOKIE_EXPIRES_IN=90

STEP:2 in root folder run      npm i
STEP:3 then go inside client folder and run    npm i
STEP:4 come again in root folder and run    npm run dev to start both front end & backend simultaniously

i have not placed the mongo URI in .env file so that you have some data to view at start of the project


