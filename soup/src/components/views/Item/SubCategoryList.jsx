import React, { useState } from 'react';
import { Link } from "react-router-dom";

import '../../../css/CategoryPage.css';

function SubCategoryList(location) {
    
    console.log(location.state);
    if (location.state !== undefined) {
        return (
            <div>SubCategoryList</div>
        )
    }
}

export default SubCategoryList;