import React, { useState } from "react";
import "react-credit-cards/es/styles-compiled.css";
import { Button, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {
  useStripe,
  CardNumberElement,
  useElements,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import clsx from "clsx";
import StripeInput from "./StripeInput";
import { toast } from "react-toastify";
import paymentInstance from "src/axios-instances/payment";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import publicIp from "public-ip";

import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  fields: {
    padding: "0 2rem",
    [theme.breakpoints.down("md")]: {
      padding: "0 0.5rem",
    },
  },
  form: {
    padding: "2rem",
  },
  orderButtonContainer: {
    paddingTop: "1rem",
    width: "100%",
  },
  orderButton: {
    backgroundColor: "#F1E4FF",
    color: "#8C30F5",
    fontSize: "0.8rem",
    marginTop: "1.2rem",
    fontWeight: 600,
    borderRadius: "5px",
    padding: "20px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "15px 0",
    },
  },
  inputField: {
    borderRadius: "5px",
    "& ::placeholder": {
      color: "gray",
    },
  },
  forme: {
    width: "85%",
  },
}));

const CreditCardForm = (props) => {
  const stripe = useStripe();
  const classes = useStyles();
  const stripeElements = useElements();
  const [error, setError] = useState("");

  const router = useRouter();

  const schema = yup.object().shape({
    name: yup.string().min(3, "Minimum 3 Characters"),
    email: yup
      .string()
      .required("Email is Required")
      .email("Please Enter a Valid Email"),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
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
  const onSubmit = async (e) => {
    const toastid = toast.loading("Payment under processing");
    props.setLoading(true);
    try {
      const CardNumber = stripeElements.getElement("cardNumber");
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: CardNumber,
      });
      if (paymentMethod) {
        const ipAddress = await publicIp.v4();
        const response = await paymentInstance.post("/pay", {
          amount: props.price,
          paymentId: paymentMethod?.id,
          type: "stripe",
          name: name,
          email: email,
          ipAddress,
          slug: props.slug,
          bookId: props.bookId,
        });
        toast.update(toastid, {
          render: `${response.data.message}`,
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setError("");
        props.setLoading(false);
        router.push(
          `/homework-help/checkout-invoice?vqt=${response.data.orderToken}`
        );
      }
      if (error) {
        setError(error?.code);
        toast.dismiss(toastid);
        props.setLoading(false);
      }
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

  return (
    <div key="Payment">
      <Grid
        direction="column"
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
        className={clsx([classes.form])}
      >
        <form onSubmit={handleSubmit(onSubmit)} className={classes.forme}>
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
                InputProps={{
                  className: classes.inputField,
                }}
                error={errors.name ? true : false}
                helperText={errors.name && errors.name?.message}
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
            <Grid item xs={12} md={12}>
              <TextField
                type="tel"
                name="number"
                fullWidth
                className={classes.inputField}
                variant="outlined"
                label="Card Number"
                error={error === "incomplete_number" ? true : false}
                helperText={error === "incomplete_number" && error}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputComponent: StripeInput,
                  inputProps: {
                    component: CardNumberElement,
                  },
                  name: "number",
                }}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                type="tel"
                name="expiry"
                fullWidth
                className={classes.inputField}
                variant="outlined"
                label="Expiry"
                InputLabelProps={{ shrink: true }}
                error={error === "incomplete_expiry" ? true : false}
                helperText={error === "incomplete_expiry" && error}
                InputProps={{
                  inputComponent: StripeInput,
                  inputProps: {
                    component: CardExpiryElement,
                  },
                  name: "number",
                }}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                type="tel"
                name="cvc"
                fullWidth
                className={classes.inputField}
                variant="outlined"
                label="CVC"
                error={error === "incomplete_cvc" ? true : false}
                helperText={error === "incomplete_cvc" && error}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  inputComponent: StripeInput,
                  inputProps: {
                    component: CardCvcElement,
                  },
                  name: "cvc",
                }}
              />
              {/* <CardCvcElement /> */}
            </Grid>
          </Grid>

          <Grid item xs={12} className={classes.orderButtonContainer}>
            <Button
              type="submit"
              className={classes.orderButton}
              disableElevation
              variant="contained"
              fullWidth
              disabled={!stripe}
            >
              Place Order
            </Button>
          </Grid>
        </form>
        <label>
          By clicking the button you are agree to our Terms and Conditions and
          Privacy Policy.
        </label>
      </Grid>
    </div>
  );
};

export default CreditCardForm;
