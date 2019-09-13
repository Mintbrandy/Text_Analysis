import React, { useState } from 'react';
import { Button, Box, Container, Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MuiPaper from '@material-ui/core/Paper';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Dialog from './Dialog';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'rgb(254,220,210,0.7)',
  },
  container: {
    margin: theme.spacing(12,2),
    zIndex: 1,
  },
  paper: {
    backgroundColor: '#F4F4F4',
    padding: theme.spacing(5, 4),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8, 6),
    },
    boxShadow: theme.shadows[2],
  },
  form: {
    marginTop: theme.spacing(6),
  },
  field: {
    backgroundColor: theme.palette.common.white,
  },
  label: {
    '&$focused': {
      color: `${theme.palette.secondary.main}`,
    }
  },
  outlinedInput: {
    '&$focused $notchedOutline': {
      borderColor: `${theme.palette.secondary.main}`,
    }
  },
  focused: {},
  notchedOutline: {},
  button: {
    fontFamily: "'Roboto Condensed', sans-serif",
    fontWeight: 700,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  h3: {
    color: "#0A1612",
    fontFamily: "'Roboto Condensed', sans-serif",
    fontWeight: 700,
  },
  background: {
    backgroundImage: `url(${require("./CurvyLines.jpg")})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 72,
    bottom: 0,
    maxHeight:"100%"
  },
}));

function Form(props) {
  const type = props.match.params.id;

  const title = type === "sentiment" ? "Sentiment": "Emoji";

  const postPath = type === "sentiment" ? "http://localhost:8000/analysis/emotion": "http://localhost:8000/analysis/emoji";

    const classes = useStyles();

    const [redirect, setRedirect] = useState(() => false);

    const [text, setText] = useState(() => "");

    const [path, setPath] = useState({
      pathname: "",
      state: {},
    });

    const handleValue = (value) => {
      setText(value);
    };

    const handleChange = (e) => {
      setText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        axios.post(postPath, ({"input_text": text})) 
            .then(res => {
              setPath ({
                pathname: "/" + type + "/result",
                state: {
                  input_text: text,
                  ...res.data,
                }
              });
              setRedirect(true);
            })
            .catch(error => {
                console.log(error);
            });
    };

  if (redirect) {
    return <Redirect to={path}/>;
  }
  return (
    <section className={classes.root}>
        <Grid container justify="center" className={classes.container}>
          <Grid item xs={8} sm={7} md={6} lg={4}>
            <MuiPaper
                elevation={1}
                className={classes.paper}
            >
                <React.Fragment>
                    <Typography variant="h3" gutterBottom marked="center" align="center" className={classes.h3}>
                        { title }
                    </Typography>
                    <Typography variant="body2" align="center">
                        {"Have no idea what to input? "}
                        <Dialog type={type} value={handleValue}>Get a example text here!</Dialog>
                    </Typography>
                </React.Fragment>
                <form onSubmit={handleSubmit} className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        className={classes.field}
                        multiline
                        rows="8"
                        label="Text"
                        placeholder="Input your sentiment text..."
                        margin="normal"
                        name="input_text"
                        fullWidth
                        required
                        InputLabelProps={{
                            shrink:true,
                            classes: {
                                root: classes.label,
                                focused: classes.focused,
                            },
                        }}
                        InputProps={{
                            classes: {
                            root: classes.outlinedInput,
                            focused: classes.focused,
                            notchedOutline: classes.notchedOutline,
                            },
                        }}
                        value={text}
                        onChange={handleChange}
                    />
                    <Button
                        className={classes.button}
                        variant="contained"
                        size="large"
                        color="secondary"
                        fullWidth
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
            </MuiPaper>
          </Grid>
        </Grid> 
        <div className={classes.background}/>
    </section>
  );
}


export default Form;