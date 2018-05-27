class Stopwatch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			running: false,
			display: '',
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			},
			results: []
		};

		this.print = this.print.bind(this);
		this.format = this.format.bind(this);
		this.start = this.start.bind(this);
		this.step = this.step.bind(this);
		this.calculate = this.calculate.bind(this);
		this.stop = this.stop.bind(this);
		this.reset = this.reset.bind(this);
		// this.save = this.save.bind(this);
		// this.clear = this.clear.bind(this);
	}

	print() {
		this.setState({
			display: this.format()
		});
	}

	format() {
		let miliseconds = this.state.times.miliseconds;
		let seconds = this.state.times.seconds;
		let minutes = this.state.times.minutes;
		return `${pad0(minutes)}:${pad0(seconds)}:${pad0(Math.floor(miliseconds))}`;
	}

	start() {
		const running = this.state.running
		if (!running) {
			this.setState({
				running: true
			});
			this.watch = setInterval(() => this.step(), 10);
		}
	}

	step() {
		const running = this.state.running
		if (!running) return;
		this.calculate();
		this.print();
	}

	calculate() {
		let miliseconds = this.state.times.miliseconds;
		let seconds = this.state.times.seconds;
		let minutes = this.state.times.minutes;

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

	stop() {
		this.setState({
			running: false
		});
		clearInterval(this.watch);
	}

	reset() {
		this.setState({
			running: false,
			times: {
				miliseconds: 0,
				seconds: 0,
				minutes: 0
			}
		});
	}
/*
	save() {
		//don't know yet how to do it
	}

	clear() {
		this.setState({
			results: []
		});
	}*/

	render() {
		return (
			<div className={'container'}>
				<nav className={'controls'}>
					<a href={'#'} className={'button'} id={'start'} onClick={this.start}>
						Start
					</a>
					<a href={'#'} className={'button'} id={'stop'} onClick={this.stop}>
						Stop
					</a>
					<a href={'#'} className={'button'} id={'reset'} onClick={this.reset}>
						Reset
					</a>
				</nav>
				<div className={'stopwatch'}>{this.format()}</div>
				<nav className={'controls'}>
					{/*<a href={'#'} className={'button'} id={'save'} onClick={this.save}>
						Save
					</a>
					<a href={'#'} className={'button'} id={'clear'} onClick={this.clear}>
						Clear
					</a>*/}
				</nav>
				<ul className={'results'} id={'ul'}></ul>
			</div>
		)
	}
}

function pad0(value) {
			let result = value.toString();
			if (result.length < 2) {
				result = '0' + result;
			}
			return result;
}

ReactDOM.render(<Stopwatch />, document.getElementById('app'));