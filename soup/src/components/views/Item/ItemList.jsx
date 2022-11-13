import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from 'react-js-pagination';

import '../../../css/ItemList.css';

function ItemList({props, subcat}) {

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

  const getProduct = async () => {
    try { 
      const response = await axios.get('/search', {
        params: {
          category: `${subcat}`,
          size: `${size}`,
          sort: `${sort}`,
          page: `${page}`
        }
      });
      console.log(response.data.result.result.content);
      setProduct(response.data.result.result.content)
      
    } catch (e) {
      alert('error');
      console.log(e); 
    }
  };

  useEffect(() => {
    getProduct();
  },[]);
  // 아람


  const [Page, setPage] = useState(1);
  const handlePageChange = (page) => {
    console.log(page);
    setPage(page);
  }
  console.log(product[0]);
  
  return (
    <div className="ItemList">
      <div className="msg">
        <h3>{props.main}</h3><span>의 특가 상품이 검색되었습니다.</span>
      </div>
      <div className="itemList">
        {product.map((data, index) => (
          <div className="list-item" key={`상품목록${index+1}`}>
              <div className="item-img">
                <img src={data.imgSrc} style={{ width: "120px", height: "120px"}} alt="item" />
              </div>
    
            <div className="item-info">
                <div>
                <strong className="item-name">{data.prdName}</strong>
                <div className="item-price">{data.price}</div>
              </div>
            </div>
            <div className="item-desc">
              <div><span>카테고리</span><span>{data.cat}>{data.subcat}</span></div>
              <div><span>구매횟수</span><span>{data.purchase}</span></div>
              <div><span>판매처</span><span>{data.site}</span></div>
            </div>
          </div>
        ))}
      </div>
      {/* <Pagination 
        activePage={1}
        itemsCountPerPage={5}
        totalItemsCount={300}
        pageRangeDisplay={30}
        onChange={handlePageChange}
      ></Pagination> */}
    </div>
  )
}

export default ItemList;