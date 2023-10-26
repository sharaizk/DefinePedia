import React, { useState, useEffect } from "react";
import { Grid, Typography, Paper, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useRouter } from "next/router";
import categoryInstance from "src/axios-instances/category";
import Link from "next/link";
import { RenderIcon } from "src/utils/IconsArray";

import "@material-ui/icons/AcUnit";
import { CATEGORY } from "src/utils/routes.constant";

const useStyles = makeStyles((theme) => ({
  section4: {
    minHeight: "60vh",
    padding: "2rem 0",
    borderRadius: "8px",
    height: "100%",
    maxHeight: "100%",
    marginBottom: "30vh",
    backgroundColor: "#F9FAFE",
  },
  sectionTitle: {
    fontFamily: "Manrope,sans-serif",
    textAlign: "center",
    color: "#000000",
    fontWeight: 800,
    fontSize: "2.8rem",
    [theme.breakpoints.down("md")]: {
      fontSize: "2rem",
      marginBottom: "1.5vh",
    },
  },
  tagsContainer: {
    marginTop: "5vh",
    marginBottom: "5vh",
  },
  tag: {
    backgroundColor: "#F8F2F2",
    padding: "1rem",
    borderRadius: "12px",
    cursor: "pointer",
    maxHeight: "60px",
    maxWidth: "60px",
  },
  tagTitle: {
    textAlign: "center",
    color: "#616161",
    fontWeight: 500,
    fontSize: "0.85rem",
    marginTop: "2vh",
  },
  subtitle: {
    fontFamily: "Manrope,sans-serif",
    fontSize: "0.95rem",
    color: "#000",
    lineHeight: "1.2rem",
    textAlign: "center",
  },
  viewAllBtn: {
    backgroundColor: "#F1E4FF",
    color: "#8C30F5",
    width: "100%",
    borderRadius: "8px",
    padding: "0.7rem 0",
  },
}));
const CategorySection = () => {
  const classes = useStyles();
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getAllCategrories = async () => {
      try {
        const categoryResponse = await categoryInstance.get("/");
        setCategories(categoryResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllCategrories();
  }, []);

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      className={classes.section4}
    >
      <Grid item xs={12}>
        <Typography variant="h2" className={classes.sectionTitle}>
          Explore Homework Help Subjects
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.subtitle}>
          Browse through subjects to get homework help
        </Typography>
      </Grid>
      <Grid
        item
        container
        xs={12}
        sm={12}
        md={10}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        className={classes.tagsContainer}
      >
        {categories &&
          categories.map((category, index) => {
            return (
              <Grid
                item
                container
                xs={6}
                sm={4}
                md={1}
                spacing={0}
                key={category._id}
                justifyContent="center"
                alignItems="center"
                direction="column"
                onClick={() => router.push(`${CATEGORY}/${category.url}`)}
              >
                <Box display="flex" justifyContent="center" alignItems="center">
                  {/* <Link href={`${CATEGORY}/${category.slug}`}> */}
                  <Paper
                    className={[classes.tag, classes.businessTag].join(" ")}
                    elevation={2}
                  >
                    <RenderIcon
                      icon={category?.iconName}
                      color={category?.iconColor}
                    />
                  </Paper>
                  {/* </Link> */}
                </Box>
                <Typography className={classes.tagTitle}>
                  {category.name}
                </Typography>
              </Grid>
            );
          })}
      </Grid>
      <Grid item xs={12} sm={6} md={4} style={{ width: "100%" }}>
        <Button
          className={classes.viewAllBtn}
          disableTouchRipple
          variant="contained"
          disableElevation
        >
          View All
        </Button>
      </Grid>
    </Grid>
  );
};

export default CategorySection;
