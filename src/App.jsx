import axios from "axios"
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'






function App() {

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibW8iLCJpYXQiOjE1MTYyMzkwMjJ9.EELNedYTwK_AmlcpSKQ-Vo8z6BF45GbGqSS9GZSKq9E"
 const [Msisdn , setM] = useState('')
 const [BirthYear , setB] = useState('')
const [InvoiceNo , setI] = useState('112211')
//  const [Amount , setA] = useState(500)
const [transaction , settransaction] =  useState()
 const [OTP , setotp] = useState("")
//  const [Category, setC] = useState(11)

const notify = (m) => toast.success(m);

 const payhand = async (e) => {
  e.preventDefault()
  await axios.post("http://localhost:8002/pay",{Msisdn:Msisdn,BirthYear:BirthYear,InvoiceNo:InvoiceNo},{
    headers:{   
      authorization:"Barer " + token
    }
   }) 
   .then(data => {
    
    // settransaction(tid)
    console.log(data)
    if(data.data.statusCode === 911){
      notify(data.data.result)
    }else{
      notify(data.data.message)
    }
   }).catch(err => {
    console.log(err)
    notify(err)
  })
 }
const  invoice_no = "121244"
const paynow = async (e) => {
  e.preventDefault()

  await axios.post("https://siri-app-894307e56009.herokuapp.com/confirm",{TransactionId:transaction,OTP:OTP},{
    headers:{
      authorization:"Barer " + token
    }
   }) 
   .then(data => {
    
    
    console.log(data)
    notify(data.data.message)
   }).catch(err => console.log(err))
 
}




  return (
    <>
    <div className="cont">
     <ToastContainer />
    <form className="forma" onSubmit={payhand}  >
      <input value={Msisdn} onChange={e => setM(e.target.value)} type="text" placeholder="91*******" />
      <input value={BirthYear} onChange={e => setB(e.target.value)} type="text" placeholder="1990" />
   
      <button type="submit"> pay</button>
    </form>
   


<form className="formab" onSubmit={paynow}>
  <input value={OTP} onChange={e => setotp(e.target.value)} type="text"  />
  <button type="submit">confirm pay</button>
</form>

</div>
    </>
  )
}

export default App
