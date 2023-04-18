import React, { useEffect } from 'react'
import './App.css'
import { useState } from 'react'

const App = () => {


  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)


  const fetchProducts = async () => {
    let products = await fetch('https://dummyjson.com/products?limit=100')
    let res = await products.json()

    if (res && res.products) {
      setProducts(res.products)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])


  const selectPageHandler = (selectedPage)=>{
      if(selectedPage>=1 && selectedPage <= products.length/10 && selectedPage !== page)
      setPage(selectedPage)
  }

  console.log(products);

  return (
    <div>
      {
        products.length > 0 &&
        <div className="card">
          {products.slice(page * 10 - 10, 10 * page).map((item) => {
            return <span key={item.id} className='product__item'>
              <img src={item.thumbnail} alt="prod-img" />
              <div className="details">
                <span className='text'>{item.title}</span>
                <span className='text'> Rs. {item.price}</span>
              </div>
            </span>
          })}
        </div>
      }


      {
        products.length > 0 && <div className="pagination">

          <span

           className={page > 1 ? "" : "disable"}

          onClick={()=>{selectPageHandler(page-1)}}  >◀</span>
          {
            [...Array(products.length / 10)].map((_, i) => {
              return <span onClick={()=>{selectPageHandler(i + 1)}} 
              className={page=== i+1 ? "pagination__selected" : ''}
              key={i}>{i + 1}</span>
            })
          }
          <span  onClick={()=>{selectPageHandler(page+1)}}
            className={page < products.length/10 ? "" : "disable"}
          >▶</span>

        </div>
      }
    </div>
  )
}

export default App