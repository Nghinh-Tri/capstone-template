import './App.css';
import React, { Component } from 'react';
import SideBar1 from './assets/img/sidebar1.jpg'
import NavBar from './components/NavBar';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div class="main-panel">
          <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
            <div class="container-fluid">
              <div class="navbar-wrapper">
                <a class="navbar-brand" href="javascript:;">Dashboard</a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default App;