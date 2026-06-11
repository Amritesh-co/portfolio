import { D2 } from '../node_modules/@terrastruct/d2/dist/node-esm/index.js';
const d2 = new D2();
await d2.ready;
const compiled = await d2.compile('x -> y -> z');
const svg = await d2.render(compiled, { sketch: false, theme: 200 });
console.log(typeof svg, svg.slice(0, 120));
process.exit(0);
