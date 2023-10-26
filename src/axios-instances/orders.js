import axios from 'axios'

const orderInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/order`
})


export default orderInstance;
