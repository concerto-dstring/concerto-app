import React from 'react';
import styled from 'styled-components';

export default function getHighlightText(text, highlight) {
  if (!text || !highlight) {
    const CellText = styled.div`
      display: Block;
      overflow: hidden;
      pading: 2px;
      text-overflow: ellipsis;
      white-space: nowrap;
    `;
    return <CellText>{text}</CellText>;
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
