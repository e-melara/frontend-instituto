interface ILocalStorage {
  key: string;
  value?: Object;
}

export const useLocalStorage = () => {
  const localStorage = window.localStorage;
  return {
    setItemFn: ({ key, value }: ILocalStorage) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    getItemFn: ({ key }: ILocalStorage) => {
      const data = localStorage.getItem(key) || undefined;
      if (data === undefined) {
        return undefined;
      }
      try {
        return JSON.parse(data);
      } catch (error) {
        return undefined;
      }
    },
    remove: ({ key }: ILocalStorage) => {
      localStorage.removeItem(key);
    },
    removeAll: () => {
      localStorage.clear();
    },
  };
};
