export const preventDefaultEventCallback: React.ReactEventHandler = (e) => {
  e.preventDefault();
  e.stopPropagation();
};