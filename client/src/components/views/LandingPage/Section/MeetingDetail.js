import React, { useEffect, useState } from "react";
import { Button, Modal, Collapse } from "antd";

import { Areas, Parts } from "./area_parts";
import moment from "moment";
import Axios from "axios";
import CommentSection from "./CommentSection";

const { Panel } = Collapse;

function MeetingDetail(props) {
    const [IsParticipants, setIsParticipants] = useState(true);
    useEffect(() => {
        if (props.detail.participants) {
            let val = true;
            props.detail.participants.map((v) => {
                if (v === props.user.userData._id) {
                    val = false;
                }
            });
            setIsParticipants(val);
        }
    }, [props.detail.participants]);
    const handleOk = () => {
        if (!props.user.userData._id) {
            return alert("로그인이 필요합니다.");
        }
        let body = {
            userId: props.user.userData._id,
            id: props.detail._id,
        };
        Axios.post("/api/meeting/join", body).then((response) => {
            if (response.data.success) {
                alert("참여하였습니다. 시간약속을 준수해주세요");
                props.updateMeetingInfo(response.data.meetingInfo);
            } else {
                console.log(response.data.err);
                if (response.data.dupl) {
                    alert("이미 참여하였습니다");
                } else {
                    alert("실패하였습니다");
                }
            }
        });
    };

    const joinCancel = () => {
        let body = {
            userId: props.user.userData._id,
            id: props.detail._id,
        };
        Axios.post("/api/meeting/joinCancel", body).then((response) => {
            if (response.data.success) {
                alert("참여가 취소되었습니다");
                props.updateMeetingInfo(response.data.meetingInfo);
            } else {
                console.log(response.data.err);
                if (response.data.dupl) {
                    alert("참여중인 모임이 아닙니다.");
                } else {
                    alert("실패하였습니다");
                }
            }
        });
    };
    const handleCancel = () => {
        props.closeFunction();
    };
    return (
        <Modal
            title={props.detail.title}
            visible={props.isModalVisible}
            onOk={IsParticipants ? handleOk : joinCancel}
            onCancel={handleCancel}
            okText={IsParticipants ? "참여하기" : "참여취소"}
            //footer={<Button onClick={joinCancel}>참여취소</Button>}
        >
            <p>
                <span>종목 : </span>
                <span>
                    {Parts.map((v) =>
                        v.key === props.detail.part ? v.value : false
                    )}
                </span>
            </p>
            <p>
                <span>지역 : </span>
                <span>
                    {Areas.map((v) =>
                        v.key === props.detail.area ? v.value : false
                    )}
                </span>
            </p>
            <p>
                <span>장소 : </span>
                <span>{props.detail.place}</span>
            </p>
            <p>
                <span>일시 : </span>
                <span>
                    {moment(props.detail.dt).format("dddd, MMMM Do , h:mm a")}
                </span>
            </p>
            <p>
                <span>설명 : {props.detail.description}</span>
            </p>
            <p>
                <span>인원제한 : {props.detail.person} 명 까지 </span>
                <span style={{ color: "red" }}>
                    (현재
                    {props.detail.participants &&
                        props.detail.participants.length}{" "}
                    명)
                </span>
                <span></span>
            </p>
            <div>
                <Collapse>
                    <Panel header="댓글" key="1">
                        <CommentSection
                            user={props.user}
                            detail={props.detail}
                        ></CommentSection>
                    </Panel>
                </Collapse>
            </div>
        </Modal>
    );
}

export default MeetingDetail;
