import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function Services(props) {
  const classes = useStyles();

  //   React.useEffect(() => {}, [clicked]);
  return (
    <Card className={classes.root}>
      <CardActionArea
        onClick={() => {
          console.log("card clicked");
          props.setClicked(true);
          // props.setCategory({
          //   title: props.title,
          //   price: props.price,
          //   time: props.time,
          // });
        }}
      >
        <CardMedia
          className={classes.media}
          image={props.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            A common choice for portrait/fashion/beauty/boudoir photographers.
            Including: color correction, skin & hair retouching, enhance makeup,
            improve face/body shape, clean up backdrops, dodge & burn, etc.
            Please order "Basic editing" for each photo.
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Select
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}
