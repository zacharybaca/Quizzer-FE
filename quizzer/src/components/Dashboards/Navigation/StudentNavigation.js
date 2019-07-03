import React from "react";
import logo from "../../../logowhite.svg";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import "./StudentNavigation.css";

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

  render() {
    return (
      <div className="nav-bar">
        {localStorage.getItem("token") ? (
          <div>
            <Link to="/studentsDashboard">
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

        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle className="bradius">
          <h2 className="logo-btn">Profile</h2>
            <DropdownMenu className="menu">
              <Link to="/">
                <div className="click" onClick={this.logout}>
                  Log Out
                </div>
              </Link>
            </DropdownMenu>
          </DropdownToggle>
        </Dropdown>
      </div>
    );
  }
}

export default StudentNavigation;
