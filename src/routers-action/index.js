import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import RouteList from "../RouteMap";


class index extends Component {

    showContent = () => {
        console.log('aaaaa')
        // var result = null;
        // console.log(RouteList)
        // if (RouteList.length > 0) {
        //     result = RouteList.map((route, index) => {
        //         console.log(route.path)
        //         return (
        //             <Route key={index} path={route.path} exact={route.exact} component={route.main} />
        //         )
        //     });
        // }
        // return result
    }

    render() {
        return (
            <Switch>
                {this.showContent}

            </Switch>
            // <div>

            //     {/* <Switch>
            //         <Route exact path="/">
            //             <Dashboard />
            //         </Route>
            //         <Route path="/project">
            //             <Project />
            //         </Route>
            //         <Route path="/create-position">
            //             <CreatePosition />
            //         </Route>
            //         <Route path="/projectdetail">
            //             <Projectdetail />
            //         </Route>
            //         <Route path="/create-project">
            //             <CreateProject />
            //         </Route>
            //         <Route path="/suggested-candidate">
            //             <SuggestCandidate />
            //         </Route>
            //     </Switch> */}

            // </div>

        );
    }
}

export default index;