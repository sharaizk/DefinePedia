import axios from "axios";
const sitemapInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/sitemap`
})

export default sitemapInstance