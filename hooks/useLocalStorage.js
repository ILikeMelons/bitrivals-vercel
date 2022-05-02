import { useState } from 'react';
import ls from 'localstorage-slim';
import encUTF8 from 'crypto-js/enc-utf8';
import AES from 'crypto-js/aes';

ls.config.encrypt = true;             // global encryption
ls.config.secret = 'CryptoIsAw3424sesomenessadwsadercsdada';   // global secret

function useLocalStorage(key, initialValue) {

    // update localstorage-slim
    
    ls.config.encrypter = (data, secret) => AES.encrypt(JSON.stringify(data), secret).toString();
    ls.config.decrypter = (data, secret) => {
      try {
        return JSON.parse(AES.decrypt(data, secret).toString(encUTF8));
      } catch (e) {
        // incorrect/missing secret, return the encrypted data instead
        return data;
      }
    };
 
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
      if (typeof window === "undefined") {
        return initialValue;
      }
      try {
        // Get from local storage by key
        const item = ls.get(key);

        // Parse stored json or if none return initialValue
        return item;
      } catch (error) {
        // If error also return initialValue
        (error);
        return initialValue;
      }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        if (typeof window !== "undefined") {
          ls.set(key, valueToStore);
        }
      } catch (error) {
        // A more advanced implementation would handle the error case
        (error);
      }
    };
    return [storedValue, setValue];
  }

export default useLocalStorage;