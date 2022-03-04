import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square 
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        )
    }

    render() {
        return (
            <div>
                <div className='board-row'>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

function Square(props) {//Управляемый компонент, им полностью управляет Board
    return (
        <button 
            className='square'
            onClick={props.onClick}
        >
            {props.value}
        </button>
    )
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((value, index) => {
            const desc = index ?
            'Go to move #' + index :
            'Go to start';

            return (
                <li key={'move-button-' + index}>
                    <button onClick={() => this.jumpTo(index)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner ' + winner;
        } else {
            status = 'Next player ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className='game'>
                <div className='game-board'>
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className='game-info'>
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

function     calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

//React examples
//Классовый компонент, стейты
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <h1>Привет, мир!</h1>
                <FormattedDate date={this.state.date} />
            </div>
        );
    }
}

function FormattedDate(props) {
    return <h2>Сейчас {props.date.toLocaleTimeString()}.</h2>;
}

//формы
class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            essay: 'Введите текст',
            taste: 'coconut',
            isGoing: true,
            numberOfGuests: 2
        };
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeTextArea = this.handleChangeTextArea.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
  
    handleChange(event) {
        this.setState({
            ...this.state,
            name: event.target.value
        });
    }

    handleChangeTextArea(event) {
        this.setState({
            ...this.state,
            essay: event.target.value
        });
    }

    handleChangeSelect(event) {
        this.setState({
            ...this.state,
            taste: event.target.value
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            [name]: value
        });
    }
  
    handleSubmit(event) {
        console.log('Отправленное имя: ' + this.state.name);
        console.log('Текст сообщения: ' + this.state.essay);
        console.log('Вкус: ' + this.state.taste);
        console.log('Пойдут: ' + this.state.isGoing);
        console.log('Количество гостей: ' + this.state.numberOfGuests);
        event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Имя:
            <input type="text" value={this.state.name} onChange={this.handleChange} />
          </label>
          <br />
          <label>
              <textarea value={this.state.essay} onChange={this.handleChangeTextArea} />
          </label>
          <br />
          <label>
                Выберите ваш любимый вкус:
                <select value={this.state.taste} onChange={this.handleChangeSelect}>
                    <option value="grapefruit">Грейпфрут</option>
                    <option value="lime">Лайм</option>
                    <option value="coconut">Кокос</option>
                    <option value="mango">Манго</option>
                </select>
          </label>
          <br />
          <label>
                Пойдут:
                <input 
                    name='isGoing'
                    type='checkbox'
                    checked={this.state.isGoing}
                    onChange={this.handleInputChange}
                />
          </label>
          <br />
          <label>
                Количество гостей:
                <input
                    name='numberOfGuests'
                    type='name'
                    value={this.state.numberOfGuests}
                    onChange={this.handleInputChange}
                />
          </label>
          <br />
          <input type="submit" value="Отправить" />
        </form>
      );
    }
  }

//Калькулятор температуры
const scaleNames = {
    c: 'Цельсия',
    f: 'Фаренгейта'
}

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>Вода закипит.</p>
    } 

    return <p>Вода не закипит.</p>
}

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }

    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Введите температуру в градусах {scaleNames[scale]}</legend>
                <input value={temperature} onChange={this.handleChange} />
            </fieldset>
        );
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {temperature: '', scale: 'c'}
    }

    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature});
    }

    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
            <div>
                <TemperatureInput 
                    scale='c'
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange}
                />
                <TemperatureInput 
                    scale='f'
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange}
                />
                <BoilingVerdict
                    celsius={parseFloat(celsius)}
                />
            </div>
        );
    }
}

//Композиция против наследования
function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    )
}

function WelcomeDialog() {
    return (
        <Dialog
            title="Добро пожаловать"
            message="Спасибо, что посетили наш космический корабль!" />
    )
}

function Dialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className='Dialog-title'>
                {props.title}
            </h1>
            <p className='Dialog-message'>
                {props.message}
            </p>
        </FancyBorder>
    )
}

//Программное управление фокусом
class CustomTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }

    focus() {
        if (!this.textInput.current.value) {
            this.textInput.current.focus();
        }        
    }

    render() {
        return (
            <>
                <input
                    type="text"
                    ref={this.textInput}
                />
                <button onClick={this.focus.bind(this)}>Test</button>
            </>
        );
    }
}

