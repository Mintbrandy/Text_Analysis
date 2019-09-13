import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const sentimentTexts = [
    "I really like this restaurant! It has the best food in this area. Amazing taste and awesome smell. Love it!",
    "Favorite sushi spot. Chef is awesome and quality of the fish and rice is above other sushi bars here in vegas.",
    "Beautiful country style and very home styled  restaurant. The staff is friendly and quick. The apple sauce pancakes sent me to heaven.",
    "Should be no star. internet has charge? the heck! most of the hotels offer it for free this hotel sucks!",
    "All batter no fish fry.Burger cold and red in middle. They offered to 'put it back on.' Not worth the wait and tater tots (only + in dining experience).",
    "Disappointing draft list. With a name like Pints on Penn I expected a great beer choice...of the 5 or 6 selections offered only 2 were available."
];

const emojiTexts = [
  'All you can say at this point is "Ahhh" lol',
  "So much love for you cutie",
  "Absolutely gorgeous and beautiful Sunny day on the beachnice…",
  "Christmas Eve in Glen Ridge - adorable!"
];

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function getRandomItems(items) {
    return items[Math.floor(Math.random()*items.length)];
}


function Dialogs(props) {
  const children = props.children;

  const [open, setOpen] = React.useState(false);

  const [type, setType] = React.useState(props.type);

  const texts = props.type === "sentiment"? sentimentTexts: emojiTexts;

  const [text, setText] = React.useState(getRandomItems(texts));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = () => {
      let nextText = text;
      while (text === nextText) {
          nextText = getRandomItems(texts);
      }
      setText(nextText);
  };

  const handleUse = () => {
      handleClose();
      props.value(text);
  };

  if (type !== props.type) {
    setType(props.type);
    setText(getRandomItems(texts));
    props.value("");
  }

  return (
    <span>
        <Link align="center" underline="always" color="secondary" onClick={handleClickOpen} >
            { children }
        </Link>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Example Input Text
            </DialogTitle>
            <DialogContent dividers>
            <Typography gutterBottom>
                { text }
            </Typography>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleChange} color="secondary">
                Change
            </Button>
            <Button onClick={handleUse} color="secondary">
                Use
            </Button>
            </DialogActions>
        </Dialog>
    </span>
  );
}


export default Dialogs;