import React, { useState, useContext, useEffect } from 'react';
import ComingSoon from '../../../images/coming_soon.gif';
import { Comment, Tooltip, List, Avatar, Form, Button, Input, Rate, Divider } from 'antd';
import moment from 'moment';
import { CommentContext } from '../../../contexts/CommentContext';
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthContext';

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
    const { userData } = useContext(AuthContext)
    const [submitting, setSubmitting] = useState(false)
    const [value, setValue] = useState("")
    const [rating, setRating] = useState(0)

    useEffect(() => {

        const endpoint = `https://tt.delivera.uz/api/news/get-vendor-reviews?targetUserId=${id}`;

        axios({
            method: "post",
            url: endpoint,
            headers: {
                "content-type": "application/json"
            }
        })
            .then(response => {
                console.log(response.data);
                let ratingArray = response.data;
                ratingArray.map((each, i) => {
                    ratingArray[i]['author'] = ratingArray[i]['userId']
                    ratingArray[i]['avatar'] = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                    ratingArray[i]['content'] = <div><Rate value={+ratingArray[i]['mark']} disabled={true} /><p>{ratingArray[i]['message']}</p></div>
                    ratingArray[i]['datetime'] = moment(ratingArray[i]['updatedDate']).fromNow()
                    delete ratingArray[i]['targetUserId'];
                    delete ratingArray[i]['userId'];
                    delete ratingArray[i]['createdDate'];
                    delete ratingArray[i]['updatedDate'];
                })
                setComments(ratingArray);
            })
            .catch(error => {
                if (error.response.status == 401 && userData.session == true) {
                    message.info('Сессия истекла', 2);
                    dispatch({ type: 'SESSION_EXPIRED' })
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

        const endpoint = `https://tt.delivera.uz/api/news/post-vendor-review`;

        axios({
            method: "post",
            data: data,
            url: endpoint,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userData.token}`
            }
        })
            .then(response => {
                setSubmitting(false)
                setValue("")
                setRating(0);

                console.log(response.data)
                setComments([
                    {
                        author: 'John Doe',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        content: <div><Rate value={rating} disabled={true} /><p>{value}</p></div>,
                        datetime: moment().fromNow(),
                    },
                    ...comments,
                ])
            })
            .catch(error => {
                if (error.response.status == 401 && userData.session == true) {
                    message.info('Сессия истекла', 2);
                    dispatch({ type: 'SESSION_EXPIRED' })
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
