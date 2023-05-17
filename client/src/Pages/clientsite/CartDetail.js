import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/navbar'
import { AiOutlineDelete } from 'react-icons/ai'
import { API_BASE } from '../../APIs/Api'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteProduct, IncreaseProductQt } from '../../app/features/cartSlice'

const CartDetail = () => {
    const [products, setproducts] = useState([])
    const productsInCart = useSelector((state) => state.persistedReducer?.cart?.products)
    const dispatch = useDispatch()
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
    useEffect(() => {
        const fetchProduct = () => {
          axios
            .get(API_BASE + "/cart")
            .then((res) => {
              setproducts(res.data); 
            })
            .catch((error) => console.log(error.message));
        };
        fetchProduct();
      }, []);
      const Totalprice = products.reduce((acc, obj)=> acc + parseInt(obj.price),0)
      const handleDelete = (id) => {
        const DeleteFromCart = async () => {
      
            await axios
            .delete(API_BASE + "/cart/" + id)
            .then(() => {
                dispatch(DeleteProduct(id))
            })
            .catch((error) => console.error(error.message));
          
          }
          if (products.length !== 0) {
            DeleteFromCart();
          } else {
            console.warn("No products");
          }
      }
    const handleQtChange = (id) =>{
      dispatch(IncreaseProductQt(id))
    }
  return (
    <div>
        <Navbar/>
        <div className='block h-[100vh] pt-10 px-20 bg-gray-200'>
            <div className='h-max w-[70%] bg-white text-gray-600'>
                <h2 className='text-2xl ml-5'>Shopping cart</h2>
                {productsInCart.length !==0 ? 
                <div className='px-5 py-2'>
                    {productsInCart.map((p)=>{
                        return(
                            <div key={p.id} className='flex justify-between border-y py-1'>
                                <div className='flex'>
                                    <div className='w-20'>
                                    <img src={p.img} alt=""/>
                                    </div>
                                    <div className='ml-5'>
                                    <p className='font-semibold'>{p.name}</p>
                                    <p>{formatter.format(p.price)}</p> 
                                    <input onChange={()=>handleQtChange(p.id)} type='number' className='border w-10 px-1'/>
                                </div>
                                </div>
                                <button onClick={()=>handleDelete(p.id)} className='hover:text-red-500'>
                                    <AiOutlineDelete />
                                </button>
                                
                            </div>
                        )
                    })}
                    <div className='mt-10 flex justify-between'>
                        <h3>Total: {formatter.format(Totalprice)}</h3>
                        <button className='bg-orange-400 hover:bg-cyan-500 px-3 py-1 text-white rounded-lg'>Buy all</button>
                    </div>
                </div>
                :<div className='h-[300px]'>
                    <h1 className='text-2xl flex justify-center pt-20'>Cart is empty</h1>
                </div>
                }
            </div>
        </div>
    </div>
  )
}

export default CartDetail