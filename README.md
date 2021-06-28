# Questions voting and creation

    ### This application has 3 routes to list all questions, check the question detail, create new question.
    ### In question detail page you can vote for your choice and save.

## Instructions to run the application in development

- navigate to project root folder
- run command _npm i_ which installs all the dependencies
- now run the command _npm run dev_
- It will automatically open the browser, if not you can type the url http://localhost:3000 in your browser.

## Instructions to run the application in production

- navigate to project root folder
- run command _npm i_ which installs all dependencies
- now run _npm run build_ which will build the project and creates a build folder
- now run _npm start_ which uses _serve_ server which will serve the application at http://localhost:5000

## Progressive webapp (Offline support)

- This project is a PWA, and supports network first and cache policy. This means when the website is visited for the first time all the assets will be cached and everytime it serves from the network, if there is no internet then it will serve from the cache whatever it is cached. In none of the cases it will display error page to refresh.
- When new code base is available, we need to change the cache name in service worker file _sw.js_ so the new changes will come in to effect.
- When i was testing this it was little slow in caching or sometimes after refreshing it is caching, probably i might miss something here since i am implementing this for very first time or this is how it works i am not sure.
- The pages and api calls which are visited when online, will only be cached. Otherwise it will crash the application, here is the point to handle this, but i was not able to do. May be if i have more time i can do this. Anyways i have tried different ways to achieve but no luck. The ways which i have tried are as follows
  - Tried to pushMessage using client.pushMessage, but message is not received by the client and it crashed.
  - Tried to return _offline.html_ when requested resource is not found in cache and network. but no luck.
  - Tried to broadcast the message to a channel and tried to listen that channel in client, message is coming but also getting crashed.
- Since this is a PWA, it will also ask you for _Adding it to your Home screen_, which gives the feeling of Native app.

## Technologies

- I have used ReactJS library, Redux, Suspense, lazy, immutable.js, lodash, axios and other eco-system.
- I have used _styled-component (css in js)_ to style the components.
- For icons i have used react-loader-spinner for Loader image, and used material-ui for few icons.

## Testing

- I have written good amount of unit test cases using _Jest_
- I have written end to end test cases using _Cypress_. Since i have deployed on free Heroku account i cannot implement pipelines or pre build policies to run test cases.

## Deployment

- Finally it is deployed at https://questions-voting.herokuapp.com/questions

## Request from my side.

- Unable to implement Infinite scrolling, since the server was not so good in returning the page numbers, which i have already communicated with Priyanka (Recruiting coordinator)
- Let me know if i miss something in implementing.
- Feedback would help me to improve more.
- If something is required to implement, please let me know so that i can work upon and get back to you.

# Thank you
