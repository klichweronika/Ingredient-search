import { useEffect, useState } from "react";

function addItemToArray<T>(item: T, array: Array<T>): Array<T> {
  const newArray: Array<T> = [...array];
  const itemIndex = array.indexOf(item);
  if (itemIndex !== -1) {
    newArray.splice(itemIndex, 1);
  }
  newArray.unshift(item);
  newArray.length = Math.min(newArray.length, 10);
  return newArray;
}

function useRecentlySearchedItem(): [string[], (query: string) => void] {
  const [recentlySearchedItem, setRecentlySearchedItem] = useState<string[]>(
    []
  );

  useEffect(() => {
    const localStorageItem = window.localStorage.getItem("recentlySearched");
    const RecentlySearched = localStorageItem
      ? JSON.parse(localStorageItem)
      : [];
    setRecentlySearchedItem(RecentlySearched);
  }, []);

  const addRecentlySearchedItem = (query: string) => {
    if (query === "") return;
    const updatedRequests = addItemToArray(query, recentlySearchedItem);
    window.localStorage.setItem(
      "recentlySearched",
      JSON.stringify(updatedRequests)
    );
    setRecentlySearchedItem(updatedRequests);
  };

  return [recentlySearchedItem, addRecentlySearchedItem];
}

export default useRecentlySearchedItem;
