# UniString

Fast Unicode String.

## USAGE

```js
import UniString from 'unistring';

const str = 'Unicode 😀 String';
const unistr = new UniString(str);

str.length; // 17
unistr.length; // 16

str.substr(8, 1); // '�'
str.substr(8, 2); // '😀'
unistr.substr(8, 1); // '😀'

str.split(''); // [ 'U', 'n', 'i', 'c', 'o', 'd', 'e', ' ', '�', '�', ' ', 'S', 't', 'r', 'i', 'n', 'g' ]
unistr.split(''); // [ 'U, 'n', 'i', 'c', 'o', 'd', 'e', ' ', '😀', ' ', 'S', 't', 'r', 'i', 'n', 'g' ]
```

## References

- [String.prototype.split() - JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split)
- [javascript - How to get character array from a string? - Stack Overflow](https://stackoverflow.com/questions/4547609/how-to-get-character-array-from-a-string/34717402#34717402)
