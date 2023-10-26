import axios from 'axios'

const waitingListInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/waiting-list`
})


export default waitingListInstance
