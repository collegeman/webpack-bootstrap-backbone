/**
 * Test the LunrCollection
 */
describe('LunrCollection is working', function() {

	var LunrCollection = require('collections/lunr');
	var c = new LunrCollection();

	c.lunroptions = {
		fields: [{
			'name': 'first_name'
		}, {
			'name': 'last_name'
		}]
	};
	
	var data = [{
		'first_name': 'Aaron',
		'last_name': 'Collegeman'
	},{
		'first_name': 'Adrienne',
		'last_name': 'Collegeman'
	}];

	it("when by default, the collection is empty", function() {
		expect(c.length).toBe(0);
	});

	it("when after we add data to the collection, it will have " + data.length + " entries", function() {
		c.reset(data);
		expect(c.length).toBe(2);
	});

	it("when searching for 'aar', we will get 1 result", function() {
		expect(c.search("aar").length).toBe(1);
	});

	it("when searching for 'adr', we will get 1 result", function() {
		expect(c.search("adr").length).toBe(1);
	});

	it("when searching for 'col', we will get 2 results", function() {
		expect(c.search("col").length).toBe(2);
	});

});