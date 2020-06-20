import React from 'react';

export default function getHighlightText(text, highlight) {
  if (!text || !highlight) {
    return <span>{text}</span>;
  }

  if (text) {
    const parts = String(text).split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {' '}
        {parts.map((part, i) => (
          <span
            key={i}
            style={part.toLowerCase() === highlight.toLowerCase() ? {backgroundColor: '#1890ff', color: '#FFFFFF'} : {}}
          >
            {part}
          </span>
        ))}{' '}
      </span>
    );
  }
}
