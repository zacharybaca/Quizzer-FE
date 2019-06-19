import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import StudentNavigation from '../Dashboards/Navigation/StudentNavigation';

const AccessCode = props => {
  const [formData, setFormData] = useState({
    access_code: "",
    student_id: localStorage.getItem("id")
  });

  const { access_code } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log("success");

    const res = await axios.post(
      "https://labs13-quizzer.herokuapp.com/api/profile/addstudent",
      formData
    );
    console.log(res);
    // await setFormData({ access_code: "" });
  };

  return (
    <div>
      <StudentNavigation />
      {console.log('I am rendering')}
      <form onSubmit={e => onSubmit(e)}>
        <input
          value={access_code}
          onChange={e => onChange(e)}
          type="text"
          placeholder="enter access code..."
          name="access_code"
        />
        <input type="submit" className="btn btn-primary" value="Submit" />
      </form>
    </div>
  );
};

export default AccessCode;
