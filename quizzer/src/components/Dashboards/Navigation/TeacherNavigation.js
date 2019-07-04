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
      dropdownOpen: false,
      modal: false
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
      <div className="nav-bar">
        {localStorage.getItem("token") ? (
          <div>
            <Link to="/teachersDashboard">
              {" "}
              <img
                className="logo"
                src={logo}
                height="35"
                alt="Logo White"
              />{" "}
            </Link>
          </div>
        ) : null}
        <div>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle className="bradius">
              <h2 className="logo-btn">Profile</h2>
              <DropdownMenu className="menu">
                <DropdownItem className="dropdown" onClick={this.props.access}>
                  Get access code
                </DropdownItem>

                <DropdownItem className="dropdown">
                  {" "}
                  <Link to="/">
                    <div className="click" onClick={this.logout}>
                      Log Out
                    </div>
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </DropdownToggle>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default TeacherNavigation;
