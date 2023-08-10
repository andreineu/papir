import { describe, expect, test } from 'vitest';

import { sanitize } from './sanitize';

describe('Content Sanitization', () => {
  test('should sanitize attribute onclick', () => {
    const dirtyHtml = '<p onclick="alert(\'XSS Attack\')">Dirty paragraph</p>';
    const cleanHtml = sanitize(dirtyHtml);

    expect(cleanHtml).to.not.include('onclick');
  });

  test('should not sanitize attribute data-type on ul element', () => {
    const dirtyHtml = '<ul data-type="taskList"><li>Text</li></ul>';
    const cleanHtml = sanitize(dirtyHtml);

    expect(cleanHtml).to.include('data-type');
  });

  test('should not sanitize attribute data-checked on li element', () => {
    const dirtyHtml = '<ul><li data-checked="checked">Text</li></ul>';
    const cleanHtml = sanitize(dirtyHtml);

    expect(cleanHtml).to.include('data-checked');
  });
});
