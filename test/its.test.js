/**
 *  its.JS Library - Unit Tests
 *  Author  : Ali-Amechghal
 *  Created to make your life easy
 * 
 */
var expect = require('chai').expect;
var its =  require('../its.js');

describe('type checks', function(){
	describe('its.arguments' , function (){
		it('should return true if passed parameter is an argument', function(){
			var args =  function(){
				return arguments;
			}();
			expect(its.argument(args)).to.be.true;
		});
	})
	describe('its.not.argument', function(){
		it('should return true if passed argument is not an argument', function(){
			var notargs = {};
			expect(its.not.argument(notargs)).to.be.true;
		});
	});
	describe('its.array && its.not.array' , function(){
		it('it should return true if its passed argument is an array', function(){
			var arr =  new Array();
			var arrStd = [];

			expect(its.array(arr)).to.be.true;
			expect(its.array(arrStd)).to.be.true;
			expect(its.not.array(arr)).to.be.false;
			expect(its.not.array(arrStd)).to.be.false;
			
		});

	});
	describe('its.boolean', function(){
		it('it should return true if a given value is boolean', function(){
			expect(its.boolean(true)).to.be.true;
			expect(its.boolean(new Boolean())).to.be.true;
			expect(its.boolean(null)).to.be.false;
			expect(its.boolean('')).to.be.false;
			expect(its.boolean('dummy')).to.be.false;
		});
	});


	describe('its.not.boolean', function(){
		it('it should return true if a given value is not boolean', function(){
			expect(its.not.boolean(true)).to.be.false;
			expect(its.not.boolean(new Boolean())).to.be.false;
			expect(its.not.boolean(null)).to.be.true;
			expect(its.not.boolean('')).to.be.true;
			expect(its.not.boolean('dummy')).to.be.true;
		});
	});


	describe('its.date && its.not.date', function(){
		it('it should return true if a give  value is a date', function(){
			expect(its.date(new Date())).to.be.true;
			expect(its.date('')).to.be.false;	
			expect(its.date('')).to.be.false;
			expect(its.date(null)).to.be.false;

			expect(its.not.date(new Date())).to.be.false;
			expect(its.not.date('')).to.be.true;
			expect(its.not.date('')).to.be.true;
			expect(its.not.date(null)).to.be.true;
			
		});
	});
	describe('its.error & its.not.error', function(){
		it('it should return true if a given value is an Error type', function(){
			expect(its.error(new Error())).to.be.true;
			expect(its.error(new SyntaxError())).to.be.true;
			expect(its.error(new SyntaxError('Error message'))).to.be.true;
			expect(its.error('')).to.be.false;

            expect(its.not.error(new Error())).to.be.false;
			expect(its.not.error(new SyntaxError())).to.be.false;
			expect(its.not.error(new SyntaxError('Error message'))).to.be.false;
			expect(its.not.error('')).to.be.true;

		});
	});

	describe('its.nan', function(){
		it('it should return true if a given parameter is NaN', function(){
			expect(its.nan(Number.NaN)).to.be.true;
			expect(its.nan(Number.MAX_VALUE)).to.be.false;
			expect(its.nan(Number.MIN_VALUE)).to.be.false;
			expect(its.nan('')).to.be.false;
			expect(its.nan('god bless numbers')).to.be.false;
			expect(its.nan(null)).to.be.false;
			expect(its.nan(0)).to.be.false;
			expect(its.nan(new Number())).to.be.false;

  			expect(its.not.nan(Number.NaN)).to.be.false;
			expect(its.not.nan(Number.MAX_VALUE)).to.be.true;
			expect(its.not.nan(Number.MIN_VALUE)).to.be.true;
			expect(its.not.nan('')).to.be.true;
			expect(its.not.nan('god bless Numbers')).to.be.true;
			expect(its.not.nan(null)).to.be.true;
			expect(its.not.nan(0)).to.be.true;
			expect(its.not.nan(new Number())).to.be.true;
		});
	});

	describe('its.number & its.not.number', function(){
		it('it should return true if a given parameter is an number', function(){
			expect(its.number(1.2)).to.be.true;
			expect(its.number(122222)).to.be.true;
			expect(its.number(-12)).to.be.true;
			expect(its.number(new Number())).to.be.true;
			expect(its.number(Number.NaN)).to.be.false;
			expect(its.number('1.2')).to.be.false;
			expect(its.number(null)).to.be.false;

			expect(its.not.number(1.2)).to.be.false;
			expect(its.not.number(122222)).to.be.false;
			expect(its.not.number(-12)).to.be.false;
			expect(its.not.number(new Number())).to.be.false;
			expect(its.not.number(Number.NaN)).to.be.true;
			expect(its.not.number('1.2')).to.be.true;
			expect(its.not.number(null)).to.be.true;
		});
	});
	describe('its.regexp && its.not.regexp', function(){
		it('it should return true if a given parameter is a regexp', function(){
			expect(its.regexp(new RegExp())).to.be.true;
			expect(its.regexp(/^[A-Za-z0-9]+$/)).to.be.true;
			expect(its.regexp('/^[A-Za-z0-9]+$/')).to.be.false;

			expect(its.not.regexp(new RegExp())).to.be.false;
			expect(its.not.regexp(/^[A-Za-z0-9]+$/)).to.be.false;
			expect(its.not.regexp('/^[A-Za-z0-9]+$/')).to.be.true;
			
		});
	});
	describe('its.sameType & its.not.sameType', function(){
		it('it should return true if a given arguments have the same type', function(){
			expect(its.sameType('','')).to.be.true;
			expect(its.sameType('', null)).to.be.false;
			expect(its.sameType('',2)).to.be.false;
			expect(its.sameType('',undefined)).to.be.false;
			expect(its.sameType(null , null)).to.be.true;
			expect(its.sameType(Number.MAX_VALUE, Number.MIN_VALUE)).to.be.true;

			expect(its.not.sameType('','')).to.be.false;
			expect(its.not.sameType('', null)).to.be.true;
			expect(its.not.sameType('',2)).to.be.true;
			expect(its.not.sameType('',undefined)).to.be.true;
			expect(its.not.sameType(null , null)).to.be.false;
			expect(its.not.sameType(Number.MAX_VALUE, Number.MIN_VALUE)).to.be.false;

		});
	});
	describe('its.function & its.not.function', function(){
		it('it should return true if a given value is a function',function(){
			expect(its.function(function(){})).to.be.true;
			expect(its.function(Object.toString)).to.be.true;
			expect(its.function(Object.toString())).to.be.false;

			expect(its.not.function(function(){})).to.be.false;
			expect(its.not.function(Object.toString)).to.be.false;
			expect(its.not.function(Object.toString())).to.be.true;

		});
	});

});
describe('checking date', function(){
	describe('its.today & its.not.today', function(){
		it('it should return true if a given date is today date', function(){
			var today =  new Date();
			var yesterday = new Date();
			yesterday.setDate(today.getDate() - 1);

			var tomorrow = new Date();
			tomorrow.setDate(today.getDate() + 1);

			expect(its.today(today)).to.be.true;
			expect(its.today(yesterday)).to.be.false;
			expect(its.today(tomorrow)).to.be.false;

			expect(its.not.today(today)).to.be.false;
			expect(its.not.today(yesterday)).to.be.true;
			expect(its.not.today(tomorrow)).to.be.true;

		});
	});
	describe('its.tomorrow & its.not.tomorrow', function(){
		it('it should return true if a given date is tomorrow date', function(){
			var today =  new Date();
			var yesterday = new Date();
			yesterday.setDate(today.getDate() - 1);

			var tomorrow = new Date();
			tomorrow.setDate(today.getDate() + 1);

            var futur = new Date();
			futur.setDate(today.getDate() + 10);
			
			expect(its.tomorrow(today)).to.be.false;
			expect(its.tomorrow(yesterday)).to.be.false;
			expect(its.tomorrow(tomorrow)).to.be.true;
			expect(its.tomorrow(futur)).to.be.false;

			expect(its.not.tomorrow(today)).to.be.true;
			expect(its.not.tomorrow(yesterday)).to.be.true;
			expect(its.not.tomorrow(tomorrow)).to.be.false;
			expect(its.not.tomorrow(futur)).to.be.true;
		});
	});


	describe('its.yesterday & its.not.yesterday', function(){
		it('it should return true if a given date is yesterday date', function(){
			var today =  new Date();
			var yesterday = new Date();
			yesterday.setDate(today.getDate() - 1);

			var tomorrow = new Date();
			tomorrow.setDate(today.getDate() + 1);

			expect(its.yesterday(today)).to.be.false;
			expect(its.yesterday(yesterday)).to.be.true;
			expect(its.yesterday(tomorrow)).to.be.false;

			expect(its.not.yesterday(today)).to.be.true;
			expect(its.not.yesterday(yesterday)).to.be.false;
			expect(its.not.yesterday(tomorrow)).to.be.true;

		});
	});

	describe('its.past & its.not.past', function(){
		it('it should return true if a given date is a past date', function(){
			var today =  new Date();
			var yesterday = new Date();
			yesterday.setDate(today.getDate() - 1);

			var tomorrow = new Date();
			tomorrow.setDate(today.getDate() + 1);


			expect(its.past(yesterday)).to.be.true;
			expect(its.past(tomorrow)).to.be.false;

			expect(its.not.past(yesterday)).to.be.false;
			expect(its.not.past(tomorrow)).to.be.true;

		});
	});

	describe('its.futur  & its.not.futur' ,function(){
		it('it should return true if a given date is a futur date', function(){
            var today =  new Date();
			var yesterday = new Date();
			yesterday.setDate(today.getDate() - 1);

			var tomorrow = new Date();
			tomorrow.setDate(today.getDate() + 1);

			expect(its.futur(today)).to.be.false;
			expect(its.futur(yesterday)).to.be.false;
			expect(its.futur(tomorrow)).to.be.true;

			expect(its.not.futur(today)).to.be.true;
			expect(its.not.futur(yesterday)).to.be.true;
			expect(its.not.futur(tomorrow)).to.be.false;
		});
	});

	describe('its.day & its.not.day', function(){
		it('should return true if a given day name equals the given date day', function(){
			var timestamp =  1459695890736;
			var dayName = 'Sunday';
			var date =  new Date();
			date.setTime(timestamp);

			expect(its.day(date, dayName)).to.be.true;
			expect(its.day(null, dayName)).to.be.false;
			expect(its.day(date, '')).to.be.false;
			expect(its.day(date, true)).to.be.false;

			expect(its.not.day(date, dayName)).to.be.false;


		});
	});

	describe('its.month & its.not.month', function(){
		it('should return true if a given month name equals the given date month', function(){
			var timestamp =  1459695890736;
			var dayName = 'April';
			var date =  new Date();
			date.setTime(timestamp);

			expect(its.month(date, dayName)).to.be.true;
			expect(its.month(null, dayName)).to.be.false;
			expect(its.month(date, '')).to.be.false;
			expect(its.month(date, true)).to.be.false;

			expect(its.not.month(date, dayName)).to.be.false;

		});
	});

	describe('its.inDateRange & its.not.inDateRange', function(){
		it('should return true if a given date its between start date and end date', function(){
			var today =  new Date();
			var past = new Date();
			past.setDate(today.getDate() - 1);

			var futur = new Date();
			futur.setDate(today.getDate() + 3);
			expect(its.inDateRange(today , past, futur)).to.be.true;

			expect(its.not.inDateRange(today , past, futur)).to.be.false;
		});
	});
	describe('its.pattern & its.not.pattern', function(){
		it('should return true if a given value respect the given pattern', function(){
			expect(its.pattern('ali.amechghal@github.com',its.regexpsOptions.email)).to.be.true;
			expect(its.pattern('https://github.com',its.regexpsOptions.url)).to.be.true;

			expect(its.not.pattern('ali.amechghal@github.com',its.regexpsOptions.email)).to.be.false;
			expect(its.not.pattern('https://github.com',its.regexpsOptions.url)).to.be.false;

		});
	});
});

