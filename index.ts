// @ts-ignore types
// import regex from 'multichar-regex';

const RE_IS_UNICODE = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
const astralRange = /\ud83c[\udffb-\udfff](?=\ud83c[\udffb-\udfff])|(?:[^\ud800-\udfff][\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]?|[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?)*/g;

export default function UniString(str: string): string|UnicodeString {
  const hasUnicode = RE_IS_UNICODE.test(str);
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
    this._hasUnicode = RE_IS_UNICODE.test(str);
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
  private _raw: string;
  private _matches: string[];

  constructor(raw: string) {
    this._raw = raw;
    // @ts-ignore
    // this._matches = [ ...raw ];
    this._matches = raw.match(astralRange) || [];
  }

  get length(): number {
    return this._matches.length;
  }

  split(separator: string, limit?: number): string[] {
    if (separator === '') {
      return this._matches;
    }

    const uniSep = separator.match(astralRange) || [];
    const sublen = uniSep.length;
    const list = [];
    let lastIndex = 0;
    for (let i = 0, l = this.length; i < l; i++) {
      const substr = this._matches.slice(i, i + sublen).join('');
      if (substr === separator) {
        list.push(this._matches.slice(lastIndex, i).join(''));
        i = i + sublen - 1; // next for will i++, so here need minus 1.
        lastIndex = i + 1;
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
    let end = begin + length;
    if (typeof length === 'undefined') {
      end = this.length;
    }
    return this._matches.slice(begin, end).join('');
  }

  substring(start: number, end?: number): string {
    let begin = start;
    if (begin < 0 || isNaN(begin)) {
      begin = 0;
    }
    if (begin > this.length) {
      begin = this.length;
    }

    let after = end;
    if (typeof end === 'undefined') {
      after = this.length;
    }
    if (after < 0 || isNaN(after)) {
      after = 0;
    }
    if (after > this.length) {
      after = this.length;
    }

    if (begin === after) {
      return '';
    }

    if (begin > after) {
      [begin, after] = [after, begin];
    }

    return this._matches.slice(begin, after).join('');
  }

  toString() {
    return this._raw;
  }

  valueOf() {
    return this._raw;
  }
}
