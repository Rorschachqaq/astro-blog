import React, { useState } from 'react';

import "../styles/global.css"


export default function BlogCategories({ categories }) {
  const categoryNames = Object.keys(categories);
  const [selectedCategory, setSelectedCategory] = useState(categoryNames[0]);
  

  return (
    <div className="category-container" style={{margin:"10px",border: "1px black solid"}}>
      {/* 类别按钮 */}
      <div className="category-buttons" style={{margin:"20px", marginBottom:'-5px'}}>
        {categoryNames.map((category) => (
          <button
            key={category}
            className={category === selectedCategory ? 'active' : ''}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 博文列表 */}
      <div className="posts-list" style={{paddingBottom:'30px'}}>
        {categories[selectedCategory].map((post) => (
          <div key={post.url} className="post-card" style={{marginBottom:'-40px'}}>
            <h3 style={{marginBottom:'-5px'}}> 
              {/* 标题链接到 post.url */}
              <a href={post.url} style={{color:'gray' }}>{post.title}</a>
            </h3>
            <p style={{marginBottom:'-5px'}}>{post.subtitle}</p>
            
            <p style={{fontSize:'11px'}}><i className="far fa-clock" />  {post.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}