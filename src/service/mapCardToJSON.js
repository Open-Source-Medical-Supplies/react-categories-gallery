import { empty } from "../shared/utilities";

// used with full-card
export const CardSections = new Map([
  ['disclaimer', 'Disclaimer'],
  ['problem', 'The Problem'],
  ['currentGlobalResources', 'Current Global Resources'],
  ['engReqs', 'Engineering Requirements'],
  ['fabReqs', 'Assembly/Fabrication Requirements'],
  ['resources', 'Resources'],
  ['designDisclaimers', 'Disclaimer Designs']
]);

export function MapCardToJSON (card) {
  if (!card || empty(card)) return {};
  const categoryKey             = card['Medical Supply Category'][0] || null;
  const categoryName            = card['CategoryName'][0] || null;
  const disclaimer              = card['Disclaimer'] || null;
  const problem                 = card['The Problem'] || null;
  const currentGlobalResources  = card['Current Global Resources'] || null;
  const engReqs                 = card['Engineering Requirements'] || null;
  const fabReqs                 = card['Assembly/Fabrication Requirements']|| null;
  const resources               = card['Resources'] || null;
  const imageURL                = card['Image'] ? card['Image'][0].thumbnails.large.url : null;
  const designDisclaimers       = card['Disclaimer Designs'] || null;

  return {
    categoryKey,
    categoryName,
    disclaimer,
    problem,
    currentGlobalResources,
    engReqs,
    fabReqs,
    resources,
    imageURL,
    designDisclaimers
  };
}