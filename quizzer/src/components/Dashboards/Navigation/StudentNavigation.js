import React from "react";
import ReactDOM from "react-dom";
import logo from '../../../logowhite.svg';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './StudentNavigation.css';


class StudentNavigation extends React.Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false
        };
      }
    
      toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }

     logout = () => {
        console.log("pressed");
        localStorage.clear();
    };
    
    render(){
        return(
            <div className='homepage'>
            {localStorage.getItem("token") ? (
              <div>
                <Link to='/studentsDashboard'> <img class="logo" src={logo} height="35" alt="Logo White" /> </Link>
              </div>
            ) : null}
             <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className='bradius'>
        <DropdownToggle caret></DropdownToggle>
        <DropdownMenu>
          <Link to = '/'> <DropdownItem onClick={this.logout}>Log Out</DropdownItem></Link>
        </DropdownMenu>
      </Dropdown>
          </div>
      )
    }  
   
}

export default StudentNavigation;
