/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu, Button } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function RightMenu(props) {
    const user = useSelector((state) => state.user);

    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then((response) => {
            if (response.status === 200) {
                props.history.push("/login");
            } else {
                alert("Log Out Failed");
            }
        });
    };

    if (user.userData && !user.userData.isAuth) {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="mail">
                    <a href="/login">로그인</a>
                </Menu.Item>
                <Menu.Item key="app">
                    <a href="/register">회원가입</a>
                </Menu.Item>
            </Menu>
        );
    } else {
        return (
            <div>
                <Menu mode={props.mode}>
                    <Menu.Item key="upload">
                        <a href="/meeting/upload">
                            <Button size="large" type="primary">
                                함께해요
                            </Button>
                        </a>
                    </Menu.Item>
                    <Menu.Item key="logout">
                        <a onClick={logoutHandler}>Logout</a>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default withRouter(RightMenu);
