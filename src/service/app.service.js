import { getCategories, getCatgeoryLinks, AirtableHelpers } from "./airtable";

const handleError = (e) => { console.warn(e); return e; }

/**
 * @returns {Promise<{
  records: {};
  _records: {};
 }>}
 */
export const setCategories = async () => {
  let temp;
  await getCategories().then(async(rows) => {
    const records = await rows.all();
    const simpleRecords = AirtableHelpers.filterRecords(records);
    temp = {
      records: simpleRecords,
      _records: simpleRecords,
    };
  });
  return temp;
};

/**
 * @returns {Promise<{
  [key: string]: {}
 }[]>}
 */
export const setLinks = async () => {
  let temp;
  await getCatgeoryLinks().then(async(links) => {
    const records = await links.all();
    const simpleRecords = AirtableHelpers.filterRecords(records);
    temp = simpleRecords.reduce((acc, link) => {
      const name = link["web-name"]; // matches to 'Medical Supply Category' / categoryKey
      if (acc[name]) {
        acc[name].push(link);
      } else {
        acc[name] = [link];
      }
      return acc;
    }, {});
  });
  return {projectLinks: temp};
};
