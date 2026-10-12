// Page titles for the research section, so they are edited only in src/_data:
// - landing pages (e.g. the Globokar and Pranulyte grids): title and subtitle
//   from researchProjects.json, matched by path;
// - detail pages: title of the project with the same projectId in the data
//   file read by their layout, falling back to the research project title.
const projectSources = {
  "layouts/research-project.njk": "pageProjects",
  "layouts/phd-project.njk": "globokarProjects",
  "layouts/pranulyte-project.njk": "pranuyteProjects",
};

function findResearchProject(data) {
  const url = data.page && data.page.url;
  if (!url || !data.researchProjects) return null;
  return data.researchProjects.find(p => p.path.replace(/\/$/, "") + "/" === url);
}

function findDetailTitle(data) {
  if (!data.projectId) return null;
  const items = data[projectSources[data.layout]] || [];
  const project = items.find(p => p.id === data.projectId);
  if (project && project.title) return project.title;
  const research = (data.researchProjects || []).find(p => p.path.endsWith("/" + data.projectId));
  return research ? research.title || research.name : null;
}

module.exports = {
  eleventyComputed: {
    title: data => {
      const project = findResearchProject(data);
      return (project && project.title) || findDetailTitle(data) || data.title;
    },
    subtitle: data => {
      const project = findResearchProject(data);
      return (project && project.subtitle) || data.subtitle;
    },
  },
};
