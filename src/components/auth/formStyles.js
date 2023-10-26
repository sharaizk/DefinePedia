const { makeStyles } = require("@material-ui/styles");

const useStyles = makeStyles(theme => ({
  root: {},
  fields: {
    margin: theme.spacing(-1),
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      flexGrow: 1,
      margin: theme.spacing(1)
    }
  },
  policy: {
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  radioGroup: {
    display: 'inline'
  },
  spinner: {
    justifyContent: 'center'
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  resetForm: {
    marginTop: theme.spacing(3)
  }

}));

export default useStyles;
