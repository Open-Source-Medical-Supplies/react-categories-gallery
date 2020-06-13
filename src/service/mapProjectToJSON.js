export function MapProjectToJSON (project) {
  if (!project) return;
  const name            = project['Full Project Name'];
  const description     = project['Description'];
  const attributionOrg  = project['Attribution Organization'];
  const creator         = project['Creator'] || '';
  const displayName     = project['Display Name'] ? project['Display Name'][0] : '';
  const reviewStatus    = project['Review Status'] ? project['Review Status'][0] : '';
  const externalLink    = project['Link'] ? project['Link'].split(';')[0].trim() : '';
  const imageURL        = project.HeaderImage ? project.HeaderImage[0].thumbnails.large.url : null;

  return {
    name,
    description,
    attributionOrg,
    creator,
    displayName,
    reviewStatus,
    externalLink,
    imageURL
  }
}