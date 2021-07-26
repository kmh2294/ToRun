import React, { useState } from "react";
import {
    Form,
    Input,
    DatePicker,
    TimePicker,
    Select,
    Button,
    InputNumber,
} from "antd";
import Axios from "axios";
import moment from "moment";

import { Areas, Parts } from "../LandingPage/Section/area_parts";

const { TextArea } = Input;
const { Option } = Select;

function UploadPage(props) {
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Person, setPerson] = useState(null);
    const [Part, setPart] = useState(null);
    const [Place, setPlace] = useState("");
    const [DT, setDT] = useState("");
    const [Time, setTime] = useState("");
    const [Date, setDate] = useState("");
    const [Area, setArea] = useState(null);

    const format = "HH:mm";

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value);
    };
    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value);
    };
    const personChangeHandler = (event) => {
        setPerson(event);
    };
    const partChangeHandler = (event) => {
        setPart(event);
    };
    const areaChangeHandler = (event) => {
        setArea(event);
    };
    const placeChangeHandler = (event) => {
        setPlace(event.currentTarget.value);
    };
    const dateHandler = (date, dateString) => {
        setDate(dateString);
        dtHandler(dateString, "");
    };
    const timeHandler = (time, timeString) => {
        setTime(timeString);

        dtHandler("", timeString);
    };
    const dtHandler = (date, time) => {
        if (date) {
            setDT(date + " " + Time);
        }
        if (time) {
            setDT(Date + " " + time);
        }
    };
    const submitHandler = (event) => {
        event.preventDefault();
        if (
            !Title ||
            !Description ||
            !Place ||
            !DT ||
            !Person ||
            !Part ||
            !Area
        ) {
            return alert("모든 칸을 채워주시기 바랍니다");
        }
        //서버에 채운값들을 리퀘스트로 보낸다
        const body = {
            //로그인된 사람의 아이디값을 넣어준다
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            dt: moment(DT),
            person: Person,
            place: Place,
            part: Part,
            area: Area,
            participants: props.user.userData._id,
        };
        Axios.post("/api/meeting", body).then((response) => {
            if (response.data.success) {
                alert("업로드에 성공하였습니다 즐거운 운동 되시기바랍니다.");
                props.history.push("/");
            } else {
                alert("업로드 실패하였습니다.");
            }
        });
    };

    return (
        <div style={{ width: "700px", margin: "2rem auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h1> 모임 생성 </h1>
            </div>
            <Form onSubmit={submitHandler}>
                <br />
                <br />
                <label>제목</label>
                <Input onChange={titleChangeHandler} value={Title} />
                <br />
                <br />
                <label>장소</label>
                <Select onChange={areaChangeHandler} value={Area}>
                    {Areas.map((item) => (
                        <Option key={item.key} value={item.key}>
                            {item.value}
                        </Option>
                    ))}
                </Select>
                <Input
                    onChange={placeChangeHandler}
                    value={Place}
                    placeholder="상세 모임 장소를 입력해주세요"
                />
                <br />
                <br />
                <label>시간</label>
                <label style={{ marginLeft: "20px" }}>{DT}</label>
                <br />
                <DatePicker onChange={dateHandler} />
                <TimePicker
                    onChange={timeHandler}
                    format={format}
                    minuteStep={10}
                />
                <br />
                <br />
                <label>상세 설명</label>
                <TextArea
                    onChange={descriptionChangeHandler}
                    value={Description}
                    rows={4}
                    placeholder=" 운동거리
                    예상 페이스
                    준비물
                    주차장소 등등 상세내역을 안내한다면 참가확률이 올라가요 "
                />
                <br />
                <br />
                <label>인원 제한 (숫자만 입력)</label>
                <br />
                <label style={{ color: "red" }}>
                    각 지역별 코로나 방역수칙에 맞게 인원을 제한해주세요
                </label>
                <InputNumber
                    style={{ width: 200, display: "block" }}
                    defaultValue={1}
                    min={0}
                    max={20}
                    onChange={personChangeHandler}
                    value={Person}
                />
                <br />
                <label>운동 종목</label>
                <Select onChange={partChangeHandler} value={Part}>
                    {Parts.map((item) => (
                        <Option key={item.key} value={item.key}>
                            {item.value}
                        </Option>
                    ))}
                </Select>
                <br />
                <br />
                <Button size="large" type="primary" htmlType="submit">
                    확인
                </Button>
            </Form>
        </div>
    );
}

export default UploadPage;
