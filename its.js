/**
 *  its.JS Library
 *  Author  : Ali-Amechghal
 *  Created to make your life easy
 * 
 */

(function(root, factory){  
	// AMD Module
	if(typeof define === 'function' && define.amd){
		define(function(){
			return root.its = factory();
		});
	}else if(typeof exports === 'object'){
		//NodeJS
		module.exports = factory();
	}else{   
		// Browsers
		root.its = factory();
	}
}(this, function(){
	var root  =  this ||  global;
	var previousIts = root.its;

	var its = {};
	its.not= {};


	its.VERSION = '0.1.0';

	// cache native methods
	var toString =  Object.prototype.toString;
	var nativeSlice = Array.prototype.slice;
	var hasOwnProperty = Object.prototype.hasOwnProperty;


	function pas(func) {
		return function() {
			return !func.apply(null, nativeSlice.call(arguments));
		};
	}

	/* ███████████████████ Type check functions ███████████████████ */ 

	its.null= function(_value){
		return _value === null;

	}

	its.argument = function(_value){
		return   its.not.null(_value) && toString.call(_value) === '[object Arguments]'
			||  typeof _value === 'object'  && 'callee' in _value; 
	}

	its.array = function(_value){
		if(Array.isArray)
			return Array.isArray.call(null, _value);
		else
			return toString.call(_value) == '[object Array]';
	}

	its.boolean = function (_value){

		return its.not.null(_value) && ( typeof _value === 'boolean' || _value instanceof Boolean 
			|| (typeof _value === 'object' && _value.valueOf() === 'boolean') );
	}

	its.date = function(_value){
		return (_value instanceof Date || toString.call(_value) === '[object Date]');
	}

	its.error = function (_value){
		return (_value instanceof Error || toString.call(_value) === '[object Error]');
	}
	its.nan = Number.isNaN || function(_value){
		return _value !== _value; 
	}
	its.number =  function(_value){

		return its.not.null(_value) && its.not.nan(_value) && (typeof _value === 'number' 
			|| _value instanceof Number );
	}
	its.regexp = function(_value){
		return toString.call(_value) === '[object RegExp]' || _value instanceof RegExp;
	}
	its.sameType = function(_valueOne , _valueTwo){
		if(its.nan(_valueOne) || its.nan(_valueTwo))
			return its.null(_valueOne) == its.null(_valueTwo);
		else
			return toString.call(_valueOne) === toString.call(_valueTwo);
	}
	its.function =  function(_value){
		return toString.call(_value) === '[object Function]';
	}

	/* ███████████████████ Date check functions ███████████████████ */ 


	var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
	var months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];


	its.today =  function(_value){
		var now = new Date();
		return its.date(_value) && _value.toDateString() === now.toDateString();

	}
	its.tomorrow = function(_value){
		var now  =  new Date();
		var tomorrow = new Date();
		tomorrow.setDate(now.getDate() + 1);

		return its.date(_value) && _value.toDateString() === tomorrow.toDateString(); 
	}

	its.yesterday = function(_value){
		var now  =  new Date();
		var tomorrow = new Date();
		tomorrow.setDate(now.getDate() - 1);

		return its.date(_value) && _value.toDateString() === tomorrow.toDateString(); 
	}

	its.nott = function(_value){

        var currentDate =  new Date();
		return its.date(_value) && _value.getTime() < currentDate.getTime();
	}

	its.futur = function(_value){
		return its.not.today(_value) && its.not.nott(_value);
	}  
	its.day= function(_dateObj , _dayString){
		return its.date(_dateObj) && typeof _dayString === 'string'
		 && _dayString.toLowerCase() == days[_dateObj.getDay()]; 
	}
	its.month = function(_dateObj ,  _monthStr){
		return its.date(_dateObj) && typeof _monthStr === 'string' 
		  && (_monthStr.toLowerCase() == months[_dateObj.getMonth()]);
	}
	its.inDateRange =  function(_dateObj  , _startDate ,  _endDate){
		if(its.not.date(_dateObj) ||  its.not.date(_startDate)
				||  its.not.date(_endDate)){
			return false;
		}
		return (_dateObj.getTime() <=  _endDate.getTime() && _dateObj.getTime() >= _startDate.getTime());

	}

	/* ███████████████████ Pattern check functions ███████████████████ */ 


	its.regexpsOptions ={
			url: /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i,
			email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
			creditCard: /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
			alphaNumeric: /^[A-Za-z0-9]+$/,
			timeString: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,
			dateString: /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{2})?[0-9]{2}$/,
			usZipCode: /^[0-9]{5}(?:-[0-9]{4})?$/,
			caPostalCode: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]\s?[0-9][A-Z][0-9]$/,
			ukPostCode: /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/,
			nanpPhone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
			eppPhone: /^\+[0-9]{1,3}\.[0-9]{4,14}(?:x.+)?$/,
			socialSecurityNumber: /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/,
			affirmative: /^(?:1|t(?:rue)?|y(?:es)?|ok(?:ay)?)$/,
			hexadecimal: /^[0-9a-fA-F]+$/,
			hexColor: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
			ipv4: /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
			ipv6: /^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
			ip: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/
	}; 

	its.pattern = function(_value, _pattern){
		return its.not.null(_value) && its.not.null(_pattern)
		&&  (its.regexp(_pattern) || its.regexp(new RegExp(_pattern))) && _pattern.test(_value);

	}
	/* ███████████████████ Plat-form check functions ███████████████████ */

	function enrichFunctions(){
		for (var _key in its){
			if(hasOwnProperty.call(its  , _key) && its.function(its[_key])){
				its.not[_key] = pas(its[_key]);
			}
		}
	}
	enrichFunctions();

	return its;

}));

