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
    try {
        let limit = req.body.limit ? parseInt(req.body.limit) : 20;
        let skip = req.body.skip ? parseInt(req.body.skip) : 0;
        //meeting collection 에 들어있는 모든 정보를 가져온다
        let term = req.body.searchTerm;

        let findArgs = { status: 0 };
        for (let key in req.body.filters) {
            if (req.body.filters[key].length > 0) {
                findArgs[key] = req.body.filters[key];
            }
        }
        if (term) {
            Meeting.find(findArgs)
                .find({ $text: { $search: term, $diacriticSensitive: true } })
                .populate("writer")
                .skip(skip)
                .limit(limit)
                .exec((err, meetingInfo) => {
                    if (err)
                        return res.status(400).json({ success: false, err });
                    return res.status(200).json({
                        success: true,
                        meetingInfo,
                        postSize: meetingInfo.length,
                    });
                });
        } else {
            Meeting.find(findArgs)
                .populate("writer")
                .skip(skip)
                .limit(limit)
                .exec((err, meetingInfo) => {
                    if (err)
                        return res.status(400).json({ success: false, err });
                    return res.status(200).json({
                        success: true,
                        meetingInfo,
                        postSize: meetingInfo.length,
                    });
                });
        }
    } catch (err) {
        console.log(err);
    }
});

router.get("/meetOne", (req, res) => {
    try {
        Meeting.findOne({ _id: req.query.id })
            .populate("writer")
            .exec((err, meetOne) => {
                if (err) return res.status(400).json({ success: false, err });
                return res.status(200).json({
                    success: true,
                    meetOne,
                });
            });
    } catch (err) {
        console.log(err);
    }
});
router.post("/join", (req, res) => {
    // 받아온 정보들을 디비에 저장한다
    const userId = req.body.userId;
    const id = req.body.id;
    Meeting.findOne({ _id: id }, (err, meetingInfo) => {
        let duplicate = false;
        meetingInfo.participants.forEach((item) => {
            if (item === userId) {
                duplicate = true;
            }
        });
        if (duplicate) {
            res.status(200).json({ success: false, dupl: true });
        } else {
            Meeting.findOneAndUpdate(
                { _id: id },
                {
                    $push: {
                        participants: userId,
                    },
                },
                { new: true },
                (err, meetingInfo) => {
                    if (err) res.status(400).json({ success: false, err });
                    res.status(200).json({ success: true, meetingInfo });
                }
            );
        }
    });
});
router.post("/joinCancel", (req, res) => {
    // 받아온 정보들을 디비에 저장한다
    const userId = req.body.userId;
    const id = req.body.id;
    Meeting.findOne({ _id: id }, (err, meetingInfo) => {
        let duplicate = false;
        meetingInfo.participants.forEach((item) => {
            if (item === userId) {
                duplicate = true;
            }
        });
        if (!duplicate) {
            res.status(200).json({ success: false, dupl: true });
        } else {
            Meeting.findOneAndUpdate(
                { _id: id },
                {
                    $pull: {
                        participants: userId,
                    },
                },
                { new: true },
                (err, meetingInfo) => {
                    if (err) res.status(400).json({ success: false, err });
                    res.status(200).json({ success: true, meetingInfo });
                }
            );
        }
    });
});
router.post("/inserComment", (req, res) => {
    Meeting.findOne({ _id: req.body.id }, (err, meetingInfo) => {
        Meeting.findOneAndUpdate(
            { _id: req.body.id },
            {
                $push: {
                    comment: {
                        createAt: req.body.createAt,
                        commentWriter: req.body.commentWriter,
                        content: req.body.content,
                    },
                },
            },
            { new: true },
            (err, meetingInfo) => {
                if (err) res.status(400).json({ success: false, err });
                res.status(200).json({
                    success: true,
                    comment: meetingInfo.comment,
                });
            }
        );
    });
});

module.exports = router;
