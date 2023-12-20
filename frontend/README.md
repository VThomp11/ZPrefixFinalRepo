To start app:
-------------------------------------------------
LINES THAT START AND END WITH **** ARE SPECIFIC COMMANDS FOR YOU TO RUN, PLEASE READ THE WHOLE INSTRUCTIONS FIRST SO YOU KNOW WHAT PARTS OF THESE COMMANDS YOU MIGHT NEED TO CHANGE. ANY SECTION THAT MIGHT NEED TO BE CHANGED WITHIN THE COMMAND WILL START AND END WITH A SINGLE *.

*to clone from github, run ****git clone git@github.com:VThomp11/ZPrefixFinalRepo.git *NAME* **** but I am assuming you have gotten atleast that far already*

First thing you should do for setup is check that nothing is running on port 5234, 8080 or 3000 as they will all be needed.

Next, you will have to create your own container and database in order for knex to work properly.
        -To create a container, run:
                
                ****  docker run --rm --name *NEWNAME* -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres****
                
                
        -In the spot where I have *NEWNAME*, you can replace it with any name you want that is not already being used by another container.

        Next, you will run:

                **** docker exec -it *FIRST4OFID* bash
        
        In the spot where I have *FIRST$OFID*, replace it with the first 4 characters in your postgres containers ID.

        -Next, you will run:

                ****psql -U postgres****
        
        Your terminal should now say "postfres=#"

        -Next you will need to create a table named store_table. IT IS VERY IMPORTANT THAT YOU DO NOT CHANGE THIS NAME. You can run:
        
                **** CREATE DATABASE store_table; ****
        
        To double check the database was made, run ****\List;****

        -In a seperate terminal is vscode, cd into backend and run the following commands:
        
                ****npx knex migrate:latest****
                AND
                ****npx knex seed:run****

        After running these codes you should see tables and seeds migrated.

        -While still in the backend, run the codes:

                ****npm i express****
                AND
                ****node app.js**** 
        The terminal should now say "Your application is running on port 8080"

        -Next you want to open a new terminal in vscode, cd into frontend and run:

                ****npm install react-toastify web-vitals****
                ****npm start****
        The terminal will most likely say "Compiled with warnings", as long as the text is not red you should be good to go!



THE APPLICATION:
---------------------------------------------------------------------------------------------------

As a visitor, you are able to see all inventory along with each items relevent information. You will notice if you try to edit, add, or delete and item nothing will change.

If you want to edit, add, or delete an item you must log in first. 

Register with an account and password. If your console says "registration failed", you probably stole my username. As long as you don't make it 'toritest' you most likely won't have an issue. If you want to check if your registration was successfull before logging in, look for the "Registration successful" message in the console.

You are now able to log in. After logging in correctly, you will see a message above letting you know you are logged in as your username (what you are seeing us USER SPECIFIC INFORMATION! wow!). 

You should now be able to edit, add, or delete any item using the fields below the inventory. If you go to localhost:8080/items, you will see that your new item has been added to the list there as well.





I hope you enjoy my little jewlery store! :) 
 If you have any questions or need any help, I am available on slack and I will help explain. 


Please let me pass, thank you! Here is a picture of a cat I copied and pasted, just for good luck:

                           ╱|、
                          (˚ˎ 。7  
                           |、˜〵          
                          じしˍ,)ノ












# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
