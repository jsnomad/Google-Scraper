export const urlSearch = (tld, language, results, keyword) => {
  return `http://www.google.${tld}/search?hl=${language}&num=${results}&q=${keyword}`
};
export const selectorSearch = 'h3.r a'
