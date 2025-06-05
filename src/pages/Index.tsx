import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to homepage on mount, replacing history entry
    navigate("/", { replace: true });
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Redirecting to VideoSoundEvent</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="Redirecting to the VideoSoundEvent homepage..."
        />
        <meta property="og:title" content="Redirecting to VideoSoundEvent" />
        <meta
          property="og:description"
          content="Redirecting to the VideoSoundEvent homepage..."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://videosoundevents.com/" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Redirecting to VideoSoundEvent" />
        <meta
          name="twitter:description"
          content="Redirecting to the VideoSoundEvent homepage..."
        />
      </Helmet>
      <div
        className="min-h-screen flex items-center justify-center bg-gray-100"
        role="alert"
        aria-live="assertive"
      >
        <div className="text-center px-4">
          <p className="text-xl text-gray-600 mb-6">
            Redirecting to homepage...
          </p>
          <a
            href="/"
            className="text-blue-500 hover:text-blue-700 underline"
            aria-label="Go to homepage"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </>
  );
};

export default Index;
