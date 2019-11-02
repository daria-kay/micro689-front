import React from "react";
import {Switch} from "react-bootstrap";
import {BlackList} from "./BlackList/BlackList";
import {Route} from "react-router-dom";
import Logup from "./Logup/Logup";
import Login from "./Login/Login";

function Main() {
    return (
        <Switch>
            <Route exact path='/' component={BlackList}/>
            <Route path='/login' component={Login}/>
            <Route path='/logup' component={Logup}/>
        </Switch>

    );
}

export default Main;