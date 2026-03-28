import React, {useContext, useState} from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'


const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [sortMethod, setSortMethod] = useState("default");

  // Filtering by category first
  const categoryProducts = all_product.filter(item => item.category === props.category);

  // Sorting clone array
  let sortedProducts = [...categoryProducts];
  if (sortMethod === "low-high") {
    sortedProducts.sort((a, b) => a.new_price - b.new_price);
  } else if (sortMethod === "high-low") {
    sortedProducts.sort((a, b) => b.new_price - a.new_price);
  }

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-{sortedProducts.length > 12 ? 12 : sortedProducts.length}</span> out of {sortedProducts.length} products
        </p>
        <div className="shopcategory-sort" style={{cursor: "pointer", display: "flex", gap: "5px", alignItems: "center"}}>
          <select value={sortMethod} onChange={(e) => setSortMethod(e.target.value)} style={{border: "none", outline:"none", backgroundColor: "transparent", cursor: "pointer", fontSize: "16px"}}>
            <option value="default">Sort by Default</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="shopcategory-products">
        {sortedProducts.map((item,i) => {
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
        </div>
    </div>
  )
}

export default ShopCategory
