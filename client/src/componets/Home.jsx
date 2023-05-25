 import { useState } from "react"
 
const Home = () => {
   
    const itemName = "Ferrero Rocher"
    const itemPrice = 800
    const [quantity, setQuantity] = useState(1);
    const[finalAmount, setFinalAmount] = useState(itemPrice);
  
    const increment = () => {
      setQuantity(quantity+1);
      setFinalAmount(finalAmount+itemPrice);
    }
  
    const decrement = () => {
      if(quantity <=1){
        setQuantity(1);
        setFinalAmount(itemPrice);
      }
      if(quantity > 1){
        setQuantity(quantity - 1);
        setFinalAmount(finalAmount - itemPrice);
      }
    }

    const checkout = () => {
        fetch("http://localhost:4000/create-checkout-session", {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          mode:"cors",
          body: JSON.stringify({
            items: [
              {id:1, quantity: quantity, price: itemPrice, name: itemName}
            ]
          })
        })
        .then(res => {
          if (res.ok) return res.json()
          return res.json().then(json => Promise.reject(json))
        })
        .then(({url})=>{
          window.location = url
        })
        .catch(e => {
          console.log(e.error)
        })
      }
    



  return (
    <div className="container">

        <div className="product">
            
                <div className="proc">
                    <img src="data:image/jpeg;base64,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" alt="" className="picture" />
                    <p>{itemName}  </p>
                    <p>price:{itemPrice}  </p>
                    <p>quantity:  </p>
                    <button >add to cart</button>
                    <hr />
                    <div className="handler">


                    <div className="buttons" onClick={increment}>+</div>
                    <p> {quantity} </p>
                    <div className="buttons" onClick={decrement}>-</div>
                    </div>



                </div>
          

        </div>
        <div className="info">
            
    <p>Total Amount: {finalAmount} </p>
    <button onClick={checkout}>Checkout</button>

        </div>


    </div>
  )
}

export default Home