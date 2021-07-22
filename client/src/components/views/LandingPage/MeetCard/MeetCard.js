import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { Areas, Parts } from "../Section/area_parts";
import moment from "moment";

function MeetCard(props) {
    const [Attr, setAttr] = useState({});
    useEffect(() => {
        if (props.meet.part === 1) {
            setAttr({
                bordered: true,
                style: {
                    width: "100%",
                    background:
                        "linear-gradient(to right bottom,#2193b0 ,#6dd5ed)",
                },
                headStyle: { width: "100%", backgroundColor: "#fff" },
            });
        } else if (props.meet.part === 2) {
            setAttr({
                bordered: true,
                style: {
                    width: "100%",
                    background:
                        "linear-gradient(to right bottom, #ffafbd , #ffc3a0)",
                },
                headStyle: { width: "100%", backgroundColor: "#ccc" },
            });
        } else if (props.meet.part === 3) {
            setAttr({
                bordered: true,
                style: {
                    width: "100%",
                    background:
                        "linear-gradient(to right bottom, #06beb6 , #48b1bf)",
                },
                headStyle: { width: "100%", backgroundColor: "#aaa" },
            });
        } else if (props.meet.part === 4) {
            setAttr({
                bordered: true,
                style: {
                    width: "100%",
                    background:
                        "linear-gradient(to right bottom,#ba5370 ,#f4e2d8)",
                },
                headStyle: { width: "100%", backgroundColor: "#aaa" },
            });
        }
    }, []);

    return (
        <Card
            bordered={Attr.bordered}
            style={Attr.style}
            bodyStyle={{ padding: "10px", height: "250px", overflow: "hidden" }}
            //headStyle={Attr.headStyle}
            title={
                <span style={{ color: "#fff", fontSize: "1.2rem" }}>
                    {props.meet.title}
                </span>
            }
            hoverable={true}
            //loading={true}
            //size="small"
        >
            <p>
                <span>종목 : </span>
                <span>
                    {Parts.map((v) =>
                        v.key === props.meet.part ? v.value : false
                    )}
                </span>
            </p>
            <p>
                <span>지역 : </span>
                <span>
                    {Areas.map((v) =>
                        v.key === props.meet.area ? v.value : false
                    )}
                </span>
            </p>
            <p>
                <span>장소 : </span>
                <span>{props.meet.place}</span>
            </p>
            <p>
                <span>일시 : </span>
                <span>
                    {moment(props.meet.dt).format("dddd, MMMM Do , h:mm a")}
                </span>
            </p>
            <p>
                <span>설명 : {props.meet.description}</span>
            </p>
            <p>
                <span>인원제한 : {props.meet.person} 명 까지 </span>
                <span></span>
            </p>
        </Card>
    );
}

export default MeetCard;
