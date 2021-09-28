// @ts-ignore types
import regex from 'multichar-regex';

export default function UniString(str: string): string|UnicodeString {
  const hasUnicode = regex.test(str);
  if (!hasUnicode) {
    return str;
  }

  return new UnicodeString(str);
}

export class UniStringClass {
  private _raw: string;
  private _hasUnicode: boolean;
  private _unicodestring?: UnicodeString;

  constructor(str: string) {
    this._raw = str;
    this._hasUnicode = regex.test(str);
  }

  get length(): number {
    const str = this._getUnicodeString();
    return str.length;
  }

  private _getUnicodeString(): string|UnicodeString {
    if (!this._hasUnicode) {
      return this._raw;
    }

    if (!this._unicodestring) {
      this._unicodestring = new UnicodeString(this._raw);
    }
    return this._unicodestring;
  }
}

/**
 * Part of Unicode String.
 */
class UnicodeString {
  private _matches: string[];

  constructor(raw: string) {
    this._matches = [ ...raw ];
  }

  get length(): number {
    return this._matches.length;
  }

  split(separator: string, limit?: number): string[] {
    if (separator === '') {
      return this._matches;
    }

    const sublen = separator.length;
    const list = [];
    let lastIndex = 0;
    for (let i = 0, l = this.length; i < l - sublen; i++) {
      const substr = this._matches.slice(i, i + sublen).join('');
      if (substr === separator) {
        list.push(this._matches.slice(lastIndex, i).join(''));
        i = i + sublen;
        lastIndex = i;
      }
    }
    list.push(this._matches.slice(lastIndex).join(''));
    return list;
  }

  substr(start: number, length?: number): string {
    const begin = start < 0 ? this.length + start : start;
    if (begin < 0 || begin > this.length) {
      return '';
    }
    // undefined <= 0: false
    if (typeof length === 'number' && length <= 0) {
      return '';
    }
    let end = typeof length === 'undefined' ? this.length - start : start + length;
    return this._matches.slice(begin, end).join('');
  }

  substring(start: number, end?: number): string {
    const begin = start >= 0 ? start : this.length + start;
    if (begin < 0 || begin > this.length) {
      return '';
    }
    let after = this.length;
    if (typeof end === 'number') {
      after = end >= 0 ? end : this.length + end;
    }
    if (after < 0 || after > this.length) {
      return '';
    }
    return this._matches.slice(begin, after).join('');
  }
}
