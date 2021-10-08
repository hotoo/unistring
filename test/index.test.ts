import unistring from '../index';

describe('test/index.test.ts', function() {
  const enStr = 'abc';
  const cnStr = '中文汉字';
  const ceStr = '中文abc';
  const CNStr = '张𤰉张𤰉';
  const emojiStr = '张𤰉👨‍👩‍👦和👦🏿很要好';

  const uniEnStr = unistring(enStr);
  const uniCnStr = unistring(cnStr);
  const uniCeStr = unistring(ceStr);
  const uniCNStr = unistring(CNStr);
  const uniEmojiStr = unistring(emojiStr);

  it('length', function() {
    expect(enStr.length).toBe(3);
    expect(uniEnStr.length).toBe(3);

    expect(cnStr.length).toBe(4);
    expect(uniCnStr.length).toBe(4);

    expect(ceStr.length).toBe(5);
    expect(uniCeStr.length).toBe(5);

    expect(CNStr.length).toBe(6);
    expect(uniCNStr.length).toBe(4);

    expect(emojiStr.length).toBe(19);
    expect(uniEmojiStr.length).toBe(8);
  });

  it('toString', function() {
    expect(uniEnStr.toString()).toBe(enStr);
    expect(uniCnStr.toString()).toBe(cnStr);
    expect(uniCeStr.toString()).toBe(ceStr);
    expect(uniCNStr.toString()).toBe(CNStr);
    expect(uniEmojiStr.toString()).toBe(emojiStr);
  });

  it('valueOf', function() {
    expect(uniEnStr.valueOf()).toBe(enStr);
    expect(uniCnStr.valueOf()).toBe(cnStr);
    expect(uniCeStr.valueOf()).toBe(ceStr);
    expect(uniCNStr.valueOf()).toBe(CNStr);
    expect(uniEmojiStr.valueOf()).toBe(emojiStr);
  });

  it('split("")', function() {
    expect(uniEnStr.split('')).toEqual(['a', 'b', 'c']);
    expect(uniCnStr.split('')).toEqual(['中', '文', '汉', '字']);
    expect(uniCeStr.split('')).toEqual(['中', '文', 'a', 'b', 'c']);
    expect(uniCNStr.split('')).toEqual(['张', '𤰉', '张', '𤰉']);
    expect(uniEmojiStr.split('')).toEqual(['张', '𤰉', '👨‍👩‍👦', '和', '👦🏿', '很', '要', '好']);
  });

  it('split(char)', function() {
    expect(uniEnStr.split('b')).toEqual(['a', 'c']);
    expect(uniCnStr.split('文')).toEqual(['中', '汉字']);
    expect(uniCeStr.split('文')).toEqual(['中', 'abc']);
    expect(uniCeStr.split('b')).toEqual(['中文a', 'c']);
    expect(uniCNStr.split('张')).toEqual(['', '𤰉', '𤰉']);
    expect(uniCNStr.split('𤰉')).toEqual(['张', '张', '']);
    expect(uniCNStr.split('张𤰉')).toEqual(['', '', '']);
    expect(uniEmojiStr.split('𤰉')).toEqual(['张', '👨‍👩‍👦和👦🏿很要好']);
    expect(uniEmojiStr.split('👦')).toEqual(['张𤰉👨‍👩‍👦和👦🏿很要好']);
    expect(uniEmojiStr.split('👨‍👩‍👦')).toEqual(['张𤰉', '和👦🏿很要好']);
  });

  it('substr', function() {
    expect(uniEnStr.substr(1, 0)).toBe('');
    expect(uniEnStr.substr(1, 1)).toBe('b');
    expect(uniCnStr.substr(1, 1)).toBe('文');
    expect(uniCeStr.substr(1, 1)).toBe('文');
    expect(uniCeStr.substr(3, 1)).toBe('b');

    expect(uniCNStr.substr(1, 0)).toBe('');
    expect(uniCNStr.substr(1, -1)).toBe('');
    expect(uniCNStr.substr(1, 1)).toBe('𤰉');
    expect(uniCNStr.substr(2, 2)).toBe('张𤰉');
    expect(uniCNStr.substr(2, -1)).toBe('');
    expect(uniEmojiStr.substr(1, 2)).toBe('𤰉👨‍👩‍👦');
    expect(uniEmojiStr.substr(4, 2)).toBe('👦🏿很');
    expect(uniEmojiStr.substr(4)).toBe('👦🏿很要好');
    expect(uniEmojiStr.substr(-4)).toBe('👦🏿很要好');
    expect(uniEmojiStr.substr(-4, 2)).toBe('👦🏿很');
    expect(uniEmojiStr.substr(-4, -1)).toBe('');
    expect(uniEmojiStr.substr(-6)).toBe('👨‍👩‍👦和👦🏿很要好');
    expect(uniEmojiStr.substr(-8)).toBe('张𤰉👨‍👩‍👦和👦🏿很要好');
    expect(uniEmojiStr.substr(-9)).toBe('张𤰉👨‍👩‍👦和👦🏿很要好');
    expect(uniEmojiStr.substr(-19)).toBe('张𤰉👨‍👩‍👦和👦🏿很要好');
    expect(uniEmojiStr.substr(-20)).toBe('张𤰉👨‍👩‍👦和👦🏿很要好');
  });

  it('substring', function() {
    expect(uniEnStr.substring(1, 0)).toBe('a');
    expect(uniEnStr.substring(1, 1)).toBe('');
    expect(uniEnStr.substring(1, 2)).toBe('b');
    expect(uniCnStr.substring(1, 2)).toBe('文');
    expect(uniCeStr.substring(1, 2)).toBe('文');
    expect(uniCeStr.substring(3, 4)).toBe('b');

    expect(uniCNStr.substring(1, 0)).toBe('张');
    expect(uniCNStr.substring(1, -1)).toBe('张');
    expect(uniCNStr.substring(1, 1)).toBe('');
    expect(uniCNStr.substring(1, 2)).toBe('𤰉');
    expect(uniCNStr.substring(2, 4)).toBe('张𤰉');
    expect(uniCNStr.substring(2, -1)).toBe('张𤰉');
    expect(uniEmojiStr.substring(1, 3)).toBe('𤰉👨‍👩‍👦');
    expect(uniEmojiStr.substring(3, 1)).toBe('𤰉👨‍👩‍👦');
    expect(uniEmojiStr.substring(4, 6)).toBe('👦🏿很');
    expect(uniEmojiStr.substring(6, 4)).toBe('👦🏿很');
    expect(uniEmojiStr.substring(4)).toBe('👦🏿很要好');
    expect(uniEmojiStr.substring(-4)).toBe('张𤰉👨‍👩‍👦和👦🏿很要好');
    expect(uniEmojiStr.substring(-4, 6)).toBe('张𤰉👨‍👩‍👦和👦🏿很');
    expect(uniEmojiStr.substring(6, -4)).toBe('张𤰉👨‍👩‍👦和👦🏿很');
    expect(uniEmojiStr.substring(-4, -2)).toBe('');
    expect(uniEmojiStr.substring(-4, -1)).toBe('');
  });
});
