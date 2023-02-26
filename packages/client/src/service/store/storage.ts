interface ItemWrap {
  object: any;
  objectType: string;
}

export const localStorageService = () => {
  return {
    get(itemName: string): any {
      const item = localStorage.getItem(itemName);
      if (item) {
        const itemWrap: ItemWrap = JSON.parse(item);

        return itemWrap.objectType === 'string'
          ? itemWrap.object
          : JSON.parse(itemWrap.object);
      } else {
        throw new Error(`Element by key: '${itemName}' not found!`);
      }
    },

    set(itemName: string, item: any): void {
      localStorage.setItem(itemName, JSON.stringify(getItemWrap(item)));
    },

    remove(itemName: string): void {
      localStorage.removeItem(itemName);
    },
  };
};

const getItemWrap = (item: any): ItemWrap => {
  const itemType = typeof item;
  item = itemType === 'object' ? JSON.stringify(item) : item;
  const itemWrap: ItemWrap = {
    object: item,
    objectType: itemType,
  };
  return itemWrap;
};
