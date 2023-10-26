import React from "react";
import bookInstance from "src/axios-instances/bookInstance";

const Book = () => {
  return <div>Book</div>;
};

export async function getStaticPaths() {
  const bookResponse = await bookInstance.get("/all");
  const bookslugs = bookResponse.data.data.map((book) => ({
    params: { bookslug: book.slug },
  }));
  return {
    paths: bookslugs,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const bookslug = context.params.bookslug;
  const bookResponse = await bookInstance.get("/slug", {
    params: {
      bookslug,
    },
  });
  return {
    props: {
      slug: bookResponse?.data?.data?.slug,
      data: bookResponse?.data?.data,
    },
  };
}

export default Book;
