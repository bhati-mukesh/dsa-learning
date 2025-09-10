

const withAuth = (WrappedComponent) => (props) => {
  const isLoggedIn = !!localStorage.getItem("token");
  return isLoggedIn ? <WrappedComponent {...props} /> : <Navigate to="/login" />;
};

// How to use:
import React from "react";
// import withAuth from "./withAuth";

function Dashboard(props) {
  return <h1>Welcome to your dashboard!</h1>;
}

export default withAuth(Dashboard);


// ==========================================================================

const withLoader = (WrappedComponent) => ({ isLoading, ...props }) => {
    return isLoading ? <Spinner /> : <WrappedComponent {...props} />;
};

// ==========================================================================

function withErrorBoundary(WrappedComponent, FallbackComponent = <p>Something went wrong.</p>) {
  return class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
      return { hasError: true };
    }

    componentDidCatch(error, info) {
      console.error("Error caught in HOC:", error, info);
    }

    render() {
      return this.state.hasError ? FallbackComponent : <WrappedComponent {...this.props} />;
    }
  };
}

// ==========================================================================

import React, { Suspense } from "react";

const withSuspense = (WrappedComponent, fallback = <p>Loading...</p>) => {
  return (props) => (
    <Suspense fallback={fallback}>
      <WrappedComponent {...props} />
    </Suspense>
  );
};

// ==========================================================================

const withLogger = (WrappedComponent) => {
  return (props) => {
    useEffect(() => {
      console.log(`Mounted: ${WrappedComponent.name}`, props);
      return () => console.log(`Unmounted: ${WrappedComponent.name}`);
    }, []);
    return <WrappedComponent {...props} />;
  };
};


// ==========================================================================

const withPermissions = (WrappedComponent, allowedRoles = []) => {
  return (props) => {
    const role = getCurrentUserRole(); // from context/store
    return allowedRoles.includes(role) ? <WrappedComponent {...props} /> : <p>Access denied</p>;
  };
};

// ==========================================================================

const withFormHandling = (WrappedComponent) => {
  return (props) => {
    const [form, setForm] = useState({});

    const handleChange = (e) => {
      setForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form submitted:", form);
    };

    return (
      <WrappedComponent
        {...props}
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    );
  };
};

// ==========================================================================

import { useEffect, useState } from "react";

const withDebounce = (WrappedComponent, delay = 500) => {
  return (props) => {
    const [debouncedValue, setDebouncedValue] = useState(props.value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(props.value);
      }, delay);

      return () => clearTimeout(handler);
    }, [props.value]);

    return <WrappedComponent {...props} debouncedValue={debouncedValue} />;
  };
};


// ==========================================================================

import { useEffect, useState } from "react";

const withWindowSize = (WrappedComponent) => {
  return (props) => {
    const [size, setSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    useEffect(() => {
      const handleResize = () => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return <WrappedComponent {...props} windowSize={size} />;
  };
};


// ==========================================================================

import { useState, useEffect } from "react";

const withOnlineStatus = (WrappedComponent) => {
  return (props) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
      const goOnline = () => setIsOnline(true);
      const goOffline = () => setIsOnline(false);

      window.addEventListener("online", goOnline);
      window.addEventListener("offline", goOffline);

      return () => {
        window.removeEventListener("online", goOnline);
        window.removeEventListener("offline", goOffline);
      };
    }, []);

    return <WrappedComponent {...props} isOnline={isOnline} />;
  };
};


// ==========================================================================

import { useState, useEffect } from "react";

const withPagination = (WrappedComponent, fetchFunction) => {
  return (props) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      fetchFunction(page).then((res) => {
        setData(res.data);
        setLoading(false);
      });
    }, [page]);

    return (
      <WrappedComponent
        {...props}
        data={data}
        page={page}
        loading={loading}
        nextPage={() => setPage((p) => p + 1)}
        prevPage={() => setPage((p) => Math.max(p - 1, 1))}
      />
    );
  };
};


// ==========================================================================

const withClipboard = (WrappedComponent) => {
  return (props) => {
    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text);
    };

    return <WrappedComponent {...props} copyToClipboard={copyToClipboard} />;
  };
};


// ==========================================================================

const withRetry = (WrappedComponent, retries = 3, delay = 1000) => {
  return (props) => {
    const [attempt, setAttempt] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
      const tryFetch = async () => {
        try {
          await props.fetchData(); // Component provides fetchData
        } catch (err) {
          if (attempt < retries) {
            setTimeout(() => setAttempt(attempt + 1), delay);
          } else {
            setError(err);
          }
        }
      };

      tryFetch();
    }, [attempt]);

    return <WrappedComponent {...props} error={error} />;
  };
};


// ==========================================================================

const withTheme = (WrappedComponent, theme = "light") => {
  return (props) => {
    return <WrappedComponent {...props} theme={theme} />;
  };
};


// ==========================================================================


// 💡 Interview Tip: What to say

// "We follow the DRY principle and use HOCs for injecting reusable logic like authentication (withAuth), error boundaries (withErrorBoundary), loading spinners (withLoader), and even utility functions like clipboard copy or pagination. This helps us avoid boilerplate and keeps components focused on rendering UI, not behavior."