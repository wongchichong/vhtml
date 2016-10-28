// escape an attribute
let esc = str => String(str).replace(/[&<>"']/g, s=>`&${map[s]};`);
let map = {'&':'amp','<':'lt','>':'gt','"':'quot',"'":'apos'};

let sanitized = {};

/** Hyperscript reviver that constructs a sanitized HTML string. */
export default function h(name, attrs) {
	let s = `<${name}`;
	if (attrs) for (let i in attrs) {
		if (attrs[i]!==false && attrs[i]!=null) {
			s += ` ${esc(i)}="${esc(attrs[i])}"`;
		}
	}
	s += '>';
	let stack=[];
	for (let i=arguments.length; i-- > 2; ) stack.push(arguments[i]);
	while (stack.length) {
		let child = stack.pop();
		if (child) {
			if (child.pop) {
				for (let i=child.length; i--; ) stack.push(child[i]);
			}
			else {
				s += sanitized[child]===true ? child : esc(child);
			}
		}
	}
	sanitized[s += `</${name}>`] = true;
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
