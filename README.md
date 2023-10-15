# About this small project

Here is some practice of AI technology. Basically it is jsut the call of API, so I feel there is not much to explain. There are two AI Apps now, One is just a chatbot, another one is a Finnish language assisant, user input some Finnish tests, the AI will return the translation of the text, and a detailed breakdown, including the meaning and usage of each word, and the structure of the sentence, and possible grammer explanation. It is very helper for Finnish learners. 

## The building part

I use React + Google functions for the web app, The google functions and other small services like google secrets are mainly for the security reason, I don't want to leak my openai API key. So I made two function calls in Google cloud, and added a security role that only the request from my website is allowed. Thus, my key will not be abused. Of course I also set the monthly usage ceilling quite low just in case.

## Chat bot

Building a chat app interface is funny, I started to think from the perspective of developers instead of a user. Because I met some problems i never thought of. For example, when I send a new message, the page will not scroll down but stay on the top of the conversation. This auto scroll down feature is so natural that I growup with it, so I never thought you have to write a piece of code to acheive it. :) 

User experience is also more important than I thought, sometimes the developers might not realize. When I ask my friend to try it, they said they are not sure if the AI received their message until they got the response. Then I realized a loading animation is actually very important. So I added a simple animation, after user sent the message, loading will be true, after the server sent the response, loading will be false. This simple feature improve user experience a lot.

## Language assistant

This a very simple app, one of my super early practice work. Just sned the request and waiting for the response, then simply format the response and display it. 

Even though now I feel it is very easy, when I built it the first time, I think I still put lots of effort to understand the logic of API call and http request/response. Anyway, that is the meaning of non-stop learning!
