import React, { useState } from 'react';
import { Link } from "react-router-dom";

import '../../../css/CategoryPage.css';

function SubCategoryList(sublist) {
    console.log(Location.state);
    if (Location.state !== undefined) {
        return (
            <div>SubCategoryList</div>
        )
    }
}

export default SubCategoryList;