import React, { useState } from 'react';
import { Link, useLocation, NavLink } from "react-router-dom";
import ItemList from './ItemList';
import axios from 'axios';
import Pagination from 'rc-pagination';

import Header from '../Header';
import Nav from '../Nav';
import "../../../css/SubCategoryList.css";
import { useEffect } from 'react';

// import '../../../css/CategoryPage.css';
import '../../../css/ItemList.css';


function CategoryView({isLogin, setIsLogin, categoryList}) {
  // const [pageSize, setPageSize] = useState(10);
  // const [totalCount, setTotalCount] = useState(115);
  // const [currentPage, setCurrentPage] = useState(1);

  const [category, setcategory] = useState("사과");
  const [size, setsize] = useState("10");
  const [sort, setsort] = useState("price,desc");
  const [page, setpage] = useState("1");
  const [product, setProduct] = useState([
    {
      id: "상품명",
      score: "이미지URL",
      site: "상품 가격(원)",
      prdName: "상품 가격(원)",
      webUrl: "대분류카테고리",
      price: "소분류카테고리",
      purchase: 0,
      cat: "사이트",
      subcat: "",
      imgSrc: ""
    }
  ]);

  const location = useLocation();
  const num = location.state;

  const subList = categoryList[num].sub.item;

  const getProduct = (e) => {
    const cat = e.target.innerText;
    // setSubcat(`${cat}`);
    axios.get('/search', {
      params: {
        category: `${cat}`,
        size: `${size}`,
        sort: `${sort}`,
        page: `${page}`
      }
  })
  .then(function (response) {
    setProduct(response.data.result.result.content)
  }).catch(function (error) {
      alert('error');
      console.log(error);  
  });
  };
  
  return (
    <div>
        <Header setIsLogin={setIsLogin} isLogin={isLogin}/>
        <Nav />
        <div className="CategoryView container">
          <div className="SubCategoryList container">
            <h2>{categoryList[num].main}</h2>
              <div className="subCategoryBox">
               {subList.map((sub, index) => (
                <button className="subBtn" key={`cateSub${index + 1}`} onClick={getProduct}>{sub}</button>
                ))}  
              </div>
            </div>
      
            <div className="ItemList">
      <div className="msg">
        <h3>{categoryList[num].main}</h3><span>의 특가 상품이 검색되었습니다.</span>
      </div>
      <div className="itemList">
        {product.map((data, index) => (
          <a href={data.webUrl} target="_blank">
            <div className="list-item" key={`상품목록${index+1}`}>
                <div className="item-img">
                  <img src={data.imgSrc} style={{ width: "120px", height: "120px"}} alt="item" />
                </div>
              <div className="item-info">
                  <div>
                  <strong className="item-name">{data.prdName}</strong>
                  <div className="item-price">{data.price}원</div>
                </div>
              </div>
              <div className="item-desc">
                <div><span>카테고리</span><span>{data.cat}>{data.subcat}</span></div>
                <div><span>구매횟수</span><span>{data.purchase}</span></div>
                <div><span>판매처</span><span>{data.site}</span></div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
        </div>
    </div>
    
)
}

export default CategoryView;