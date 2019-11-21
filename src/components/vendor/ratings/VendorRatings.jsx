import React, { useState, useContext, useEffect } from 'react';
import ComingSoon from '../../../images/coming_soon.gif';
import { Comment, Tooltip, List, Avatar, Form, Button, Input, Rate, Divider } from 'antd';
import moment from 'moment';
import { CommentContext } from '../../../contexts/CommentContext';
import axios from 'axios';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ rateChange, onChange, onSubmit, submitting, value, rating }) => (
    <div>
        <Form.Item>
            <Rate value={rating} onChange={rateChange} />
        </Form.Item>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
        </Button>
        </Form.Item>
    </div>
);


function VendorRatings({ id }) {
    const { comments, setComments } = useContext(CommentContext);
    const [submitting, setSubmitting] = useState(false)
    const [value, setValue] = useState("")
    const [rating, setRating] = useState(0)

    useEffect(() => {

        const endpoint = `https://ttuz.azurewebsites.net/api/news/get-vendor-reviews?targetUserId=${id}`;

        axios({
            method: "post",
            url: endpoint,
            headers: {
                "content-type": "application/json"
            }
        })
            .then(response => {
                setComments(response.data)
            })
            .catch(error => {
                if (error.response.status == 401) {
                    message.info('Сессия истекла', 2);
                    dispatch({ type: 'SIGN_IN' })
                }
                console.log(error, "error in categories");
            });
    }, [])

    const handleSubmit = () => {
        if (!value || rating == 0) {
            return;
        }

        setSubmitting(true)

        const data = JSON.stringify({
            TargetUserId: id,
            Mark: rating,
            Message: value
        });

        const endpoint = `https://ttuz.azurewebsites.net/api/news/get-vendor-reviews?targetUserId=${id}`;

        axios({
            method: "post",
            data: data,
            url: endpoint,
            headers: {
                "content-type": "application/json"
            }
        })
            .then(response => {
                setSubmitting(false)
                setValue("")
                setRating(0);
                setComments([
                    {
                        author: 'John Doe',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        content: <div><Rate value={rating} disabled={true} /><p>{value}</p></div>,
                        datetime: moment().fromNow(),
                    },
                    ...comments,
                ])
                setComments(response.data)
            })
            .catch(error => {
                if (error.response.status == 401) {
                    message.info('Сессия истекла', 2);
                    dispatch({ type: 'SIGN_IN' })
                }
                console.log(error, "error in categories");
            });
    };
    const handleChange = e => {
        setValue(e.target.value)
    };

    const rateChange = e => {
        console.log(e)
        setRating(e);
    };
    console.log(comments);
    return (
        <div id="messages">
            <div>
                {comments.length > 0 && <CommentList comments={comments} />}
                <Comment
                    avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
                        />
                    }
                    author="whatever"
                    content={
                        <Editor
                            rating={rating}
                            rateChange={rateChange}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
            </div>
        </div>
    )
}

export default VendorRatings
