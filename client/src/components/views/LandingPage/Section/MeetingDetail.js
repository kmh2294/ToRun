import React, { useState } from "react";
import { Modal } from "antd";

import { Areas, Parts } from "./area_parts";
import moment from "moment";

function MeetingDetail(props) {
    const handleOk = () => {
        props.closeFunction();
    };

    const handleCancel = () => {
        props.closeFunction();
    };
    return (
        <Modal
            title={props.detail.title}
            visible={props.isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
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
                <span></span>
            </p>
        </Modal>
    );
}

export default MeetingDetail;
