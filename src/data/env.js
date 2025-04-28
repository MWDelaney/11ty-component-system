export default function() {
  return {
    siteUrl: process.env.URL,
    branch: process.env.BRANCH,
    environment: process.env.ELEVENTY_ENV || "development",
  };
};
