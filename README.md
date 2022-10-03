## Overview
* Simple API with POST endpoint: "https://localhost:5000/api/robots/closest/"
* Accepts a POST request which contains the following details about a load: loadId and x-y coordinates
* Using the x-y coordinates matches the best robot available to move that load
  * Best robot is calculated as the closest robot unless multiple robots are within 10 units
  * If there are multiple robots within 10 units, best robot will be the one with the highest battery level
* Returns the following details about the best robot: robotId, distanceToGoal, and batteryLevel

## How to Run
* Download, then install NodeJS (https://nodejs.org/en/download/)
* Open the project using Visual Studio Code (https://code.visualstudio.com/)
* In terminal type "node robotRouting.js"
* Press "Enter" and you should see a console.log stating "server running on port: 5000"
* The server/API should now be running on "http://localhost:5000"

## How to Test
* Install the Visual Studio Code "REST Client" extension
* While the API is running, open the "test.rest" file
* Press the "Send Request" button above each POST test scenario
* Verify the responses

## How to Improve
* Add typing/null checks. Refactor to Typescript
* Add additional error handling
* Add additional test cases
* Clarify if it is 10 units inclusive of 10 or only up to 10
* Try to think of a more performative/scalable way to calculate distances
* Possibly change the key labeled "distanceToGoal" to "distanceToLoad"
* For the robot objects in the robot fleet data set, sort keys to appear in consistent order
* Utilize the ExpressJS framework for scalability
* Implement additional CRUD functionality i.e. updating locations of robotFleet
* Build out a frontend with a graphical representation of all robot locations etc
* Build out a backend to store all interactions with the API etc