import React, { useState } from "react";
import { Form, Input, DatePicker, TimePicker, Select, Button } from "antd";

const { TextArea } = Input;
const { Option } = Select;

const Continents = [
    { key: 1, value: "Running" },
    { key: 2, value: "Hiking" },
    { key: 3, value: "Cycling" },
    { key: 4, value: "Trail Running" },
];
function UploadPage() {
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Person, setPerson] = useState("");
    const [Continent, setContinent] = useState(1);
    const [Place, setPlace] = useState("");
    const [DT, setDT] = useState("");
    const [Time, setTime] = useState("");
    const [Date, setDate] = useState("");

    const format = "HH:mm";

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value);
    };
    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value);
    };
    const personChangeHandler = (event) => {
        setPerson(event.currentTarget.value);
    };
    const continentChangeHandler = (event) => {
        setContinent(event.currentTarget.value);
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

    return (
        <div style={{ width: "700px", margin: "2rem auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h1> 모임 생성 </h1>
            </div>
            <Form>
                <br />
                <br />
                <label>제목</label>
                <Input onChange={titleChangeHandler} value={Title} />
                <br />
                <br />
                <label>장소</label>
                <Input onChange={placeChangeHandler} value={Place} />
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
                />
                <br />
                <br />
                <label>인원 제한 (숫자만 입력)</label>
                <Input
                    onChange={personChangeHandler}
                    value={Person}
                    placeholder="각 지역별 코로나 방역수칙에 맞게 인원을 제한해주세요"
                />
                <br />
                <br />
                <label>운동 종목</label>
                <Select onChange={continentChangeHandler} value={Continent}>
                    {Continents.map((item) => (
                        <Option key={item.key} value={item.key}>
                            {item.value}
                        </Option>
                    ))}
                </Select>
                <br />
                <br />
                <Button size="large" type="submit">
                    확인
                </Button>
            </Form>
        </div>
    );
}

export default UploadPage;
