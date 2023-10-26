import axios from 'axios'

const solutionInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/solution`
})



export default solutionInstance;
