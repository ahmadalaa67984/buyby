import React from "react";
import Head from "next/head";

const CHead = ({ title, description }) => {
  return (
    <Head>
      <meta charSet='utf-8' />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, shrink-to-fit=no'
      />
      <title>{title}</title>
      <meta itemProp='description' content={description} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
    </Head>
  );
};

export default CHead;
