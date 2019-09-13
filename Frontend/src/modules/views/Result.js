import React from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Fab, Paper, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const backgroundImage =
    "https://gratisography.com/thumbnails/gratisography-artist-paint-brushes-thumbnail.jpg"

const useStyles = makeStyles(theme => ({
        root: {
            display: "flex",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
        },
        paper: {
            backgroundColor: "#e7dfdd",
            padding: theme.spacing(5,4),
            [theme.breakpoints.up('md')]: {
                padding: theme.spacing(6, 6),
            },
        },
        h3: {
            color: "#373737",
            fontFamily: "'Roboto Condensed', sans-serif",
            fontWeight: 700,
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        sentence: {
            color: "#373737",
            fontFamily: "'Indie Flower', cursive",
        },
        box: {
            marginTop: theme.spacing(8),
        },
        link: {
            color: "#373737",
        },
        result: {
            color: "#ab987a",
            fontFamily:"'Kaushan Script', cursive",
        },
        background: {
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: 'center',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            zIndex: -1,
        },
    })
);

function Result(props) {
    const classes = useStyles();

    const type = props.match.params.id;

    const data = props.location.state;

    const path = {
        pathname: "/" + type + "/analysis",
        state: {
            ...data
        }
    }

    if (!data) {
        return <Redirect to="/form/sentiment"/>;
    }

    return (
        <section className={classes.root}>
            <Container maxWidth="sm">
                <Box mt={12} mb={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="h3" align="center" gutterBottom className={classes.h3}>
                            The {type} for
                        </Typography>
                        <Typography variant="h6" align="center" className={classes.sentence}>
                            { data.input_text }
                        </Typography>
                        <Typography variant="h3" align="center" gutterBottom className={classes.h3}>
                        is
                        </Typography>
                        <Typography variant="h1" align="center" className={classes.result}>
                            { data.p_label }
                        </Typography>
                        <Box align="center" className={classes.box}> 
                            <Typography className={classes.link} variant="overline" align="center" underline="always" to={path} component={RouterLink}>
                                Discover More
                            </Typography>
                            <br/>
                            <Fab color="secondary" to={path} component={RouterLink}>
                                <ExpandMoreIcon />
                            </Fab>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </section>
    );
}

export default Result;