import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

function AreaCheck(props) {
    const [Checked, setChecked] = useState([]);

    const handleToggle = (value) => {
        const currentIndex = Checked.indexOf(value);

        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        props.handleFilters(newChecked);
    };
    const renderCheckboxList = () =>
        props.list &&
        props.list.map((value, index) => (
            <React.Fragment key={index}>
                <Checkbox
                    onChange={() => handleToggle(value.key)}
                    checked={Checked.indexOf(value.key) === -1 ? false : true}
                />
                <span>{value.value}</span>
            </React.Fragment>
        ));
    return (
        <Collapse>
            <Panel header="지역 설정" key="1">
                {renderCheckboxList()}
            </Panel>
        </Collapse>
    );
}

export default AreaCheck;
