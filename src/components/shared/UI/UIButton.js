import { Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles(theme => ({
    root: {

    },
    small: {

    },
    medium: {

    },
    large: {

    }
}))

const UIButton = (props) => {
    const classes = useStyles();
    const { variant, size, color } = props;

    return (
        <Button
            variant={variant}
            color={color}
            className={clsx([classes.root])}
        >
            {props.children}
        </Button >
    )    
}


export default UIButton