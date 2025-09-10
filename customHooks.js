

// Delays a value update (e.g. for search inputs)
import { useState, useEffect } from 'react';

function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}



// Detects internet connectivity.
function useOnlineStatus() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return online;
}


// Manage Form State
function useForm(initialState = {}) {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => setForm(initialState);

  return [form, handleChange, resetForm];
}

// Run logic repeatedly
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => { savedCallback.current = callback; }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}


// Toggle Boolean State (like modal open/close)
function useToggle(initial = false) {
  const [state, setState] = useState(initial);
  const toggle = () => setState((prev) => !prev);
  return [state, toggle];
}

// Copy text to clipboard
function useClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return [copied, copy];
}

// Get Previous Value
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


// Detect Click Outside an Element
function useOutsideClick(ref, callback) {
  useEffect(() => {
    const handler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, callback]);
}


// Persistent State in LocalStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  const setStoredValue = (val) => {
    setValue(val);
    localStorage.setItem(key, JSON.stringify(val));
  };

  return [value, setStoredValue];
}


// Add/Remove DOM event listeners
function useEventListener(eventName, handler, element = window) {
  useEffect(() => {
    if (!element) return;

    element.addEventListener(eventName, handler);
    return () => element.removeEventListener(eventName, handler);
  }, [eventName, handler, element]);
}

// Update browser tab title
function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

// Get current scroll position
function useScrollPosition() {
  const [scrollPos, setScrollPos] = useState(window.scrollY);

  useEffect(() => {
    const onScroll = () => setScrollPos(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return scrollPos;
}


// Persisted Theme Toggle
function useDarkMode() {
  const [isDark, setIsDark] = useLocalStorage('dark-mode', false);

  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
  }, [isDark]);

  return [isDark, () => setIsDark((prev) => !prev)];
}


// Prevent state update on unmounted components
function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  return isMounted;
}

// ✅ Example Usage
// 🧪 Problem Without useIsMounted
function UserProfile() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchUserData().then((res) => {
      // 🔴 Problem: If component unmounted before this runs
      setData(res); // React will warn about memory leak
    });
  }, []);
}

// ✅ Safe Version Using useIsMounted
function UserProfile() {
  const [data, setData] = useState(null);
  const isMounted = useIsMounted();

  useEffect(() => {
    fetchUserData().then((res) => {
      if (isMounted.current) {
        setData(res);
      }
    });
  }, []);
}