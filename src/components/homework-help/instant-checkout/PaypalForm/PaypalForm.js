import React from "react";
import ReactDOM from "react-dom";
import { Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import paymentInstance from "src/axios-instances/payment";
import publicIp from "public-ip";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: "2rem",
    height: "100%",
  },
  forme: {
    width: "85%",
  },
  fields: {
    padding: "0 2rem",
    [theme.breakpoints.down("md")]: {
      padding: "0 0.5rem",
    },
  },
  inputField: {
    borderRadius: "5px",
    "& ::placeholder": {
      color: "gray",
    },
  },
}));

const PaypalForm = (props) => {
  console.log(props);
  const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });
  const classes = useStyles();
  const router = useRouter();
  const schema = yup.object().shape({
    name: yup.string().min(3, "Minimum 3 characters"),
    email: yup
      .string()
      .required("Email is required")
      .email("Enter a valid email"),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    mode: "onsubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
    },
    resolver: yupResolver(schema),
    criteriaMode: "firstError",
    shouldUnregister: true,
  });
  const { name, email } = watch();
  const onSubmit = async (paymentToken) => {
    const toastid = toast.loading("Payment under processing");
    try {
      const ipAddress = await publicIp.v4();
      const response = await paymentInstance.post("/paypal-pay", {
        amount: props.price,
        type: "paypal",
        paymentToken: paymentToken,
        name: name,
        email: email,
        ipAddress: ipAddress,
        slug: props.slug,
        bookId: props.bookId,
      });
      toast.update(toastid, {
        render: `${response.data.message}`,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      props.setLoading(false);
      router.push(
        `/homework-help/checkout-invoice?vqt=${response.data.orderToken}`
      );
    } catch (error) {
      toast.update(toastid, {
        render: `${error?.error}`,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      props.setLoading(false);
    }
  };

  const createOrder = (data, actions) => {
    if (!name || !email) {
      throw new Error("Please fill the form");
    }
    clearErrors()
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: props.price,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    onSubmit(data.orderID);
    return actions.order.capture();
  };

  return (
    <Grid
      className={classes.form}
      container
      spacing={4}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4} className={classes.fields}>
          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              name="name"
              fullWidth
              label="Name"
              placeholder="Name"
              variant="outlined"
              inputRef={register()}
              InputLabelProps={{ shrink: true }}
              error={errors.name ? true : false}
              helperText={errors.name && errors.name?.message}
              InputProps={{
                className: classes.inputField,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="email"
              name="email"
              fullWidth
              className={classes.inputField}
              label="Email"
              placeholder="Email"
              variant="outlined"
              inputRef={register()}
              InputLabelProps={{ shrink: true }}
              error={errors.email ? true : false}
              helperText={errors.email && errors.email?.message}
              InputProps={{
                className: classes.inputField,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <PayPalButton
              createOrder={(data, actions) => createOrder(data, actions)}
              onApprove={(data, actions) => onApprove(data, actions)}
              onError={(error) => {
                if (!name) {
                  setError("name", {
                    type: "name",
                    message: "Name is required",
                  });
                }
                if (!email) {
                  setError("email", {
                    type: "email",
                    message: "Email is required",
                  });
                }
              }}
            />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default PaypalForm;
