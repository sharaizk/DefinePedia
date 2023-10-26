import React from "react";
import NextLink from "next/link";
import { Typography } from "@material-ui/core";

const Breadcrumbs = (props) => {
  const newCrumbs = breadcrumbsLinks.map((singleLink) => (
    <NextLink
      color="primary"
      key={singleLink.link}
      href={singleLink.link}
      passHref
    >
      <a className={classes.breadCrumbsLink}>
        <Typography color="primary" variant="h6">
          {singleLink.text}
        </Typography>
      </a>
    </NextLink>
  ));

  return newCrumbs;
};

export default Breadcrumbs;
