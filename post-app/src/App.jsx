import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [name, setName] = useState('')
  const [price , setprice] = useState('')
  const [Description, setDescription] = useState('')
  const [products, setProducts] = useState([])
  const [apiLoad , setApiLoad] = useState(false)
  const [isShow , setIsShow] = useState(false);
  const baseUrl = 'http://localhost:5000';
  const postApi = (e) => {
    e.preventDefault()
     axios.post(`${baseUrl}/post-product`, {
        name: name,
        price: price,
        description: Description
      })
      .then((res) => {
        console.log('res.data:', res.data);
        setApiLoad(!apiLoad)
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      }); 
  };
  
    useEffect(() => {
      axios.get(`${baseUrl}/get-product`)
    .then((res) => {
      console.log('res.data:', res.data);
      setProducts(res.data)
    })
    .catch((err) => {
      console.error('Error fetching data:', err);
    });
    }, [apiLoad])
     
    const deleteProduct = (id) => {
      axios.delete(`${baseUrl}/product-delete/${id}`)
      .then((res) => {
        console.log('res.data:', res.data);
        console.log(id)
        setApiLoad(!apiLoad)
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
    }
    const editApi = () => {

    }
  return (
    <div className='bg-white text-black min:h-screen py-4'>
   
      <form onSubmit={postApi} className='bg-black text-black flex  flex-col justify-center items-center gap-y-4'>
      <input
        type="text"
        placeholder='Product Name'
        onChange={(e) => setName(e.target.value)}
         />
        <input type="number" placeholder='Product Price'
        onChange={(e) => setprice(e.target.value)}
        />
        <textarea type="text" placeholder='Product Description'
        onChange={(e) => setDescription(e.target.value)}
        />
      <button className='text-white'>Post API</button>
      </form>
      <div className='mt-4 flex flex-col justify-center bg-black text-white items-center gap-y-4'>
        {products.map((items) => 
          <div key={items.id} className='border border-white py-3 px-4 flex flex-col justify-center items-center gap-y-2 capitalize rounded-md'>
            <h1>{items.name}</h1>
            <h1>{items.price}</h1>
            <h1>{items.description}</h1> 
            <button  onClick={() => deleteProduct(items.id)}> delete </button>
            <button onClick={() => setIsShow(prev => !prev)}> edit </button>
          </div>
        )}
      </div>

     {isShow ? 
      <div className='layout fixed h-screen w-screen top-0 left-0' onClick={() => setIsShow(prev => !prev)}>
       <div>
        <form onSubmit={editApi} className=' gap-y-2 py-4 flex-col bg-red-700 cursor-pointer' >
      <input
        type="text"
        placeholder='Product Name'
        onChange={(e) => setName(e.target.value)}
         />
        <input type="number" placeholder='Product Price'
        onChange={(e) => setprice(e.target.value)}
        />
        <textarea type="text" className='border border-white' placeholder='Product Description'
        onChange={(e) => setDescription(e.target.value)}
        />
      <button>Post API</button>
      </form>
        </div>
      </div>: null}
    </div>
  );
};

export default App;
