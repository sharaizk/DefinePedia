import React from "react";
import * as fs from "fs";
import sitemapInstance from "src/axios-instances/sitemaps";
const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res }) => {
  const getAllFiles = function (dirPath, arrayOfFiles) {
    let files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function (file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
      } else {
        if (!file.includes("[")) {
          arrayOfFiles.push(
            dirPath.replace("./pages", process.env.NEXT_URL) + "/" + file
          );
        }
      }
    });
    return arrayOfFiles;
  };

  const staticPaths = getAllFiles("./pages");
  //making solution paths
  const solutionPathResponse = await sitemapInstance.get("/solution-sitemap");
  const solutionPath = solutionPathResponse.data.solutions.map(
    (path) =>
      `${process.env.NEXT_URL}/homework-help/questions-and-answers/${path.slug}`
  );

  // making category paths
  const categoryPathResponse = await sitemapInstance.get("/category-sitemap");
  const categoryPath = categoryPathResponse.data.categories.map(
    (category) =>
      `${process.env.NEXT_URL}/homework-help/category/${category.name}`
  );

  const allPaths = [...staticPaths, ...solutionPath, ...categoryPath];
  for (let i = 0; i < allPaths.length; i++) {
    const link = `<url><loc>${
      allPaths[i]
    }</loc><lastmod>${new Date().toLocaleDateString()}</lastmod></url>`;
    const addSitemapResponse = await sitemapInstance.post("/create", {
      link: link,
    });
  }
  res.end();
  return {
    props: {},
  };
};

export default Sitemap;
