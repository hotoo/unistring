'use strict';

import { Suite } from 'benchmark';
// @ts-ignore types
import benchmarks from 'beautify-benchmark';
// @ts-ignore types
import EmojiCharString from 'emojicharstring';
// @ts-ignore types
import unicodestring from 'unicode-string'; // unicode-string 不支持 8 字节 emoji string，这里仅作为参考
import unistring from '../index';

const suite = new Suite();

const enStr = 'abc';
const cnStr = '中文汉字';
const ceStr = '中文abc';
const CNStr = '张𤰉张𤰉';
const emojiStr = '张𤰉👨‍👩‍👦和👦🏿很要好';


suite
.add('Native String', function() {
  enStr.substr(1, 2);
  cnStr.substr(1, 2);
  ceStr.substr(1, 2);
})
.add('EmojiCharString', function() {
  const uniEnStr = new EmojiCharString(enStr);
  const uniCnStr = new EmojiCharString(cnStr);
  const uniCeStr = new EmojiCharString(ceStr);
  uniEnStr.substr(1, 2);
  uniCnStr.substr(1, 2);
  uniCeStr.substr(1, 2);
})
.add('unicode-string', function() {
  unicodestring.substr(enStr, 1, 2);
  unicodestring.substr(cnStr, 1, 2);
  unicodestring.substr(ceStr, 1, 2);
})
.add('unistring', function() {
  unistring(enStr).substr(1, 2);
  unistring(cnStr).substr(1, 2);
  unistring(ceStr).substr(1, 2);
})
.on('cycle', function(event: any) {
  benchmarks.add(event.target);
})
.on('complete', function() {
  benchmarks.log();
})
.run({ async: true });
