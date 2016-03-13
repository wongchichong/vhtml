// escape an attribute
let esc = str => String(str).replace(/[&<>"']/g, s=>`&${map[s]};`);
let map = {'&':'amp','<':'lt','>':'gt','"':'quot',"'":'apos'};

// sanitize text children and filter out falsey values
let child = s => truthy(s) ? (sanitized[s]===true ? s : esc(s)) : '';

// check that a value is not false, undefined or null
let truthy = v => v!==false && v!=null;

let sanitized = {};

/** Hyperscript reviver that constructs a sanitized HTML string. */
export default function h(name, attrs, ...children) {
	let s = `<${name}`;
	if (attrs) for (let i in attrs) {
		if (attrs.hasOwnProperty(i) && truthy(attrs[i])) {
			s += ` ${esc(i)}="${esc(attrs[i])}"`;
		}
	}
	s += `>${[].concat(...children).map(child).join('')}</${name}>`;
	sanitized[s] = true;
	return s;
}



// for fun:
/*
export default const h = (tag, attrs, ...kids) => (
	`<${tag}${h.attrs(attrs)}>${[].concat(...kids).join('')}</${tag}>`
);
h.attrs = a => Object.keys(a || {}).reduce( (s,i) => `${s} ${h.esc(i)}="${h.esc(a[i]+'')}"`, '');
h.esc = str => str.replace(/[&<>"']/g, s=>`&${h.map[s]};`);
h.map = {'&':'amp','<':'lt','>':'gt','"':'quot',"'":'apos'};
*/
