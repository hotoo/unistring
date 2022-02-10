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

// const suiteSubstring = new Suite();
const suite = new Suite();

const enStr = 'abc';
const cnStr = '中文汉字';
const ceStr = '中文abc';
// const CNStr = '张𤰉张𤰉';
// const emojiStr = '张𤰉👨‍👩‍👦和👦🏿很要好';


export default function() {
  return new Promise(function(resolve) {
    suite
      .add('substring: Native String', function() {
        enStr.substring(1, 2);
        cnStr.substring(1, 2);
        ceStr.substring(1, 2);
      })
      .add('substring: EmojiCharString', function() {
        const uniEnStr = new EmojiCharString(enStr);
        const uniCnStr = new EmojiCharString(cnStr);
        const uniCeStr = new EmojiCharString(ceStr);
        uniEnStr.substring(1, 2);
        uniCnStr.substring(1, 2);
        uniCeStr.substring(1, 2);
      })
      .add('substring: unicode-string', function() {
        unicodestring.substring(enStr, 1, 2);
        unicodestring.substring(cnStr, 1, 2);
        unicodestring.substring(ceStr, 1, 2);
      })
      .add('substring: unistring', function() {
        unistring(enStr).substring(1, 2);
        unistring(cnStr).substring(1, 2);
        unistring(ceStr).substring(1, 2);
      })
      .on('cycle', function(event: any) {
        benchmarks.add(event.target);
      })
      .on('complete', function() {
        benchmarks.log();
        benchmarks.reset();
        resolve(0);
      })
      .run({ async: false });
  });
}
