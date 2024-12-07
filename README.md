# Getting Started with Bruin Referrals!

This is the Github repository for Bruin Referrals. The project members are 
Arnav Goel, Arjen Singh, Ricardo Rios, and Monica Pal.

## Before running any scripts

Clone the repository in the directory you wish:

'''sh
git clone https://github.com/ArjenS-LA/Bruin-Referrals
cd BruinShare
npm install --save

## Available Scripts

In this project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Also runs the backend server\
on [http://localhost:5000](http://localhost:3000)

Calls will be made between both clients through Axios and Cors.\

The page will reload when you make changes.\
The server will reload when you make changes.\

## Setting up the .env

In the root directory, add a file .env

Add: 

'''sh
ACCESS_TOKEN_SECRET=xxxxxxxxxxxx
REFRESH_TOKEN_SECRET=xxxxxxxxxxxx
DATABASE_URI=xxxxxxxxxxxx
REACT_APP_API_KEY=sxxxxxxxxxxxx

For the ACCESS_TOKEN_SECRET and REFERSH_TOKEN_SECRET, you can generate them by
using the shell command:

'''sh
require('crypto').randomBytes(64).toString('hex')

Run the command and past it into each field individually (Run it twice to
fill the fields) 

For the DATABASE_URI you can generate your own cluster in MongoDB to get a
fresh collection, or contact a developer to get the original collection
with all the users and posts

For the REACT_APP_API_KEY, generate an openai api key and fill the field.

## Key Features

Postings with ability to like, comment, delete
Meaningful Search of Posts based upon entered criteria
User Profile storing profile pic, bio, first name/last name, etc.
OpenAI Chatbot with ability to answer all prompts

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
