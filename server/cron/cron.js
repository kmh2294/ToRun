const mongoose = require("mongoose");
const { Meeting } = require("../models/Meeting");
const cron = require("node-cron");
const moment = require("moment");

cron.schedule("*/30 * * * *", function () {
    console.log("시작");
    updateStatus();
});

let updateStatus = () => {
    Meeting.updateMany(
        {
            status: 0,
            dt: { $lte: moment() },
        },
        {
            status: 1,
        },
        (err, updateInfo) => {
            if (err) console.log(err);
            return;
        }
    );
};
