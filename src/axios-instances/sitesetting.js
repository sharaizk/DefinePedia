import axios from "axios";

const siteSettingInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/sitesetting`,
});

export default siteSettingInstance;
