import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import "../styles/blog-content.css";

// Build nested heading structure
const buildNestedHeadings = (headings) => {
  const result = [];
  const stack = [{ children: result, depth: 0 }];

  headings.forEach((heading) => {
    while (heading.depth <= stack[stack.length - 1].depth) {
      stack.pop();
    }

    const current = { ...heading, children: [] };
    stack[stack.length - 1].children.push(current);
    stack.push(current);
  });

  return result;
};

// Render headings with dynamic margin based on depth
const renderHeadings = (headings) => {
  return (
    <ul>
      {headings.map(heading => (
        <li key={heading.slug}>
          <a href={`#${heading.slug}`} data-id={heading.slug}  style={{ marginLeft: `${heading.depth * 20}px` }}>
            {heading.text}
          </a>
          {heading.children.length > 0 && renderHeadings(heading.children)}
        </li>
      ))}
    </ul>
  );
};

const BlogContent = ({ headings }) => {

  const nestedHeadings = buildNestedHeadings(headings);

  return (
    <div>
      <nav className="table-of-contents">
        <p style={{whiteSpace:"nowrap",marginBottom:"-5px", color:"gray"}}>-  CATALOG</p>
        <hr></hr>
        {renderHeadings(nestedHeadings)}
      </nav>
    </div>
  );
};

BlogContent.propTypes = {
  headings: PropTypes.arrayOf(
    PropTypes.shape({
      depth: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BlogContent;
