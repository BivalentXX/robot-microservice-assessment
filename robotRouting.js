const https = require("https")
const http = require("http")

const url = 'https://60c8ed887dafc90017ffbd56.mockapi.io/robots'
const PORT = process.env.PORT || 5000
let robotFleet = {}

https.get(url, res => {
  let data = ''
  res.on('data', chunk => {
    data += chunk;
  });
  res.on('end', () => {
    robotFleet = JSON.parse(data);
  })
}).on('error', err => {
  console.log(err.message);
})

const server = http.createServer(async (req, res) => {
  if(req.url === "/api/robots/closest/" && req.method === "POST") {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      body = JSON.parse(body);
      let robotsWithin10 = [];
      let closestRobotDistance = Number.POSITIVE_INFINITY;
      let bestRobot = {};
      for (i=0; i<robotFleet.length; i++) {
        const robotToLoadDistance = Math.sqrt(Math.pow(robotFleet[i].x-body.x, 2) + Math.pow(robotFleet[i].y-body.y, 2));

        if(robotToLoadDistance < closestRobotDistance) {
          closestRobotDistance = robotToLoadDistance;
          bestRobot.distanceToGoal = Math.round(robotToLoadDistance * 10) / 10;
          bestRobot.robotId = robotFleet[i].robotId;
          bestRobot.batteryLevel = robotFleet[i].batteryLevel;
        }
        if(robotToLoadDistance <= 10) {
          robotsWithin10.push(robotFleet[i]);
        }
      }

      res.writeHead(200, { "Content-Type": "application/json" })
      if (robotsWithin10.length === 0) {
        res.write(JSON.stringify(bestRobot));
      } else {
        let largestBatteryLevel = -1;
        for (j=0; j<robotsWithin10.length; j++) {
          if (robotsWithin10[j].batteryLevel > largestBatteryLevel) {
            const robotToLoadDistance = Math.sqrt(Math.pow(robotsWithin10[j].x-body.x, 2) + Math.pow(robotsWithin10[j].y-body.y, 2));

            largestBatteryLevel = robotsWithin10[j].batteryLevel;
            bestRobot.distanceToGoal = Math.round(robotToLoadDistance * 10) / 10;
            bestRobot.robotId = robotsWithin10[j].robotId;
            bestRobot.batteryLevel = robotsWithin10[j].batteryLevel;
          }
        }
        res.write(JSON.stringify(bestRobot));
      }

      res.end();
    });
  }
});

server.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});