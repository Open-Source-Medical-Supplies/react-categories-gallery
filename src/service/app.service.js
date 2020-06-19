import { getCategories, getCatgeoryLinks, AirtableHelpers } from "./airtable";
import { notEmpty } from "../shared/utilities";

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

const getParam = () => window.location && window.location.search ?
    decodeURI(window.location.search.split('category=')[1]) :
    undefined;

export const fetchData = async(setState) => {
  Promise.all([
    setCategories(), 
    setLinks()
  ]).then(
    res => {
      const param = getParam();
      if (param) {
        const selectedCard = res[0]._records.find(r => r['CategoryName'][0] === param) || {};

        setState({
          ...res[0],
          ...res[1],
          selectedCard,
          visible: notEmpty(selectedCard)
        });
      } else {
        setState({
          ...res[0],
          ...res[1]
        });
      }
    },
    e => console.warn(e)
  )
}