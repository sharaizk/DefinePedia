import React from "react";
import sitemapInstance from "src/axios-instances/sitemaps";
import {minify} from 'minify-xml'
const Sitemaps = () => {
  return null;
};

export async function getServerSideProps(context) {
  const sitemap = context.params.sitemap;
  const response = await sitemapInstance.get(`/one/${sitemap}`);
  const urls = response?.data?.sitemap?.content;
  let maps = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls
    .map((url) => {
      const link = url.url;
      return `
          ${link}
        `;
    })
    .join("")}</urlset>
`;
  context.res.setHeader("Content-Type", "text/xml");
  context.res.write(minify(maps));
  context.res.end();
  return {
    props: {},
  };
}

export default Sitemaps;
