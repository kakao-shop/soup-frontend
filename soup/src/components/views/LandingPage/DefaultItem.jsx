import React from 'react';
import { Link } from 'react-router-dom';

import '../../../css/DefaultItem.css'

function DefaultItem() {
    
    const itemlist = [
        {
            url: "#",
            name: "샘플 이름1",
            desc: "샘플 설명",
            price: "10,000"
        },
        {
            url: "#",
            name: "샘플 이름2",
            desc: "샘플 설명",
            price: "10,000"
        },
        {
            url: "#",
            name: "샘플 이름3",
            desc: "샘플 설명",
            price: "10,000"
        },
        {
            url: "#",
            name: "샘플 이름4",
            desc: "샘플 설명",
            price: "10,000"
        },
        {
            url: "#",
            name: "샘플 이름5",
            desc: "샘플 설명",
            price: "10,000"
        },
        {
            url: "#",
            name: "샘플 이름6",
            desc: "샘플 설명",
            price: "10,000"
        },
        {
            url: "#",
            name: "샘플 이름7",
            desc: "샘플 설명",
            price: "10,000"
        },
        {
            url: "#",
            name: "샘플 이름8",
            desc: "샘플 설명",
            price: "10,000"
        },
        {
            url: "#",
            name: "샘플 이름9",
            desc: "샘플 설명",
            price: "10,000"
        },
        {
            url: "#",
            name: "샘플 이름10",
            desc: "샘플 설명",
            price: "10,000"
        }
    ]

    const user = {
        nickname: "아람"
    }

    const result = user.nickname === "" ? <h3 style={{width: "100%"}}>인기 상품</h3> : <div><h3 id="nickname" style={{display: "inline-block", margin: "0 10px 0 0"}}>{user.nickname}</h3><span>님을 위한 추천 상품</span></div>;
  return (
    <main className="DefaultItem container">
        <div className="default-item">
            {result}
            <div className="item-list">
            {itemlist.map((item, index) => (
                <div key={"default" + index} className="item">
                    <Link to={item.url} className="item-link">
                        <img src={process.env.PUBLIC_URL + '/img/대왕보따리 춘식이.png'} alt="Item" className="item-img" />
                        <strong className="item-name">{item.name}</strong>
                        <span className="item-desc">{item.desc}</span>
                        <span className="item-price">{item.price}원</span>
                    </Link>
                </div>
            ))}
            </div>
        </div>
    </main>
  );
}

export default DefaultItem;
