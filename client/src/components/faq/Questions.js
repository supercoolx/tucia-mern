import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import faqService from "../../services/FaqService";
import QuestionAccordation from "./QuestionAccordation";
const useStyles = makeStyles({
  root: {
    color: "#FFFFFF",
  },
});
const Questions = (props) => {
  const classes = useStyles();
  const [articles, setArticles] = React.useState([]);

  React.useEffect(() => {
    faqService
      .GetAllArticles(props.match.params.id)
      .then((res) => {
        setArticles(res);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  return (
    <div>
      <div style={{ height: "200px", background: "#ff6666" }}>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={11} style={{ marginTop: "30px" }}>
            <Typography
              className={classes.root}
              component="h1"
              variant="h2"
              //   align="center"
            >
              FAQ
            </Typography>
            <Typography
              component="h1"
              variant="h6"
              //   align="center"
              color="textPrimary"
              className={classes.root}
            >
              Advice and answers from the Trakouts Team
            </Typography>
          </Grid>
        </Grid>
      </div>
      <div style={{ margin: "20px 100px 100px 100px" }}>
        {articles.map((item, index) => {
          return <QuestionAccordation key={index} data={item} />;
        })}
      </div>
    </div>
  );
};

export default Questions;
