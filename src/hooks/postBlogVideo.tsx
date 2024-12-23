import { useCallback } from "react";

  type BlogContent = {
    header: string;
    smallDescription: string;
    body: string;
  };
  

const useLocalStorageVideo = () => {
    const STORAGE_KEY = 'PostVideos';

    const saveToLocalStorage = useCallback(
        (label: string, value: string | File | BlogContent, Storekey: string) => {
          // Retrieve the current storage data or initialize as an empty object
          const dataObject = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    
          // If the key doesn't exist in the storage object, initialize it as an empty object
          if (!dataObject[Storekey]) {
            dataObject[Storekey] = {};
          }
    
          // Save or update the label-value pair for the specific key
          dataObject[Storekey][label] = value;
    
          // Save the updated data back to localStorage
          localStorage.setItem(STORAGE_KEY, JSON.stringify(dataObject));
        },
        [],
      );

      const getFromLocalStorage = useCallback(() => {
        // Retrieve and parse the stored data
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      }, []);

      const getByKeyFromLocalStorage = useCallback((key: string) => {
        const dataObject = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
        return dataObject[key] || null;
      }, []);

      const deleteFromLocalStorage = useCallback(
        (label: string, Storekey: string) => {
          const dataObject = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    
          // Check if Storekey and label exist in the data object
          if (dataObject[Storekey] && dataObject[Storekey][label]) {
            delete dataObject[Storekey][label];
    
            // If the Storekey object becomes empty, delete it as well
            if (Object.keys(dataObject[Storekey]).length === 0) {
              delete dataObject[Storekey];
            }
    
            localStorage.setItem(STORAGE_KEY, JSON.stringify(dataObject));
          }
        },
        [],
      );

      return {
        saveToLocalStorage,
        getFromLocalStorage,
        getByKeyFromLocalStorage,
        deleteFromLocalStorage,
      };
}

export default useLocalStorageVideo