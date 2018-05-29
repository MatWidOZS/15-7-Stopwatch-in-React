'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
	_inherits(Stopwatch, _React$Component);

	function Stopwatch(props) {
		_classCallCheck(this, Stopwatch);

		var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

		_this.state = {
			running: false,
			// display: '',
			minutes: 0,
			seconds: 0,
			miliseconds: 0,
			results: []
		};

		// this.print = this.print.bind(this);
		_this.format = _this.format.bind(_this);
		_this.start = _this.start.bind(_this);
		_this.step = _this.step.bind(_this);
		_this.calculate = _this.calculate.bind(_this);
		_this.stop = _this.stop.bind(_this);
		_this.reset = _this.reset.bind(_this);
		_this.save = _this.save.bind(_this);
		_this.clear = _this.clear.bind(_this);
		return _this;
	}

	// print() {
	// 	this.setState({
	// 		display: this.format()
	// 	});
	// }

	_createClass(Stopwatch, [{
		key: 'format',
		value: function format() {
			var miliseconds = this.state.miliseconds;
			var seconds = this.state.seconds;
			var minutes = this.state.minutes;
			return pad0(minutes) + ':' + pad0(seconds) + ':' + pad0(Math.floor(miliseconds));
		}
	}, {
		key: 'start',
		value: function start() {
			var _this2 = this;

			if (!this.state.running) {
				this.setState({
					running: true
				});
				this.watch = setInterval(function () {
					return _this2.step();
				}, 10);
			}
		}
	}, {
		key: 'step',
		value: function step() {
			if (!this.state.running) return;
			this.calculate();
			// this.print();
		}
	}, {
		key: 'calculate',
		value: function calculate() {
			var miliseconds = this.state.miliseconds;
			var seconds = this.state.seconds;
			var minutes = this.state.minutes;

			miliseconds += 1;
			if (miliseconds >= 100) {
				seconds += 1;
				miliseconds = 0;
			}
			if (seconds >= 60) {
				minutes += 1;
				seconds = 0;
			}
			this.setState({
				miliseconds: miliseconds,
				seconds: seconds,
				minutes: minutes
			});
		}
	}, {
		key: 'stop',
		value: function stop() {
			this.setState({
				running: false
			});
			clearInterval(this.watch);
		}
	}, {
		key: 'reset',
		value: function reset() {
			this.setState({
				running: false,
				miliseconds: 0,
				seconds: 0,
				minutes: 0
			});
		}
	}, {
		key: 'save',
		value: function save() {
			var data = this.state.results;
			var dataEl = this.format(this.state.times);

			this.setState({
				results: [].concat(_toConsumableArray(data), [dataEl])
			});
		}
	}, {
		key: 'clear',
		value: function clear() {
			this.setState({
				results: []
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ className: 'container' },
				React.createElement(
					'nav',
					{ className: 'controls' },
					React.createElement(
						'a',
						{ href: '#', className: 'button', id: 'start', onClick: this.start },
						'Start'
					),
					React.createElement(
						'a',
						{ href: '#', className: 'button', id: 'stop', onClick: this.stop },
						'Stop'
					),
					React.createElement(
						'a',
						{ href: '#', className: 'button', id: 'reset', onClick: this.reset },
						'Reset'
					)
				),
				React.createElement(
					'div',
					{ className: 'stopwatch' },
					this.format()
				),
				React.createElement(
					'nav',
					{ className: 'controls' },
					React.createElement(
						'a',
						{ href: '#', className: 'button', id: 'save', onClick: this.save },
						'Save'
					),
					React.createElement(
						'a',
						{ href: '#', className: 'button', id: 'clear', onClick: this.clear },
						'Clear'
					)
				),
				React.createElement(ResultList, { resultArr: this.state.results })
			);
		}
	}]);

	return Stopwatch;
}(React.Component);

function pad0(value) {
	var result = value.toString();
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
}

var ResultList = function (_React$Component2) {
	_inherits(ResultList, _React$Component2);

	function ResultList() {
		_classCallCheck(this, ResultList);

		return _possibleConstructorReturn(this, (ResultList.__proto__ || Object.getPrototypeOf(ResultList)).apply(this, arguments));
	}

	_createClass(ResultList, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'ul',
				null,
				this.resultArr
			);
		}
	}, {
		key: 'resultArr',
		get: function get() {
			return this.props.resultArr.map(function (result, i) {
				return React.createElement(Result, { key: i, resultItem: result });
			});
		}
	}]);

	return ResultList;
}(React.Component);

var Result = function (_React$Component3) {
	_inherits(Result, _React$Component3);

	function Result() {
		_classCallCheck(this, Result);

		return _possibleConstructorReturn(this, (Result.__proto__ || Object.getPrototypeOf(Result)).apply(this, arguments));
	}

	_createClass(Result, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'li',
				{ id: this.props.resultItem },
				this.props.resultItem
			);
		}
	}]);

	return Result;
}(React.Component);

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('app'));
