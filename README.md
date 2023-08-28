This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, once the project was cloned, go to the api and client dir and execute npm i in both.

## GPT Key and .env files

its is necessary to create a .env file in the api dir, inside create this properties:

OPENAI_API_KEY="PUT_YOUR_OPENAI_API_KEY

URL_OPENAI= 'https://api.openai.com/v1/chat/completions'

To the correct use you will need to get a OpenIA Key

## Run the app

To run the client you will need to use this command

> npm run dev

# or

> yarn dev

# or

> pnpm dev

and to run the API you will need to run this command

> node server.js

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About the app

This app is a mix between the functionality of a time picker, a ToDo list and chatgpt.
You are able to save in a json file all the things you wanna do later picking a time in a day.
You can ask to chatGPT to read all the things that you have in the list, the chat will read it in chronological order.
Also the agenda it will visible to get once you click in the "Read about my day" button.

## What you cant do

You cant delete a item from the list.
You cant edit a item from the list.
You cant pick another day, only the current day is available.

## technologies

## Front:

Nextjs
Redux
Bootstrap

## Back:

Node js
Express js

## Others:

VsCode
Git
svgrepo
