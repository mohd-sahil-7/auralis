import React, { useEffect, useState } from 'react'
import styles from '../Styles/Products.module.css'
import AdminNav from '../Components/AdminNav'
import axios from 'axios';
import toast from 'react-hot-toast';
function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name:"",
    brand:"",
    type:"",
    price:0,
    description:"",
    image:""
  })
  const [editProduct, setEditProduct] = useState(null);
  useEffect(()=>{axios.get("https://auralis-2.onrender.com/products").then(res => setProducts(res.data))},[])
  
  const addProduct = (e)=>{
    e.preventDefault();

    axios.post("https://auralis-2.onrender.com/products", newProduct)
      .then(res=>{
        setProducts([...products,res.data]);

        setNewProduct({
          name:"",
          brand:"",
          type:"",
          price:0,
          description:"",
          image:""
            })
            toast.success("Product added successfully")
      })
  }
  const clear =()=>{
    setNewProduct({
          name:"",
          brand:"",
          type:"",
          price:0,
          description:"",
          image:""
            })
      }

  const removeProduct = (id) => {
  axios.delete(`https://auralis-2.onrender.com/products/${id}`)
    .then(() => {
      setProducts(products.filter(p => p.id !== id));
      toast.success("Product removed successfully")
    })
  }

  const updateProduct = (id) =>{
    axios.patch(`https://auralis-2.onrender.com/products/${id}`,editProduct)
    .then(()=>{
      setProducts(products.map(p=>p.id===id? editProduct : p));
      setEditProduct(null);
      toast.success("Product edited successfully")
    })
  }
  return (
    <div className={styles.body}>
        <AdminNav/>
        <div className={styles.products}>
          <h2>All Products</h2>
          <div className={styles.productsCon}>

            <div>
              <h4>Add new product</h4>
              <form onSubmit={addProduct} className={styles.addForm}>
                <section className={styles.form}>
                <input type="text" placeholder='Product name' value={newProduct.name} className={styles.input} required
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}/>
                <select value={newProduct.brand} onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })} 
                className={styles.input}>
                  <option disabled hidden>Brand</option>
                  <option value="boAt">boAt</option>
                  <option value="Zebronics">Zebronics</option>
                  <option value="JBL">JBL</option>
                  <option value="Sony">Sony</option>
                  <option value="Apple">Apple</option>
                  <option value="Samsung">Samsung</option>
                </select>
                <select value={newProduct.type} onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })} 
                className={styles.input}>
                  <option disabled hidden>Type</option>
                  <option value="Headphone">Headphone</option>
                  <option value="Earphone">Earphone</option>
                  <option value="TWS">TWS</option>
                  <option value="Neckband">Neckband</option>
                </select>
                <input type="number" value={newProduct.price} placeholder='Price' className={styles.input} required
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}/>
                <input type="text" value={newProduct.description} placeholder='Description' className={styles.input} required
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}/>
                <input type="text" value={newProduct.image} placeholder='Image URL' className={styles.input} required
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}/>
                </section>
                <section>
                <input type="submit"  value="Add product" className={styles.edit}/>
                <input type="reset"  value="Clear" onClick={clear} className={styles.edit}/>
                </section>
              </form>
            </div>

            {products.map(product =>
              <div className={styles.product} key={product.id}>
                  <img src={product.image} className={styles.img} />
                  <section>
                    {editProduct && editProduct.id === product.id?(
                      <b>
                     Name: <input type="text" value={editProduct.name} onChange={(e)=> setEditProduct({...editProduct,name:e.target.value})} className={styles.editBox} /> <br />
                     Brand: <select value={editProduct.brand} onChange={(e) => setEditProduct({ ...editProduct, brand: e.target.value })}
                      className={styles.editBox}>
                        <option disabled hidden>Brand</option>
                        <option value="boAt">boAt</option>
                        <option value="Zebronics">Zebronics</option>
                        <option value="JBL">JBL</option>
                        <option value="Sony">Sony</option>
                        <option value="Apple">Apple</option>
                        <option value="Samsung">Samsung</option>
                      </select>
                     Type: <select value={editProduct.type} onChange={(e) => setEditProduct({ ...editProduct, type: e.target.value })}
                      className={styles.editBox}>
                        <option disabled hidden>Type</option>
                        <option value="Headphone">Headphone</option>
                        <option value="Earphone">Earphone</option>
                        <option value="TWS">TWS</option>
                        <option value="Neckband">Neckband</option>
                      </select><br />
                     Price: <input type="number" value={editProduct.price} onChange={(e)=> setEditProduct({...editProduct,price:e.target.value})} className={styles.editBox}/>
                      <br />
                     Description: <textarea  value={editProduct.description} className={styles.textarea}
                      onChange={(e)=> setEditProduct({...editProduct,description:e.target.value})}/> <br />
                      <button onClick={() => updateProduct(product.id)} className={styles.saveButton}>Save</button>
                      <button onClick={() => setEditProduct(null)} className={styles.cancelButton}>Cancel</button>
                      </b>
                    ):(
                      <>
                    <h6><i>ID : #{product.id}</i></h6>
                    <b>
                      Name: {product.name} <br />
                      Brand: {product.brand} <br />
                      Type: {product.type} <br />
                      Price: ₹{product.price} <br />
                      Description: {product.description} <br />
                      <button className={styles.delete} onClick={()=>removeProduct(product.id)}>Delete Product</button>
                      <button className={styles.edit} onClick={()=>setEditProduct(product)}>Edit Product</button>
                    </b>
                    </>)}
                  </section>
                </div>
            )}
          </div>
        </div>
    </div>
  )
}

export default Products