import React, { useEffect, useState } from "react";
import { Comment, Tooltip, List, Form, Button, Input } from "antd";
import moment from "moment";
import Axios from "axios";

const { TextArea } = Input;

function CommentSection(props) {
    const [Data, setData] = useState([]);
    const [CommentValue, setCommentValue] = useState("");
    const [submitting, setsubmitting] = useState(false);
    useEffect(() => {
        let newdata = [];
        props.detail.comment.map((e) => {
            console.log(e);
            newdata.push({
                author: e.commentWriter,
                content: <p>{e.content}</p>,
                datetime: (
                    <Tooltip
                        title={moment(e.createAt).format("YYYY-MM-DD HH:mm:ss")}
                    >
                        <span>{moment(e.createAt).fromNow()}</span>
                    </Tooltip>
                ),
            });
        });
        setData(newdata);
        return () => {};
    }, [props]);

    const CommentValueHandler = (event) => {
        setCommentValue(event.currentTarget.value);
    };

    const onSubmit = () => {
        if (!CommentValue) {
            return;
        }

        setsubmitting(true);

        let body = {
            commentWriter: props.user.userData.name,
            content: CommentValue,
            createAt: moment(),
            id: props.detail._id,
        };
        Axios.post("/api/meeting/inserComment", body).then((response) => {
            if (response.data.success) {
                setData(
                    response.data.comment.map((v) => {
                        return {
                            author: v.commentWriter,
                            content: <p>{v.content}</p>,
                            datetime: (
                                <Tooltip
                                    title={moment(v.createAt).format(
                                        "YYYY-MM-DD HH:mm:ss"
                                    )}
                                >
                                    <span>{moment(v.createAt).fromNow()}</span>
                                </Tooltip>
                            ),
                        };
                    })
                );
            } else {
                console.error(response.data.err);
            }
        });

        setCommentValue("");
        setsubmitting(false);
    };

    return (
        <div>
            <List
                className="comment-list"
                header={`${Data.length} 개 댓글`}
                itemLayout="horizontal"
                dataSource={Data}
                renderItem={(item) => (
                    <li>
                        <Comment
                            author={item.author}
                            content={item.content}
                            datetime={item.datetime}
                        />
                    </li>
                )}
            />
            <div>
                <Form.Item>
                    <TextArea
                        rows={4}
                        onChange={CommentValueHandler}
                        value={CommentValue}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        htmlType="submit"
                        loading={submitting}
                        onClick={onSubmit}
                        type="primary"
                    >
                        Add Comment
                    </Button>
                </Form.Item>
            </div>
        </div>
    );
}

export default CommentSection;
