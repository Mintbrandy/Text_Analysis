import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Tabs, Tab, Icon, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import store from "../../store";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: '#232323',
  },
  title: {
    marginRight: theme.spacing(10),
    fontFamily: '"Hepta Slab", serif',
    display:"flex",
    alignItems:"center",
  },
  tab: {
    maxWidth: 50,
  }
}));

function Appbar(props) {
  const classes = useStyles();

  const curPath = props.history.location.pathname;

  const [path, setPath] = React.useState(false);

  const [value, setValue] = React.useState(path);

  if (path !==  curPath) {
    setPath(curPath);
    if (curPath === '/form/sentiment') {
      setValue(0);
    } else {
      if (curPath === '/form/emoji') {
        setValue(1);
      } else {
        setValue(false);
      }
    }
  }

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
            <Link
              variant="h5"
              underline="none"
              color="inherit"
              className={classes.title}
              to="/"
              component={RouterLink}
              onClick = {() => store.dispatch({type: ""})}
            >
              <Icon fontSize="large" >face</Icon>
              {'Prophet'}
            </Link>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab className={classes.tab} label="Sentiment" icon={<Icon>favorite</Icon>} to='/form/sentiment' component={RouterLink} {...a11yProps(0)} />
                <Tab label="Emoji" icon={<Icon>sentiment_satisfied_alt</Icon>} to='/form/emoji' component={RouterLink} {...a11yProps(1)} />
            </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
}


export default Appbar;