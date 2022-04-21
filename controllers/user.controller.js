const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Location } = require("../models/location.scheme");
const { User } = require("../models/user.scheme");

// ray casting algorithm to determine user's location 
// is within the specified range(radius) of the location 
function ray_casting(point, polygon) {
  var n = polygon.length,
    is_in = false,
    x = point[0],
    y = point[1],
    x1,
    x2,
    y1,
    y2;

  for (var i = 0; i < n - 1; ++i) {
    x1 = polygon[i][0];
    x2 = polygon[i + 1][0];
    y1 = polygon[i][1];
    y2 = polygon[i + 1][1];

    if (y < y1 != y < y2 && x < ((x2 - x1) * (y - y1)) / (y2 - y1) + x1) {
      is_in = !is_in;    
    }
  }
  return is_in;
}

const userController = {
  clockIn: async (req, res) => {
    const payload = jwt.verify(req.cookies.token, process.env.JWTPRIVATEKEY);
    const companyId = payload.id
    const currentTime = new Date();

    // get user position from the client
    let userCurrentPosition = req.body.userPosition;
    let userEmail = req.body.email;

    await Location.where({ locationId: new mongoose.Types.ObjectId(companyId) }).find(
      (err, locationId) => {
        let location = locationId[0].organizationLocation;
        let companyTime = locationId[0].clockInTime;
        let companyId = locationId[0].companyId;

        let ray = ray_casting(userCurrentPosition, location);

        // very messy code that gets and converts current time to string
        var currentTimeHours = String(currentTime.getHours());
        var currentTimeMinutes = String(currentTime.getMinutes());
        var currentTimeConsolidated =
          currentTimeHours + ":" + currentTimeMinutes + ":00";
        console.log(currentTimeConsolidated);

        // get user from database by email address
        const filter = { email: userEmail };

        // update user status
        const positiveUpdate = {
          status: {
            clockedIn: true,
            onTime: true,
            clockInTime: String,
          },
        };

        const negativeUpdate = {
          status: {
            clockedIn: false,
            onTime: false,
            clockInTime: String,
          },
        };

        // check if user is on time
        let regex = new RegExp(":", "g"),
        userCurrentTime = currentTimeConsolidated;

        if (
          parseInt(companyTime.replace(regex, ""), 10) <
          parseInt(userCurrentTime.replace(regex, ""), 10)
        ) {
          // console.log("user is late");
          positiveUpdate.status.clockInTime = userCurrentTime;
          positiveUpdate.status.onTime = false;

          negativeUpdate.status.clockInTime = userCurrentTime;
        } else {
          // console.log("user is early");
          onTime = true;
          positiveUpdate.status.clockInTime = userCurrentTime;
          positiveUpdate.status.onTime = onTime;

          negativeUpdate.status.clockInTime = userCurrentTime;
        }

         // check if the user position is in range of the officePosition
        let clockedIn = false;
        if (ray === true) {
          // clockIn the user
          clockedIn = true;
          // update user clock in status
          User.findOneAndUpdate(
            filter,
            positiveUpdate,
            { new: true },
            (err, data) => {
              if (err) {
                console.log(err);
              } else {
                res.send(`user clocked in ${data}`);
              }

              // let doc = User.findOne(filter);
            }
          );
        } else {
          User.findOneAndUpdate(
            filter,
            negativeUpdate,
            { new: true },
            (err, data) => {
              if (err) {
                console.log(err);
              } else {
                res.send(`you are not within range ${data}`)
              }
            }
          );
        }
      }
    );
  },

  analytics: async (req, res) =>{

  },

  requestBreak: async (req, res) =>{

    // break limit is 3
    let breakLimit = 0

    // form that user will fill to request a break 

      
}
};

module.exports = userController;
