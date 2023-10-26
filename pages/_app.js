import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import { Provider as StoreProvider } from "react-redux";
import { configureStore } from "./../src/store";
import { Provider as AuthProvider } from "next-auth/client";
import Router, { useRouter } from "next/router";
import AuthLayout from "../src/layouts/Auth";
import WebLayout from "../src/layouts/Web";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { SWRConfig } from "swr";
import "react-toastify/dist/ReactToastify.css";
import "styles/globals.css";
import dynamic from "next/dynamic";
import ProgressBar from "@badrap/bar-of-progress";
const store = configureStore();
export default function MyApp(props) {
  const ScrollTop = dynamic(() => import("../src/components/ScrollTop"), {
    ssr: false,
  });
  const { Component, pageProps } = props;
  const router = useRouter();
  const pathName = router.pathname;
  let authLayout = false;
  let solutionLayout = false;
  if (pathName.includes("/auth")) {
    authLayout = true;
  } else if (
    (pathName.includes("/homework-help") || pathName.includes("/")) &&
    !pathName.includes("/membership-verification")
  ) {
    solutionLayout = true;
  }
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const progress = new ProgressBar({
    size: 3,
    color: "#9A0FBF",
    className: "bar-of-progress",
    delay: 100,
  });

  React.useEffect(() => {
    Router.events.on("routeChangeStart", progress.start);
    Router.events.on("routeChangeComplete", progress.finish);
    Router.events.on("routeChangeError", progress.finish);
  }, []);

  return (
    <AuthProvider session={props.session}>
      <StoreProvider store={store}>
        <SWRConfig
          value={{
            fetcher: (url) => {
              axios(url).then((r) => r.data);
            },
          }}
        >
          <Head>
            <title>Define Pedia</title>
            <meta
              name="viewport"
              content="minimum-scale=1.0, initial-scale=1.0, width=device-width"
            />
          </Head>
          <ToastContainer
            position="bottom-center"
            autoClose={50}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            pauseOnHover={false}
          />
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <ScrollTop />
            {authLayout ? (
              <AuthLayout>
                <Component {...pageProps} />
              </AuthLayout>
            ) : solutionLayout ? (
              <WebLayout>
                <Component {...pageProps} />
              </WebLayout>
            ) : (
              <Component {...pageProps} />
            )}
          </ThemeProvider>
        </SWRConfig>
      </StoreProvider>
    </AuthProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
