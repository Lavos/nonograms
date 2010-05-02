var test = [
	true, true, true, true, false, true, false, true, false, true,
	true, true, false, false, true, true, false, false, true, true,
	true, true, false, false, true, true, false, false, true, true,
	true, true, false, false, true, true, false, false, true, true,
	true, true, false, false, true, true, false, false, true, true,
	true, true, false, false, false, true, false, false, true, true,
	true, true, false, false, true, true, false, false, true, true,
	true, true, false, false, true, true, false, false, true, true,
	true, true, false, false, false, true, false, false, true, true,
	true, true, false, false, true, true, false, false, true, true
];



var NonoGrams = function NonoGrams (params) {

	var ng = this;

	var jq = {};
	jq.cells = $('#grid td');
	jq.yguide = $('#yguide td');
	jq.xguide = $('#xguide td');

	ng.cellobjs = [];

	var init = function init () {

		var counter = jq.cells.length;
		console.log(counter);

		var flat = _.flatten(test);

		while (counter--) {
			ng.cellobjs.push(new GridCell({
				element: jq.cells.eq(counter),
				solutionstate: flat[counter]
			}));
		};

		var ycounter = 0;
		var ylimit = 10;
		var yguide = [];

		while (ycounter < ylimit) {
			var position = 0;
			var poslimit = 10;
			var lineitems = [];

			while (position < poslimit) {
				var index = (ycounter * poslimit + position);
				lineitems.push(test[index])
				position++;
			};

			var guide = determineGuide(lineitems)
			yguide.push(guide);
			jq.yguide.eq(ycounter).text(guide.join(' '));

			ycounter++;
		};

		var xcounter = 0;
		var xlimit = 10;
		var xguide = [];

		while (xcounter < xlimit) {
			var position = 0;
			var poslimit = 10;
			var lineitems = [];

			while (position < poslimit) {
				var index = (position * poslimit + xcounter);
				lineitems.push(test[index])
				position++;
			};

			var guide = determineGuide(lineitems)
			xguide.push(guide);
			jq.xguide.eq(xcounter).text(guide.join(' '));

			xcounter++;
		};

		// console.dir(xguide);		

	};

	var determineGuide = function determineGuide (set) {
		var proxcounter = 0;
		var grouparray = [];
		var counter = 0;
		var limit = set.length

		while (counter < limit) {
			//var logger = [];
			//logger.push('counter: ');
			//logger.push(counter);
			//logger.push(', ');

			if (set[counter]) {
				//logger.push('found true ');
				proxcounter++;
				//logger.push('proxcounter at: ' + proxcounter);
			} else {
				//logger.push(' found false');
				grouparray.push(proxcounter);
				proxcounter = 0;
			};
			counter++;

			//console.log(logger.join(' '));

		};

		grouparray.push(proxcounter);

		// console.log(grouparray);
		// console.log(_.without(grouparray, 0));

		return _.without(grouparray, 0);
	};

	init();
	// 	console.log(ng);
};


var GridCell = function GridCell (params) {

	var gridcell = this;

	gridcell.options = {
		element: params.element || null,
		solutionstate: params.solutionstate || false
	};

	gridcell.currentstate = false;

	gridcell.jq = {};
	gridcell.jq.element = gridcell.options.element;

	var init = function init () {
		gridcell.jq.element.bind('click', function(e){
			gridcell.check();
		});

		// gridcell.display();

	};

	init();
};

GridCell.prototype = {
	display: function display (target) {
		this.jq.element.attr('class', target);	
	},
	setState: function change (target) {
		this.currentstate = target;	
	},
	toggleState: function toggle () {
		this.currentstate = (this.currentstate ? false : true);
		this.display();
	},
	check: function check () {
		if (this.options.solutionstate) {
			// success!
			this.display('success');
		} else {
			// failure.
			this.display('failure');
		};
	}
};
