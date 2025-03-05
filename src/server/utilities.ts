import fs from "fs/promises";
import { Request } from "express";

const SEOMetadata = {
  "/": {
    title: "Welcome to my React App",
    description: "This is a short description for my React app",
  },
  "/about": {
    title: "About my React App",
    description: "This is a short description for the About page",
  },
};

const prepare = async (path: string, req: Request) => {
  try {
    // read file data
    let data = await fs.readFile(path, "utf8");
    // get metadata for page
    const { title, description } = SEOMetadata[req.path] || {
      // fallback metadata
      title: "Page Not Found",
      description: "Could not find this page",
    };
    // replace placeholders in file data with real values
    data = data.replace(/\$OG_TITLE/g, title);
    data = data.replace(/\$OG_DESCRIPTION/g, description);

    return data;
    // catch error from reading file
  } catch (error) {
    return "ERROR";
  }
};

export { prepare };
