import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Card, Container, Divider, Grid, Grow, Typography } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Link as RouterLink } from 'react-router-dom';
import store from "../../store";

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  button: { 
    minWidth: 200,
    fontFamily: "'Roboto Condensed', sans-serif",
    fontWeight: 700,
  },
  card: {
    color: theme.palette.common.white,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: theme.spacing(3,2),
    height: 200,
  },
  container: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  h2: {
    fontFamily: "'Roboto Condensed', sans-serif",
    fontWeight: 700,
    fontSize: 48,
  },
  h5: {
    fontSize: 20,
    fontWeight: 300,
    maxWidth: 700,
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8),
    },
  },
  title: {
    fontFamily: "'Roboto Condensed', sans-serif",
    fontWeight: 700,
  },
  divider: {
    backgroundColor: theme.palette.common.white,
    opacity: 0.5,
  },
  paragraph: {
    fontWeight: "300",
  },
}));

function Intro() {
  const classes = useStyles();

  const [display, setDisplay] = React.useState(true);

  const [checked, setChecked] = React.useState(false);

  const handleClick= () => {
    setDisplay(false);
    setChecked(true);
  };

  store.subscribe(() => {
    setDisplay(true);
    setChecked(false);
  });

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Typography color="inherit" align="center" variant="h2" marked="center" gutterBottom className={classes.h2}>
          Predict Your Emotion
        </Typography>
        <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
          Believe it or not? Input your comments about anything, we can predict your sentiment!
          Or put your tweet here, it will generate a relative emoji! Try it!
        </Typography>
        <Grow in={display} >
        <Button
          color="secondary"
          variant="contained"
          size="large"
          className={classes.button}
          component="a"
          onClick={handleClick}
          style={{ display: display }}
          align="center"
        >
          Explore
        </Button>
        </Grow>
        <Grow in={checked}>
        <Box position="relative" top={-45}>
        <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <Card className={classes.card}>
              <CardContent align="center">
              <Typography gutterBottom variant="h4" component="h2" className={classes.title}>
                Sentiment
              </Typography>
              <Divider variant="middle" className={classes.divider}/>
              <Typography variant="body2" component="p" className={classes.paragraph}>
                Input your comment about anything, and we will tell you this comment is positive or negative!
              </Typography>
              </CardContent>
              <CardActions style={{justifyContent: 'center'}}>
                <Button color="secondary" variant="contained" size="small" to="/form/sentiment" component={RouterLink}>Try Now!</Button>
              </CardActions>
            </Card>
            </Grid>
            <Grid item sm={6}>
            <Card className={classes.card}>
              <CardContent align="center">
              <Typography gutterBottom variant="h4" component="h2" className={classes.title}>
                Emoji
              </Typography>
              <Divider variant="middle" className={classes.divider}/>
              <Typography variant="body2" component="p" className={classes.paragraph}>
                Input your tweet about anything, and we will predict what emoji you would like to enter!
              </Typography>
              </CardContent>
              <CardActions style={{justifyContent: 'center'}}>
                <Button color="secondary" variant="contained" size="small" to="/form/emoji" component={RouterLink}>Try Now!</Button>
              </CardActions>
            </Card>
            </Grid>
          </Grid>
          </Container>
          </Box>
          </Grow>
      </Container>
    </section>
  );
}


export default Intro;