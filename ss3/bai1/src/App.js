import logo from './logo.svg';
import './App.css';
import React from 'react';
import Student from "./component/Student";

function App() {
  return (
      <div className="App">
        <h1>Quản lý sinh viên</h1>
        <Student/>
      </div>
  );
}

export default App;
