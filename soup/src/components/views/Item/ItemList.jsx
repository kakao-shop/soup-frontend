import React, { useState } from 'react';
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Header from '../Header';
import Nav from '../Nav';
import '../../../css/ItemList.css';
import { useEffect } from 'react';
import Bot from '../Bot/Bot'

function ItemList({isLogin, setIsLogin}) {
  const [category, setcategory] = useState("사과");
  const [size, setsize] = useState("10");
  const [sort, setsort] = useState("price,desc");
  const [page, setpage] = useState("1");

  const location = useLocation();
  const num = location.state;
  // console.log(num);

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

  useEffect(() => {
    axios.get('/search', {
      params: {
        q: `${num}`,
        size: `${size}`,
        sort: `${sort}`,
        page: `${page}`
      },
      headers: {
        'x-access-token': localStorage.getItem('access_token')
      }
}
).then(function(response) {
  setProduct(response.data.result.result.content)

}).catch(function (error) {
    alert('error');
    console.log(error);  
});
},[num]);

  // const searchPrd = (e) => {
  //   const cat = e.target.innerText;
  //   axios.get('/search', {
  //       params: {
  //         q: `${num}`,
  //         size: `${size}`,
  //         sort: `${sort}`,
  //         page: `${page}`
  //       },
  //       headers: {
  //         'x-access-token': localStorage.getItem('access_token')
  //       }
  // }).then(function (response) {
  //   const result = response.data.result.result.content
  //   console.log(response.data)
  //   // navigate('/searchResult', { state: e.target.value });
  // }).catch(function (error) {
  //     alert('error');
  //     console.log(error);  
  // });
  // };
  // setProduct(num);
  // useEffect(() => {
   
  //   const getProduct = async () => {
  //     try{ 
  //       const response = await axios.get('/search', {
  //         params: {
  //         category: `${subcat}`,
  //         size: `${size}`,
  //         sort: `${sort}`,
  //         page: `${page}`
  //       }
  //     });
  //       console.log(response.data.result.result.content);
  //       setProduct(response.data.result.result.content)
        
  //   }catch (e) {
  //       alert('error');
  //       console.log(e); 
  //   }
  //   };
  //   getProduct();
  // },[]);

  // console.log(product[0]);
  
  return (
    <div>
    <Header setIsLogin={setIsLogin} isLogin={isLogin}/>
    <Nav/>
    <div className="ItemList">
      <div className="itemList">
      <div className="msg">
              <h3>{num}</h3><span>의 특가 상품이 검색되었습니다.</span>
            </div>
        {product && product.length > 0 ? product.map((data, index) => (
          <a href={data.webUrl} className="item-link">
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
              <div><span>카테고리</span><span>{data.cat}{data.subcat}</span></div>
              <div><span>구매횟수</span><span>{data.purchase}</span></div>
              <div><span>판매처</span><span>{data.site}</span></div>
            </div>
          </div>
          </a>
        ))
        : <div>
          검색 결과가 없습니다.
        </div>
          }
      </div>
    </div>

    </div>
    
  )
}

export default ItemList;