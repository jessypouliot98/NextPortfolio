export const urlWithQuery = (url: string, query?: Record<string, string | number | undefined>) => {
  if (!query || Object.keys(query).length === 0) {
    return url;
  }

  const queryString = new URLSearchParams(query as any);

  return `${url}?${queryString}`;
};
