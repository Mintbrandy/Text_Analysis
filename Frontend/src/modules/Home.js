import React from 'react';
import Intro from './views/Intro';
import { makeStyles } from '@material-ui/core/styles';

const backgroundImage =
  "https://gratisography.com/thumbnails/gratisography-colorful-wall-geometry-thumbnail.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.common.white,
  },
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', 
    backgroundPosition: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: -2,
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
    zIndex: -1,
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <section className={classes.root}>
        <Intro/>
        <div className={classes.backdrop} />
        <div className={classes.background} />
      </section>
    </React.Fragment>
  );
}

export default Home;