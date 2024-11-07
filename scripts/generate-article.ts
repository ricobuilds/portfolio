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

type ArticleType = 'How-To Guide' | 'Listicle' | 'Case Study' | 'Opinion Piece' | 'News Update' | 'Product Announcement';

const articleTypes: ArticleType[] = [
  'How-To Guide',
  'Listicle',
  'Case Study',
  'Opinion Piece',
  'News Update',
  'Product Announcement',
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
{{context}}

In this guide, you'll learn how to {{goal}}. Whether you're a beginner or an expert, these steps will help you achieve {{goal}} efficiently.

## Prerequisites

Before you start, make sure you have the following:

- {{prerequisite_1}}
- {{prerequisite_2}}
- {{prerequisite_3}}

## Step-by-Step Guide

### Step 1: {{step_1_title}}

{{step_1_description}}

\`\`\`
{{step_1_code}}
\`\`\`

### Step 2: {{step_2_title}}

{{step_2_description}}

\`\`\`
{{step_2_code}}
\`\`\`

### Step 3: {{step_3_title}}

{{step_3_description}}

\`\`\`
{{step_3_code}}
\`\`\`

## Common Issues and Troubleshooting

### Issue 1: {{issue_1}}

**Solution**: {{solution_1}}

### Issue 2: {{issue_2}}

**Solution**: {{solution_2}}

## Conclusion

By following these steps, you should now be able to {{goal}}. If you have any questions or run into issues, feel free to leave a comment below or reach out to me directly.

Happy coding!

---

# About the Author

![{{author_name}}]({{author_picture}})
{{author_name}} is a {{author_title}} who specializes in {{author_specialization}}. You can follow them on [Twitter](url) and [LinkedIn](url).
`;
      break;
    case 'Listicle':
      content = `{{context}}

In this article, we will explore {{topic}}. Here's a list of {{number}} {{topic_items}} for {{use_case}}.

## {{list_item_1_title}}

{{list_item_1_description}}

![{{list_item_1_image_alt}}]({{list_item_1_image_url}})

## {{list_item_2_title}}

{{list_item_2_description}}

![{{list_item_2_image_alt}}]({{list_item_2_image_url}})

## {{list_item_3_title}}

{{list_item_3_description}}

![{{list_item_3_image_alt}}]({{list_item_3_image_url}})

<!-- Repeat the above pattern for as many list items as needed -->

## Conclusion

To wrap things up, these were the top {{number_of_items}} things you need to know about {{topic}}. Did we miss anything important? Let us know in the comments below!

## Call to Action

If you enjoyed this listicle, make sure to check out our other articles on similar topics and subscribe for more great content.

---

# Further Reading

- [Related Article 1](url)
- [Related Article 2](url)

# About the Author

![{{author_name}}]({{author_picture}})
{{author_name}} is a {{author_title}} who specializes in {{author_specialization}}. You can follow them on [Twitter](url) and [LinkedIn](url).
`;
      break;
    case 'Case Study':
      content = `{{context}}

In this case study, we explore how {{clientName}} achieved {{result}} by using {{yourServiceOrProduct}}.

## Background
{{clientName}} is a {{clientIndustry}} company that was facing {{problem}}. They needed a solution that could {{requirements}}.

## Objectives
The primary objectives were:
- {{objective1}}
- {{objective2}}
- {{objective3}}

## Solution
We implemented {{yourServiceOrProduct}}, which involved:
- {{solutionStep1}}
- {{solutionStep2}}
- {{solutionStep3}}

## Execution
The project was executed in the following phases:
1. **Phase 1**: {{phase1Details}}
2. **Phase 2**: {{phase2Details}}
3. **Phase 3**: {{phase3Details}}

## Results
After implementing the solution, {{clientName}} experienced:
- {{result1}}
- {{result2}}
- {{result3}}

### Key Metrics
- **Metric 1**: {{metric1Value}}
- **Metric 2**: {{metric2Value}}
- **Metric 3**: {{metric3Value}}

## Testimonial
>"{{testimonialQuote}}"
>- {{testimonialAuthor}}, {{testimonialAuthorRole}}, {{clientName}}

## Conclusion
This case study demonstrates how {{yourServiceOrProduct}} can effectively {{solveProblem}}. If you’re facing similar challenges, consider {{yourServiceOrProduct}} to achieve {{desiredOutcome}}.

## Call to Action
If you’re interested in learning more about how we can help your business, please contact us or visit our website.

---

# Further Reading

- [Related Article 1](url)
- [Related Article 2](url)

# About the Author

![{{author_name}}]({{author_picture}})
{{author_name}} is a {{author_title}} who specializes in {{author_specialization}}. You can follow them on [Twitter](url) and [LinkedIn](url).
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
    case 'Product Announcement':
      content = `{{context}}

excited to announce our latest product: **{{productName}}**. This innovative solution is designed to {{productBenefit}} and offers {{uniqueFeature1}}, {{uniqueFeature2}}, and {{uniqueFeature3}}.

## Key Features
### {{feature1Title}}
{{feature1Description}}

### {{feature2Title}}
{{feature2Description}}

### {{feature3Title}}
{{feature3Description}}

## Benefits
Using **{{productName}}** will allow you to:
- {{benefit1}}
- {{benefit2}}
- {{benefit3}}

## Availability
{{productName}} will be available starting {{availabilityDate}}. You can purchase it through our website or contact our sales team for more information.

## Special Offer
To celebrate the launch, we are offering a special discount of {{discountPercentage}}% for all purchases made before {{offerEndDate}}. Don’t miss out on this opportunity to get {{productName}} at a reduced price.

## Customer Testimonials
Here’s what some of our early adopters have to say about **{{productName}}**:
>"{{testimonialQuote1}}"
>- {{testimonialAuthor1}}, {{testimonialAuthorRole1}}

>"{{testimonialQuote2}}"
>- {{testimonialAuthor2}}, {{testimonialAuthorRole2}}

## Call to Action
Ready to experience the benefits of **{{productName}}**? [Order Now](https://yourwebsite.com/order) or [Contact Us](https://yourwebsite.com/contact) for more information.

## Conclusion
We believe that **{{productName}}** will transform the way you {{productApplication}}. We can’t wait for you to try it and see the difference it can make.

---

# Related News

- [Related News Article 1](url)
- [Related News Article 2](url)

# About the Author

![{{author_name}}]({{author_picture}})
{{author_name}} is a {{author_title}} who specializes in {{author_specialization}}. You can follow them on [Twitter](url) and [LinkedIn](url).
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