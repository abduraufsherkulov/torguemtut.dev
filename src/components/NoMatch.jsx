import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect,
    withRouter,
    useLocation
} from "react-router-dom";
import { Result, Button } from 'antd'

function NoMatch() {
    let location = useLocation();

    return (
        <Result
            status="404"
            title="404"
            subTitle="Извините, страница, которую вы посетили, не существует."
            extra={<Button type="primary" ><Link to="/">Идем домой</Link></Button >}
        />
    );
}
export default withRouter(NoMatch);