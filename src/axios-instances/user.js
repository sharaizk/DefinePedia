import axios from 'axios'

const userInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/user`
  // headers: {
    // "Access-Control-Allow-Origin": "*"
    // 'Access-Control-Allow-Credentials': true
  // }
})


export default userInstance;
