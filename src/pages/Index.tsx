import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to homepage on mount, replacing history entry
    navigate("/", { replace: true });
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Redirecting...</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta httpEquiv="refresh" content="0; URL='/'" />
      </Helmet>
      <noscript>
        <meta httpEquiv="refresh" content="0; URL='/'" />
        <p>
          If you are not redirected automatically, follow this{" "}
          <a href="/">link to homepage</a>.
        </p>
      </noscript>
    </>
  );
};

export default Index;
