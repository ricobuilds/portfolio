import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

interface ArticleMetadata {
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  type: ArticleType;
}

type ArticleType = 'How-To Guide' | 'Listicle' | 'Case Study' | 'Opinion Piece' | 'News Update';

const articleTypes: ArticleType[] = [
  'How-To Guide',
  'Listicle',
  'Case Study',
  'Opinion Piece',
  'News Update'
];

function promptUser(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function chooseArticleType(): Promise<ArticleType> {
  console.log('Choose an article type:');
  articleTypes.forEach((type, index) => {
    console.log(`${index + 1}. ${type}`);
  });

  while (true) {
    const choice = await promptUser('Enter the number of your choice: ');
    const index = parseInt(choice) - 1;
    if (index >= 0 && index < articleTypes.length) {
      return articleTypes[index];
    }
    console.log('Invalid choice. Please try again.');
  }
}

async function gatherMetadata(): Promise<ArticleMetadata> {
  const title = await promptUser('Enter article title: ');
  const description = await promptUser('Enter article description: ');
  const date = new Date().toISOString();
  const tagsInput = await promptUser('Enter tags (comma-separated): ');
  const tags = tagsInput.split(',').map(tag => tag.trim());
  const author = await promptUser('Enter author name: ');
  const type = await chooseArticleType();

  return { title, description, date, tags, author, type };
}

function generateMDXTemplate(metadata: ArticleMetadata): string {
  const frontmatter = `---
title: "${metadata.title}"
description: "${metadata.description}"
date: "${metadata.date}"
modifiedDate: ""
tags: [${metadata.tags.map(tag => `"${tag}"`).join(', ')}]
author: "${metadata.author}"
type: "${metadata.type}"
---

# ${metadata.title}

`;

  let content = '';

  // TODO: #1 Update article templates
  switch (metadata.type) {
    case 'How-To Guide':
      content = `
## Introduction
Briefly explain what this guide will teach and why it's important.

## Prerequisites
List any requirements or prior knowledge needed.

## Step 1: [First Step]
Detailed explanation of the first step.

## Step 2: [Second Step]
Detailed explanation of the second step.

## Step 3: [Third Step]
Detailed explanation of the third step.

## Conclusion
Summarize what the reader has learned and suggest next steps.
`;
      break;
    case 'Listicle':
      content = `
## Introduction
Explain the purpose of this list and why it's valuable.

## 1. [First Item]
Description of the first item.

## 2. [Second Item]
Description of the second item.

## 3. [Third Item]
Description of the third item.

## Conclusion
Summarize the key takeaways from the list.
`;
      break;
    case 'Case Study':
      content = `
## Background
Provide context about the subject of the case study.

## Challenge
Describe the problem or challenge that was faced.

## Solution
Explain the approach taken to address the challenge.

## Implementation
Detail how the solution was put into practice.

## Results
Share the outcomes and impact of the solution.

## Key Takeaways
Summarize the main lessons learned from this case study.
`;
      break;
    case 'Opinion Piece':
      content = `
## Introduction
Present your main argument or perspective.

## Context
Provide background information on the topic.

## Point 1: [First Argument]
Elaborate on your first supporting point.

## Point 2: [Second Argument]
Elaborate on your second supporting point.

## Point 3: [Third Argument]
Elaborate on your third supporting point.

## Counterarguments
Address potential opposing viewpoints.

## Conclusion
Summarize your position and its implications.
`;
      break;
    case 'News Update':
      content = `
## Breaking News
Summarize the key news item.

## Background
Provide context for the news.

## Details
Elaborate on the specifics of the news item.

## Impact
Discuss the potential effects or consequences.

## Expert Opinions
Include relevant quotes or insights from experts.

## Next Steps
Outline what to expect moving forward.
`;
      break;
  }

  return frontmatter + content;
}

function sanitizeFilename(filename: string): string {
  return filename.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

async function main() {
  const metadata = await gatherMetadata();
  const mdxContent = generateMDXTemplate(metadata);

  const sanitizedTitle = sanitizeFilename(metadata.title);
  const fileName = `${sanitizedTitle}.mdx`;
  const filePath = path.join(process.cwd(), 'content', 'blog', fileName);

  fs.writeFileSync(filePath, mdxContent);
  console.log(`Article template created: ${filePath}`);

  rl.close();
}

main().catch(console.error);