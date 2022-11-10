import React, { useState } from 'react';
import { Link } from "react-router-dom";

import '../../../css/ItemList.css';



function ItemList() {
  
  const itemList = {
      name: "상품1",
      imgUrl: "./img1.png",
      price: "10,000,000원",
      mainCategory: "과일",
      subCategory: "사과",
      purchase: 100,
      shop: "11번가"
  }
  
  return (
    <div>
      <h4>{itemList.name}</h4><span>에 대한 </span><strong>{itemList.length}</strong><span>개의 특가 상품이 검색되었습니다.</span>

    </div>
  )
}

export default ItemList;