import h from '../src/vhtml';
import { expect } from 'chai';
/** @jsx h */
/*global describe,it*/

describe('vhtml', () => {
	it('should stringify html', () => {
		let items = ['one', 'two', 'three'];
		expect(
			<div class="foo">
				<h1>Hi!</h1>
				<p>Here is a list of {items.length} items:</p>
				<ul>
					{ items.map( item => (
						<li>{ item }</li>
					)) }
				</ul>
			</div>
		).to.equal(
			`<div class="foo"><h1>Hi!</h1><p>Here is a list of 3 items:</p><ul><li>one</li><li>two</li><li>three</li></ul></div>`
		);
	});

	it('should sanitize children', () => {
		expect(
			<div>
				{ `<strong>blocked</strong>` }
				<em>allowed</em>
			</div>
		).to.equal(
			`<div>&lt;strong&gt;blocked&lt;/strong&gt;<em>allowed</em></div>`
		);
	});

	it('should sanitize attributes', () => {
		expect(
			<div onclick={`&<>"'`} />
		).to.equal(
			`<div onclick="&amp;&lt;&gt;&quot;&apos;"></div>`
		);
	});
});
