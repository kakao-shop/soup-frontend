import React from "react";
import { Link } from "react-router-dom";
import '../../css/Nav.css';

function Nav() {
  let category = [
    "과일", "채소", "쌀・잡곡", " 수산・건어물", "축산", "제과・양산빵", "유제품・냉장/냉동식품", "면류・ 양념・오일", "생수・음료・커피"
  ]
  return (
    <nav>
        <div className="container">
            {category.map((name, index) => (
                <Link to="#" className="nav-item" key={index}>{name}</Link>
            ))}
        </div>
    </nav>  
  );
}

export default Nav;