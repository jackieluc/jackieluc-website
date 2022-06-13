import { buildMarkdocContent, renderMarkdoc } from './markdoc';
import fs from 'fs';
import { vi } from 'vitest';

const mockMarkdocContent = `# Mock Markdoc Content`;

describe('Build Markdoc Content', () => {
  it('should build content given a filename', () => {
    vi.spyOn(fs, 'readFileSync').mockImplementation(() => mockMarkdocContent);
    const content = buildMarkdocContent('blog-post-1.md');
    expect(content).toBeInstanceOf(Object);
    expect(content).toMatchInlineSnapshot(`
      Tag {
        "$$mdtype": "Tag",
        "attributes": {},
        "children": [
          Tag {
            "$$mdtype": "Tag",
            "attributes": {},
            "children": [
              "Mock Markdoc Content",
            ],
            "name": "h1",
          },
        ],
        "name": "article",
      }
    `);
  });
});

describe('Render Markdoc Content', () => {
  it('should render content', () => {
    vi.spyOn(fs, 'readFileSync').mockImplementation(() => mockMarkdocContent);
    const content = buildMarkdocContent('blog-post-1.md');
    const rendered = renderMarkdoc(content);
    expect(rendered).toBeInstanceOf(Object);
    expect(rendered).toMatchInlineSnapshot(`
      <article>
        <h1>
          Mock Markdoc Content
        </h1>
      </article>
    `);
  });
});
