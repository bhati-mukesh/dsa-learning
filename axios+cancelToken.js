const controllers = new Map();

api.interceptors.request.use(config => {
  if (config.cancelTokenKey) {
    if (controllers.has(config.cancelTokenKey)) {
      // Cancel previous request with same key
      controllers.get(config.cancelTokenKey).abort();
    }
    const controller = new AbortController();
    config.signal = controller.signal;
    controllers.set(config.cancelTokenKey, controller);
  }
  return config;
});

// Then when calling:
api.get("/user/profile", { cancelTokenKey: "getUserProfile" });

// This cancels the previous request with the same cancelTokenKey before sending the new one.