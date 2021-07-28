import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import "moment/locale/ko";
import MeetCard from "./MeetCard/MeetCard";
import AreaCheck from "./Section/AreaCheck";
import PartCheck from "./Section/PartCheck";
import SearchFeature from "./Section/SearchFeature";
import { Areas, Parts } from "./Section/area_parts";
import MeetingDetail from "./Section/MeetingDetail";

function LandingPage(props) {
    const [Meeting, setMeeting] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(4);
    const [PostSize, setPostSize] = useState(0);
    const [Filters, setFilters] = useState({
        area: [],
        part: [],
    });
    const [SearchTerm, setSearchTerm] = useState("");
    const [isModalVisible, setisModalVisible] = useState(false);
    const [DetailInfo, setDetailInfo] = useState({});
    useEffect(() => {
        let body = {
            skip: Skip,
            limit: Limit,
        };

        getMeeting(body);
    }, []);

    const getMeeting = (body) => {
        Axios.post("/api/meeting/meetings", body).then((response) => {
            if (response.data.success) {
                if (body.loadMore) {
                    setMeeting([...Meeting, ...response.data.meetingInfo]);
                } else {
                    setMeeting(response.data.meetingInfo);
                }
                setPostSize(response.data.postSize);
            } else {
                alert("데이터를 불러오는데 실패하였습니다.");
            }
        });
    };
    const loadMoreHandler = () => {
        let skip = Skip + Limit;

        let body = {
            skip: skip,
            limit: Limit,
            filters: Filters,
            loadMore: true,
        };
        getMeeting(body);
        setSkip(skip);
    };
    const cardClickFunction = (meet) => {
        setDetailInfo(meet);
        setisModalVisible(true);
    };
    const closeFunction = () => {
        setisModalVisible(false);
    };
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
                <MeetCard
                    meet={meet}
                    clickFunction={(meet) => cardClickFunction(meet)}
                ></MeetCard>
            </Col>
        );
    });

    const showFilteredResults = (filters) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: filters,
        };
        getMeeting(body);
        setSkip(0);
    };

    const handleFilters = (filters, category) => {
        const newFilters = { ...Filters };

        newFilters[category] = filters;

        showFilteredResults(newFilters);
        setFilters(newFilters);
    };

    const updateSearchTerm = (newSearchTerm) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm,
        };
        Axios.post("/api/meeting/meetings", body).then((response) => {
            if (response.data.success) {
                if (body.loadMore) {
                    setMeeting([...Meeting, ...response.data.meetingInfo]);
                } else {
                    setMeeting(response.data.meetingInfo);
                }
                setPostSize(response.data.postSize);
            } else {
                alert("데이터를 불러오는데 실패하였습니다.");
            }
        });
        setSkip(0);
        setSearchTerm(newSearchTerm);
    };
    const updateMeetingInfo = (meet) => {
        let newMeeting = [...Meeting];
        newMeeting.map((v, i) => {
            if (v._id === meet._id) {
                newMeeting[i].participants = meet.participants;
            }
        });
        setMeeting(newMeeting);
    };
    return (
        <div style={{ width: "75%", margin: "3rem auto" }}>
            <div style={{ textAlign: "center" }}>
                <h2>같이의 가치 - 투게더 런</h2>
            </div>

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24} key={1}>
                    <AreaCheck
                        list={Areas}
                        handleFilters={(filters) =>
                            handleFilters(filters, "area")
                        }
                    ></AreaCheck>
                </Col>
                <Col lg={12} xs={24} key={2}>
                    <PartCheck
                        list={Parts}
                        handleFilters={(filters) =>
                            handleFilters(filters, "part")
                        }
                    ></PartCheck>
                </Col>
            </Row>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    margin: "1rem auto",
                }}
            >
                <SearchFeature
                    refreshFunction={updateSearchTerm}
                ></SearchFeature>
            </div>
            <Row gutter={[16, 16]}>{renderCards}</Row>
            <MeetingDetail
                isModalVisible={isModalVisible}
                closeFunction={closeFunction}
                detail={DetailInfo}
                user={props.user}
                updateMeetingInfo={updateMeetingInfo}
            ></MeetingDetail>
            {PostSize >= Limit && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button onClick={loadMoreHandler}>더보기</button>
                </div>
            )}
        </div>
    );
}

export default LandingPage;
