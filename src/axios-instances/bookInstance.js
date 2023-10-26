import axios from 'axios'

const bookInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/book`
})



export default bookInstance;
