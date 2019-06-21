import React, { Component } from "react";
import logo from "../../../logowhite.svg";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "./TeacherNavigation.css";

class TeacherNavigation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  logout = () => {
    console.log("pressed");
    localStorage.clear();
  };
  render() {
    return (
      <div className="homepage">
        {localStorage.getItem("token") ? (
          <div>
            <Link to="/teachersDashboard">
              {" "}
              <img
                className="logo moved"
                src={logo}
                height="35"
                alt="Logo White"
              />{" "}
            </Link>
          </div>
        ) : null}

        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle className="bradius">
            <DropdownMenu className="menu">
              <Link to = '/'> 
                <div className="click" onClick={this.logout}>Log Out</div> 
              </Link>
              <Link className="click" to = '/step1'>Billing</Link>
            </DropdownMenu>
          </DropdownToggle>
        </Dropdown>
      </div>
    );
  }
}

export default TeacherNavigation;
