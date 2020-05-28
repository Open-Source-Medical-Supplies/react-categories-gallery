import {API_KEY} from '../env.js';

const Airtable = require('airtable');
const base = new Airtable({apiKey: API_KEY}).base('apppSjiUMTolFIo1P');

const views = {
  gridView: 'Grid view',
  defaultView: 'Default View'
}

export const AirtableHelpers = {
  filterRecords: (r) => r.map(({fields}) => fields).filter(field => field.staging !== true)
}


export async function getCategories() {
  return base('Category Information').select({ view: views.gridView });
}

/**
 * 
 * @param {string[]} links
 * @returns {Promise<any[]>}
 */
export async function getCatgeoryLinks(links) {
  return base('Engineered Project Pages').select({view: views.defaultView})
}