//Работа с событиями мыши
class OuterClickExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {isOpen: false};
        this.toggleContainer = React.createRef();

        this.onClickHandler = this.onClickHandler.bind(this);
        this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
    }

    componentDidMount() {
        window.addEventListener('click', this.onClickOutsideHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.onClickOutsideHandler);
    }

    onClickHandler() {
        this.setState(currentState => ({
            isOpen: !currentState.isOpen
        }))
    }

    onClickOutsideHandler(event) {
        if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
            this.setState({isOpen: false});
        }
    }

    render() {
        return (
            <div ref={this.toggleContainer}>
                <button onClick={this.onClickHandler}>
                    Select an option
                </button>
                {this.state.isOpen && (
                    <ul>
                        <li>Option 1</li>
                        <li>Option 2</li>
                        <li>Option 3</li>
                    </ul>
                )}
            </div>
        );
    }
}

class BlurExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {isOpen: false};
        this.timeOutId = null;

        this.onClickHandler = this.onClickHandler.bind(this);
        this.onBlurHandler = this.onBlurHandler.bind(this);
        this.onFocusHandler = this.onFocusHandler.bind(this);
    }

    onClickHandler() {
        this.setState(currentState => ({
            isOpen: !currentState.isOpen
        }))
    }

    onBlurHandler() {
        this.timeOutId = setTimeout(() => {
            this.setState({
                isOpen: false
            })
        });
    }

    onFocusHandler() {
        clearTimeout(this.timeOutId);
    }

    render() {
        return (
            <div onBlur={this.onBlurHandler}
                onFocus={this.onFocusHandler}
            >
                <button onClick={this.onClickHandler}
                    aria-haspopup="true"
                    aria-expanded={this.state.isOpen}
                >
                    Select an option
                </button>
                {this.state.isOpen && (
                    <ul>
                        <li>Option 1</li>
                        <li>Option 2</li>
                        <li>Option 3</li>
                    </ul>
                )}
            </div>
        );
    }
}

//Когда использовать контекст
const ThemeContext = React.createContext('light');

class App extends React.Component {
    render() {
        return (
            <ThemeContext.Provider value='dark'>
                <Toolbar />
            </ThemeContext.Provider>
        );
    }
}

function Toolbar() {
    return (
        <div>
            <ThemeButton />
        </div>
    );
}

class ThemeButton extends React.Component {
    static contextType = ThemeContext;
    render() {
        return <button theme={this.context}>Button</button>
    }
}

//Представляем предохранители (компоненты Error Boundary)
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false}
    }

    static getDerivedStateFromError(error) {
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Что-то пошло не так</h1>
        }

        return this.props.children;
    }
}

class Test extends React.Component {
    render() {
        return (
            <div>
                {Number(4).parseInt()}
            </div>
        );
    }
}

//Перенаправление рефов в DOM-компоненты
const FancyButton = React.forwardRef((props, ref) => (//react передает ref в функцию (props, ref) =>
    <button ref={ref/* ref передается дальше, ref.current будет указывать на DOM-узел button*/} className="FancyButton">
        {props.children}
    </button>
));

const ref = React.createRef();//реф создается вызовом createRef и записывается в переменнную ref

// ReactDOM.render(//переменная ref передается в <FancyButton ref={ref}>
//     <>
//         <FancyButton ref={ref}>Click me!</FancyButton>
//     </>,
//     document.getElementById('root')
// );

//Фрагменты с ключами
let glossaryArr = [
    {
        id: 1,
        term: "test",
        descriptions: "jgjhdgjhfd"
    },
    {
        id: 2,
        term: "test2",
        descriptions: "gdfhggfdh"
    },
    {
        id: 3,
        term: "test3",
        descriptions: "rteterte"
    },
    {
        id: 4,
        term: "test4",
        descriptions: "hlhjlkh"
    },
    {
        id: 5,
        term: "test5",
        descriptions: "xzxvcx"
    },
];

function Glossary(props) {
    return (
        <dl>
            {props.items.map(item => (
                <React.Fragment key={item.id}>
                    <dt>{item.term}</dt>
                    <dd>{item.descriptions}</dd>
                </React.Fragment>
            ))}
        </dl>
    );
}

ReactDOM.render(
    <>
        <Glossary items={glossaryArr} />
    </>,
    document.getElementById('root')
);

