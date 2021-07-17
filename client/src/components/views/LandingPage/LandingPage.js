import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import { Areas, Parts } from "../../area_parts";
import moment from "moment";

function LandingPage() {
    const [Meeting, setMeeting] = useState([]);

    useEffect(() => {
        Axios.post("/api/meeting/meetings").then((response) => {
            if (response.data.success) {
                setMeeting(response.data.meetingInfo);
            } else {
                alert("데이터를 불러오는데 실패하였습니다.");
            }
        });
    }, []);
    const renderCards = Meeting.map((meet, index) => {
        console.log(meet);
        return (
            <Col
                lg={6}
                md={8}
                sm={12}
                xs={24}
                key={index}
                style={{ minHeight: "300px" }}
            >
                <Card
                    title={meet.title}
                    bordered={false}
                    style={{ width: 300 }}
                >
                    <p>
                        <span>장소 : </span>
                        <span>{meet.place}</span>
                    </p>
                    <p>
                        <span>일시 : </span>
                        <span>{moment(meet.dt)}</span>
                    </p>
                    <p>
                        <span>설명 : </span>
                    </p>
                    <p>
                        <span>인원제한 : </span>
                        <span></span>
                    </p>
                </Card>
            </Col>
        );
    });

    return (
        <div style={{ width: "75%", margin: "3rem auto" }}>
            <div style={{ textAlign: "center" }}>
                <h2>같이의 가치 - 투게더 런</h2>
            </div>

            <Row gutter={[16, 16]}>{renderCards}</Row>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <button>더보기</button>
            </div>
        </div>
    );
}

export default LandingPage;
