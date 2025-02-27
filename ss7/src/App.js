import './App.css';
import React from 'react';
import store from "./redux/store";
import UserList from "./component/UserList";
import {Provider} from 'react-redux';

function App() {
    return (
        <Provider store={store}>
            <UserList/>
        </Provider>
    );
}

export default App;
