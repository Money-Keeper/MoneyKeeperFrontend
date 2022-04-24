namespace Url {
  export const concatUrl = (startUrl: string, endUrl: string) =>
    `${formatUrl(startUrl)}${formatUrl(endUrl)}`;

  const formatUrl = (url: string) => removeStartSlash(addEndSlash(url));

  const removeStartSlash = (url: string) =>
    url.at(0) === '/' ? url.slice(1) : url;

  const addEndSlash = (url: string) => (url.at(-1) === '/' ? url : `${url}/`);
}

export { Url };
