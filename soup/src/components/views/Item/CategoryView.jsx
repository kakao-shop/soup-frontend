import React, { useState } from 'react';
import { Link } from "react-router-dom";
import ItemList from './ItemList';
import SubCategoryList from './SubCategoryList';

import Header from '../Header';
import Nav from '../Nav';

import '../../../css/CategoryPage.css';

function CategoryView({match}) {
  console.log(match);
  return (
    <div>
        <Header />
        <Nav />
        {/* <ItemList match} /> */}
        <SubCategoryList />
    </div>
  )
}

export default CategoryView;