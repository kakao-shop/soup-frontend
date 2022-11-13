import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import '../../../css/DefaultItem.css'
import { useEffect } from 'react';

function MyBestItem() {
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
       
        const getProduct = async () => {
          try{ 
            const response = await axios.get('/search/collections/today-best', {
          });
            console.log(response.data.result);
            setProduct(response.data.result)
            
        }catch (e) {
            alert('error');
            console.log(e); 
        }
        };
        getProduct();
      },[]);
    
      console.log(product[1]);
    
    
    const user = {
        nickname: localStorage.getItem('nickname')
    }
    
    const result = user.nickname === null ? <h3 style={{width: "100%"}}>인기 상품</h3> : <div><h3 id="nickname" style={{display: "inline-block", margin: "0 10px 0 0"}}>{user.nickname}</h3><span>님을 위한 추천 상품</span></div>;
 
    return (
        <main className="DefaultItem container">
            <div className="default-item">
            {result}
                <div className="item-list">
                {product.map((item, index) => (
                    <div key={"default" + index} className="item">
                        <a href={item.webUrl} className="item-link">
                            <img src={item.imgSrc} alt="Item" className="item-img" />
                            <strong className="item-name">{item.prdName}</strong>
                            <span className="item-price">{item.price}원</span><span className="item-price">{item.subcat}</span>
                        </a>
                    </div>
                ))}
                </div>
            </div>
        </main>
    );
}

export default MyBestItem;