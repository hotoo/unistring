'use strict';

import { Suite } from 'benchmark';
// @ts-ignore types
import benchmarks from 'beautify-benchmark';
// @ts-ignore types
import EmojiCharString from 'emojicharstring';
// @ts-ignore types
import unicodestring from 'unicode-string'; // unicode-string 不支持 8 字节 emoji string，这里仅作为性能参考
import Graphemer from 'graphemer';
import unistring from '../index';

const enStr = 'abc';
const cnStr = '中文汉字';
const ceStr = '中文abc';
const CNStr = '张𤰉张𤰉';
const emojiStr = '张𤰉👨‍👩‍👦和👦🏿很要好';

const splitter = new Graphemer();
const suite = new Suite();

function mockEmojiSplit(emoji: any, sep: string) {
  if (sep === '') {
    return emoji._match;
  }
  return [];
}

export default function() {
  return new Promise(function(resolve) {
    suite
      .add('split: Native String', function() {
        enStr.split('');
        cnStr.split('');
        ceStr.split('');
        CNStr.split('');
        emojiStr.split('');
      })
      .add('split: unicode-string', function() {
        unicodestring.split(enStr, '');
        unicodestring.split(cnStr, '');
        unicodestring.split(ceStr, '');
        unicodestring.split(CNStr, '');
        unicodestring.split(emojiStr, '');
      })
      .add('split: EmojiCharString', function() {
        const uniEnStr = new EmojiCharString(enStr);
        const uniCnStr = new EmojiCharString(cnStr);
        const uniCeStr = new EmojiCharString(ceStr);
        const uniCNStr = new EmojiCharString(CNStr);
        const uniEmojiStr = new EmojiCharString(emojiStr);
        mockEmojiSplit(uniEnStr, '');
        mockEmojiSplit(uniCnStr, '');
        mockEmojiSplit(uniCeStr, '');
        mockEmojiSplit(uniCNStr, '');
        mockEmojiSplit(uniEmojiStr, '');
      })
      .add('split: graphemer', function() {
        splitter.splitGraphemes(enStr);
        splitter.splitGraphemes(cnStr);
        splitter.splitGraphemes(ceStr);
        splitter.splitGraphemes(CNStr);
        splitter.splitGraphemes(emojiStr);
      })
      .add('split: unistring', function() {
        unistring(enStr).split('');
        unistring(cnStr).split('');
        unistring(ceStr).split('');
        unistring(CNStr).split('');
        unistring(emojiStr).split('');
      })
      .on('cycle', function(event: any) {
        benchmarks.add(event.target);
      })
      .on('complete', function() {
        benchmarks.log();
        benchmarks.reset();
        resolve(0);
      })
      .run({ async: true });
  });
}
