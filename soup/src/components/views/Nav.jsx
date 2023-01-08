import React from "react";
import { Link } from "react-router-dom";

import "../../css/Nav.css";

function Nav({categoryList}) {

    return (
        <nav>
            <div id="nav-bar"></div>
            <div className="Category container">
                {categoryList.map((category, index) => (
                    <div
                        className="category-item"
                        id={`${index}`}
                        key={`category${index + 1}`}
                    >
                        <button
                            type="button"
                            className="nav-item"
                            key={`main${index + 1}`}
                        >
                            {category.main}
                        </button>
                        <div
                            className={`sub-panel index${index + 1}`}
                            key={`sub${index + 1}`}
                        >
                            {category.sub.item.map((sub, subIndex) => (
                                <Link
                                    className="sub-item"
                                    to="/category"
                                    state={{ idx: index, subcat: sub }}
                                    key={`sub${subIndex + 1}-item`}
                                >
                                    {sub}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </nav>
    );
}

export default Nav;
