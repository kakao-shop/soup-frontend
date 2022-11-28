import React, { useState } from 'react';
import { Link } from "react-router-dom";

import Header from '../Header';
import Nav from '../Nav'

import '../../../css/UserPage.css';
import ConfirmPw from './ConfirmPw';


function UserPage() {
    
	return (
		<div>
			<Header />
			<Nav />
			<ConfirmPw />
			{/* <UserInfo /> */}
		</div>
  	)
}

export default UserPage;