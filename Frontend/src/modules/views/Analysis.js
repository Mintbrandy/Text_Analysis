import React from 'react';
import { Redirect } from 'react-router-dom';
import PieChart from './PieChart';
import WordCloud from './WordCloud';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: '#f4f4f4',
  },
  container: {
    margin: theme.spacing(10,2)
  },
  pie: {
    justifyContent: 'center',
    backgroundColor: '#c98474',
    padding: theme.spacing(8, 3),
    height: 500
  },
  paper: {
    justifyContent: 'center',
    backgroundColor: '#f2d388',
    padding: theme.spacing(8, 3),
    height: 500
  },
  cardLeft: {
    justifyContent: 'center',
    backgroundColor: '#a7d2cb',
    padding: theme.spacing(8, 3),
    height: 500
  },
  cardRight: {
    justifyContent: 'center',
    backgroundColor: '#874c62',
    padding: theme.spacing(8, 3),
    height: 500
  },
  h3: {
    color: '#333333',
    fontFamily: "'Roboto Condensed', sans-serif",
    fontWeight: 700,
  },
  title: {
    color: '#333333',
    fontFamily: "'Roboto Condensed', sans-serif",
    fontWeight: 700,
    marginBottom: theme.spacing(10)
  }
}));

function Analysis(props) {
  const type = props.match.params.id === "sentiment";
  
    const data = props.location.state;

    const classes = useStyles();

    if (!data) {
        return <Redirect to='/form/sentiment'/>;
    }
    if (type) {
      return (
        <section className={classes.root}>
          <Grid container spacing={2} className={classes.container}>
            <Grid item xs={12} md={3}>
                <Paper className={classes.pie}>
                      <Typography variant="h3" align="center" gutterBottom className={classes.title}>
                          Probability
                      </Typography>
                      <PieChart prob={data.class_prob}/>
                    </Paper>
                </Grid>
            <Grid item xs={12} md={3}>
                <Paper className={classes.paper}>
                    <Typography variant="h3" align="center" gutterBottom className={classes.h3}>
                        Most Significant Words
                    </Typography>
                      <WordCloud prob={data.text_word_coef}></WordCloud>
                </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
            <Paper className={classes.cardLeft}>
                <Typography variant="h3" align="center" gutterBottom className={classes.h3}>
                    Top 10 Positive Words
                </Typography>
                <WordCloud prob={data.most_related_words_in_dict}></WordCloud>
            </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
                <Paper className={classes.cardRight}>
                    <Typography variant="h3" align="center" gutterBottom className={classes.h3}>
                        Top 10 Negative Words
                    </Typography>
                    <WordCloud prob={data.least_related_words_in_dict}></WordCloud>
                </Paper>
            </Grid>
        </Grid>
        </section>
      ); 
    }

    return (
      <section className={classes.root}>
        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={12} md={4}>
              <Paper className={classes.pie}>
                    <Typography variant="h3" align="center" gutterBottom className={classes.title}>
                        Probability
                    </Typography>
                    <PieChart prob={data.class_prob}/>
                  </Paper>
              </Grid>
          <Grid item xs={12} md={4}>
              <Paper className={classes.paper}>
                  <Typography variant="h3" align="center" gutterBottom className={classes.h3}>
                      Most Significant Words
                  </Typography>
                    <WordCloud prob={data.text_word_coef}></WordCloud>
              </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
              <Paper className={classes.cardLeft}>
                  <Typography variant="h3" align="center" gutterBottom className={classes.h3}>
                      Top 10 Related Words
                  </Typography>
                  <WordCloud prob={data.most_related_words_in_dict}></WordCloud>
              </Paper>
          </Grid>
      </Grid>
      </section>
    );
}

export default Analysis;