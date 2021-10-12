# Emarsys anagram finder CLI application (code chellenge application)
This is a code challenge from Emarsys team 

##Solution specifications
1) Solution contains 2 ways of realisation. By default I use faster way that group the incomming array of words. Second way is a straight loop with
a small modification (I split the array to parts and use a Promise.all to make it more safe and performant)
2) To configure the application please use file `config.json`. In this file you can change the way (true or false) and the name of file that you want to use
3) To run the application please follow instruction below:
  - do `git clone` into your folder
  - do `npm i` in the project folder
  - use `npm run dev` for the development or `npm run build` for the production
  
please note that it is a CLI application so I do not use any obfuscation or minification tools (we do not have a browser to care about it)

Find the initial task below and have fun =)

## Rules
* Use Javascript or Typescript when solving the problem.
* Use the provided GitHub repository to submit your solution.
* Create a Pull Request when your solution is ready and send a link to it via E-mail.
* You have 3 days to submit your solution.

## Problem
The task is to write a CLI program which finds all anagrams of the user's input word in a
dictionary.
1. The dictionary is a plain text file (wordlist.txt) which contains one word per line.
2. The program should handle anagram-requests as fast as possible preferably in constant time.
3. The program should ask for the next user input after printing the previous result.
4. Write a "production ready" code which you'd proudly push to master, preferably with tests.
