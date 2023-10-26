import axios from 'axios'

const categoryInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/category`
})


export default categoryInstance;
