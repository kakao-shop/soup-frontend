import React, { useState } from 'react';
import { Link } from "react-router-dom";

import '../../../css/ItemList.css';



function ItemList(props) {
  const itemList = [
    {
      name: "상품1",
      imgUrl: "./img1.png",
      price: "10,000,000원",
      mainCategory: "과일",
      subCategory: "사과",
      purchase: 100,
      shop: "11번가"
    },
    {
      name: "상품1",
      imgUrl: "./img1.png",
      price: "10,000,000원",
      mainCategory: "과일",
      subCategory: "사과",
      purchase: 100,
      shop: "11번가"
    }
  ]
  
  return (
    <div className="ItemList">
      <div className="msg">
        <h3>{props.data.main}</h3><span>에 대한 </span><strong>{itemList.length}</strong><span>개의 특가 상품이 검색되었습니다.</span>
      </div>
      <div className="itemList">
        {itemList.map((item, index) => (
          <div className="list-item" key={`상품목록${index+1}`}>
            <div className="item-img">
              <img src={item.imgUrl} alt="item" />
            </div>
            <div className="item-info">
              <div>
                <strong className="item-name">{item.name}</strong>
                <div className="item-price">{item.price}</div>
              </div>
            </div>
            <div className="item-desc">
              <div><span>카테고리</span><span>{item.mainCategory}>{item.subCategory}</span></div>
              <div><span>구매횟수</span><span>{item.purchase}</span></div>
              <div><span>판매처</span><span>{item.shop}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItemList;