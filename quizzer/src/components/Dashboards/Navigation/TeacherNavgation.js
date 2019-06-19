import React, { Component } from "react";
import ReactDOM from "react-dom";
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
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
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
              <img class="logo" src={logo} height="35" alt="Logo White" />{" "}
            </Link>
          </div>
        ) : null}
        <Dropdown
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}
          className="bradius"
        >
          <DropdownToggle caret>Dropdown</DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Header</DropdownItem>
            <DropdownItem onClick={this.logout}>Log Out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

export default TeacherNavigation;
