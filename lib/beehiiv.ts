import { feedParser } from "./feedparser";

export async function getBBIssues() {
  const feed = await feedParser()
  return feed.items
}

export async function getBBIssue(id: string) {
  const feed = await feedParser()
  const item = feed.items.find(item => item.guid?.includes(id))
  return item
}

export async function getBBInfo() {
  const feed = await feedParser()
  return feed
}