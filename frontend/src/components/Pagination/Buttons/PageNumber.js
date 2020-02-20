import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import { changePage } from "../../../actions/articleActions";


const PageNumber = ({ number, changePage }) => <button onClick={()=>{changePage(number)}}>{number}</button>;

function mapDispatchToProps(dispatch) {
    return {
      changePage: page => dispatch(changePage(page))
    };
  }
  

export default connect(null , mapDispatchToProps)(PageNumber);