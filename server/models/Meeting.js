const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//등록시간 타임스탬프찍는 가장 효율적인 방법 생각해보기

const meetingSchema = mongoose.Schema(
    {
        writer: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        title: {
            type: String,
            maxlength: 50,
        },
        description: {
            type: String,
        },
        place: {
            type: String,
        },
        person: {
            type: Number,
            default: 0,
        },
        dt: {
            type: Date,
        },
        part: {
            type: Number,
            default: 0,
        },
        participants: {
            type: Array,
            default: [],
        },
        area: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = { Meeting };

// const Areas = [
//     { key: 1, value: "서울특별시" },
//     { key: 2, value: "부산광역시" },
//     { key: 3, value: "인천광역시" },
//     { key: 4, value: "대구광역시" },
//     { key: 5, value: "광주광역시" },
//     { key: 6, value: "대전광역시" },
//     { key: 7, value: "울산광역시" },
//     { key: 8, value: "세종특별자치시" },
//     { key: 9, value: "경기도" },
//     { key: 10, value: "강원도" },
//     { key: 11, value: "충청북도" },
//     { key: 12, value: "충청남도" },
//     { key: 13, value: "전라북도" },
//     { key: 14, value: "전라남도" },
//     { key: 15, value: "경상북도" },
//     { key: 16, value: "경상남도" },
//     { key: 17, value: "제주특별자치도" },
// ];
// const Parts = [
//     { key: 1, value: "Running" },
//     { key: 2, value: "Hiking" },
//     { key: 3, value: "Cycling" },
//     { key: 4, value: "Trail Running" },
// ];
