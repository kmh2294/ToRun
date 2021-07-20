import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import "moment/locale/ko";
import MeetCard from "./MeetCard/MeetCard";

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
        return (
            <Col
                lg={6}
                md={8}
                sm={12}
                xs={24}
                key={index}
                style={{ minHeight: "300px" }}
            >
                <MeetCard meet={meet}></MeetCard>
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
