import React from 'react'
import { Pagination as MaterialPaginate } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';

const useStyle=makeStyles(theme=>({
  boxes:{
    '& .MuiPaginationItem-outlinedPrimary':{
      background:'#FFF',
      fontWeight:700
    },
    '& .MuiPaginationItem-outlinedPrimary.Mui-selected':{
      border:'1px solid #730C8F',
      color:'#730C8F',
      fontWeight:500
    }
  }
}))

const Pagination = (props) => {
  const smallerScreen = useMediaQuery('(max-width:480px)')
  const size=smallerScreen ? "small" : ""
  const classes=useStyle()
  const { count, handleChange } = props;
  return (
    <MaterialPaginate size={size}  count={count} page={props.defaultPage} variant="outlined" className={classes.boxes} shape="rounded" color="primary" onChange={handleChange} />
  )
}


export default Pagination;
