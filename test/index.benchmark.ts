'use strict';

import substring from './substring.benchmark';
import split from './split.benchmark';

async function main() {
  await substring();
  await split();
}
main();
