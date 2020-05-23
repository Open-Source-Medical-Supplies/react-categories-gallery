import {API_KEY} from '../env.js';

const Airtable = require('airtable');
const base = new Airtable({apiKey: API_KEY}).base('apppSjiUMTolFIo1P');

export async function getCategories() {
  return base('Category Information').select({
    view: "Grid view",
  });
}
