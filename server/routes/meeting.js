const express = require("express");
const router = express.Router();
const { Meeting } = require("../models/Meeting");

//=================================
//             Meeting
//=================================

router.post("/", (req, res) => {
    // 받아온 정보들을 디비에 저장한다
    const meeting = new Meeting(req.body);

    meeting.save((err) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true });
    });
});

router.post("/meetings", (req, res) => {
    //meeting collection 에 들어있는 모든 정보를 가져온다
    Meeting.find()
        .populate("writer")
        .exec((err, meetingInfo) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, meetingInfo });
        });
});
module.exports = router;
