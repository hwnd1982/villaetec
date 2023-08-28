export const debounce = (callback, delay) => {
  let timeId = null; 
  
  return (...args) => {
    timeId !== null && clearTimeout(timeId);
    timeId = setTimeout(() => callback(...args), delay);
  }
};

export const getTrigger = (breakpoint = 768) => {
  let lastWidthValue = 1440;

  return () => {
    const triger = (
        lastWidthValue > innerWidth && innerWidth < breakpoint && lastWidthValue > breakpoint
      ) || (
        lastWidthValue < innerWidth && innerWidth > breakpoint && lastWidthValue < breakpoint
      )

    lastWidthValue = innerWidth;

    return triger;
  };
}; 