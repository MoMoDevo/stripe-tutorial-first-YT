const express=require("express")
const dotenv=require("dotenv")
dotenv.config()
const cors=require("cors")
const app=express()

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173"
}))
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

app.post("/create-checkout-session", async (req, res)=>{
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card","klarna","paypal","Apple Pay"],
            mode:"payment",
            line_items: req.body.items.map(item => {
                return{
                    price_data:{
                        currency:"eur",
                        product_data:{
                            name: item.name
                        },
                        unit_amount: (item.price)*100,

                    },
                    quantity: item.quantity
                }
            }),
            success_url: 'http://127.0.0.1:5173/success',
            cancel_url: 'http://127.0.0.1:5173/cancel'
        })

        res.json({url: session.url})

    }catch(e){
     res.status(500).json({error:e.message})
    }
})











app.listen(process.env.PORT,()=>{
    console.log("server is working!")
})