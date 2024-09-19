import { useState, useEffect, useMemo } from "react";

type FilterFunction<T> = (item: T, query: string) => boolean;

const useSearch = <T,>(items: T[], filterFunction: FilterFunction<T>) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;
    return items.filter((item) => filterFunction(item, searchQuery));
  }, [searchQuery, items, filterFunction]);

  return {
    searchQuery,
    setSearchQuery,
    filteredItems,
  };
};

export default useSearch;
