import sanitizeHtml from 'sanitize-html';

export const sanitize = (content: string) => {
  return sanitizeHtml(content, {
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      ul: ['data-type'],
      li: ['data-type', 'data-checked'],
    },
  });
};
