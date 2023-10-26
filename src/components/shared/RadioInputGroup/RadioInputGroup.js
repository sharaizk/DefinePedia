import { FormControl, FormHelperText, FormLabel, RadioGroup, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import React from 'react'


const RadioInputGroup = (props) => {

  const useStyles = makeStyles(theme => ({
    radioGroup: {
      display: 'inline'
    },
    label: {
      fontWeight: 600
    }
  }));

  const classes = useStyles();
  return (
    <FormControl component="fieldset" error={props.error ? true : false} >
      <FormLabel component="legend" >
        <Typography className={classes.label} variant="body1"> {props.label} </Typography>
      </FormLabel>
      <RadioGroup aria-label={props.name} name={props.name} className={classes.radioGroup}>
        {props.children}
      </RadioGroup>
      <FormHelperText>{props.error && props.helperText}</FormHelperText>
    </FormControl>
  )
}

export default RadioInputGroup
