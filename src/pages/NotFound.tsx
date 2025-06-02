import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async"; // Changed from react-helmet

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>404 Not Found - VideoSoundEvent</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="The page you are looking for does not exist. Return to the homepage."
        />
      </Helmet>
      <div
        className="min-h-screen flex items-center justify-center bg-gray-100"
        role="alert"
        aria-live="assertive"
      >
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
          <Link
            to="/"
            className="text-blue-500 hover:text-blue-700 underline"
            aria-label="Return to homepage"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;