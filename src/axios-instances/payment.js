import axios from 'axios'

const paymentInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/payment`
})


export default paymentInstance;
