import "../scss/.base/bootstrap-grid.min.css";
import "../scss/.base/locomotive-scroll.css";
import "../styles/globals.scss";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
