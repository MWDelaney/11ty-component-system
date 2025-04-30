export default function() {
  return {
    siteUrl: process.env.URL,
    branch: process.env.BRANCH,
    repo: process.env.REPO,
    environment: process.env.ELEVENTY_ENV || "development",
  };
};
