import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { Areas, Parts } from "../Section/area_parts";
import moment from "moment";

function MeetCard(props) {
    const [Attr, setAttr] = useState({});
    useEffect(() => {
        if (props.meet.part === 1) {
            setAttr({
                style: {
                    background: "linear-gradient(to bottom,#2193b0 ,#6dd5ed)",
                },
                extra: (
                    <div>
                        <img
                            src={`http://localhost:5000/images/running.png`}
                            alt="running"
                            style={{ width: "38px" }}
                        />
                    </div>
                ),
            });
        } else if (props.meet.part === 2) {
            setAttr({
                style: {
                    background: "linear-gradient(to bottom, #ffafbd , #ffc3a0)",
                },
                extra: (
                    <div>
                        <img
                            src={`http://localhost:5000/images/hiking.png`}
                            alt="hiking"
                            style={{ width: "38px" }}
                        />
                    </div>
                ),
            });
        } else if (props.meet.part === 3) {
            setAttr({
                style: {
                    background: "linear-gradient(to bottom, #48b1bf , #06beb6)",
                },
                extra: (
                    <div>
                        <img
                            src={`http://localhost:5000/images/cycling.png`}
                            alt="cycling"
                            style={{ width: "38px" }}
                        />
                    </div>
                ),
            });
        } else if (props.meet.part === 4) {
            setAttr({
                style: {
                    background: "linear-gradient(to bottom,#ba5370 ,#f4e2d8)",
                },
                extra: (
                    <div>
                        <img
                            src={`http://localhost:5000/images/trail.png`}
                            alt="trail"
                            style={{ width: "38px" }}
                        />
                    </div>
                ),
            });
        }
    }, [props.meet.part]);
    const clickHandler = () => {
        props.clickFunction(props.meet);
    };
    return (
        <div onClick={clickHandler}>
            <Card
                bordered={true}
                style={{
                    ...Attr["style"],
                    borderRadius: "10px",
                    width: "100%",
                }}
                title={
                    <span
                        style={{
                            fontWeight: 600,
                            color: "#fff",
                            fontSize: "1.2rem",
                        }}
                    >
                        {props.meet.title}
                    </span>
                }
                headStyle={{ border: 0 }}
                extra={Attr.extra}
                hoverable={true}
                //loading={true}
                //size="small"
            >
                {/* <p>
                    <span>종목 : </span>
                    <span>
                        {Parts.map((v) =>
                            v.key === props.meet.part ? v.value : false
                        )}
                    </span>
                </p> */}
                {/* <p>
                    <span>지역 : </span>
                    <span>
                        {Areas.map((v) =>
                            v.key === props.meet.area ? v.value : false
                        )}
                    </span>
                </p> */}
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
                {/* <p>
                    <span>설명 : {props.meet.description}</span>
                </p>
                <p>
                    <span>인원제한 : {props.meet.person} 명 까지 </span>
                    <span></span>
                </p> */}
            </Card>
        </div>
    );
}

export default MeetCard;
