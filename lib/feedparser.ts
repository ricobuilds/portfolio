import Parser from "rss-parser";
let parser = new Parser();

export interface Newsletter {
  title?: string;
  isoDate?: string;
  link?: string;
  guid?: string;
  thumbnail?: string;
}

const feedParser = async () => {
  const feed = await parser
    .parseURL(`https://rss.beehiiv.com/feeds/oQCyCvAZRs.xml`)

  return feed;
}
// pubDate, 
export { feedParser }