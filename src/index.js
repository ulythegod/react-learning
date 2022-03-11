import React, { Profiler } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PropTypes from 'prop-types';
// import $ from "jquery";
// import jQuery from "jquery";
// import "chosen-js/chosen.css";
// import "chosen-js/chosen.jquery.js";

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

//Интеграция с jQuery-плагином Chosen
// function Example() {
//     return (
//         <Chosen onChange={value => console.log(value)}>
//             <option>ваниль</option>
//             <option>шоколад</option>
//             <option>клубника</option>
//         </Chosen>
//     );
// }

// class Chosen extends React.Component {
//     componentDidMount() {//вызывается после того как компонент отрендериться в dom
//         this.$el = $(this.el);
//         this.$el.chosen();

//         this.handleChange = this.handleChange.bind(this);
//         this.$el.on('change', this.handleChange);
//     }

//     componentWillUnmount() {//вызывается при удалении эл-та из dom
//         this.$el.off('change', this.handleChange);
//         this.$el.chosen('destroy');
//     }

//     componentDidUpdate(prevProps) {
//         if (prevProps.children !== this.props.children) {
//             this.$el.trigger("chosen:updated");
//         }
//     }

//     handleChange(e) {
//         this.props.onChange(e.target.value);
//     }

//     render() {
//         return (
//             <div>
//                 <select className='Chosen-select' ref={el => this.el = el}>
//                     {this.props.children}
//                 </select>
//             </div>
//         );
//     }
// }

//Использование записи через точку
const MyComponents = {
    DatePicker: function DatePicker(props) {
        return <div>color of date {props.color}</div>
    }
}

function BlueDatePicker() {
    return <MyComponents.DatePicker color="blue" />
}

//В качестве типа React-элемента нельзя использовать выражение. 
//Если вы хотите использовать выражение, чтобы указать тип элемента, 
//присвойте его в переменную, начинающуюся с заглавной буквы.

// const components = {
//     photo: <div>photo</div>,
//     video: <span>video</span>
// };


// function Story(props) {
//     const SpecificStory = components[props.storyType];
//     return <SpecificStory />
// }

//shouldComponentUpdate
class CounterButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: 1}
    }

    shouldComponentUpdate(nextProps, nextState) {//здесь проверка на наличие к-л изменений в props.color или state.count
        if (this.props.color !== nextProps.color) {
            return true;
        }

        if (this.state.count !== nextState.count) {
            return true;
        }

        return false;
    }

    render() {
        return (
            <button
                color={this.props.color}
                onClick={() => this.setState(state => ({count: state.count + 1}))}
            >
                Счетчик: {this.state.count}
            </button>
        )
    }
}

class CounterButton2 extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {count: 1};
    }

    render() {
        return (
            <button
                color={this.props.color}
                onClick={() => this.setState(state => ({count: state.count + 1}))}>
                Счётчик: {this.state.count}
            </button>
        );
    }
}

//Сила иммутабельных данных
class ListOfWords extends React.PureComponent {
    render() {
        return <div>{this.props.words.join(',')}</div>
    }
}

class WordAdder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: ['word']
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            words: [...state.words, 'word']
        }))
    }

    render() {
        return (
            <div>
                <button
                    onClick={this.handleClick}
                />
                <ListOfWords
                    words={this.state.words}
                />
            </div>
        )
    }
}

//Всплытие событий через порталы
//два соседних контейнера в DOM
const appRoot = document.getElementById('root');
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el
        );
    }
}

class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {clicks: 0};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            clicks: state.clicks + 1
        }))
    }

    render() {
        return (
            <Profiler>
                <div onClick={this.handleClick}>
                    <p>Количество кликов: {this.state.clicks}</p>
                    <p>
                        Откройте DevTools браузера, чтобы
                        убедиться, что кнопка не является
                        потомком блока div с обработчиком
                        onClick.
                    </p>
                    <Modal>
                        <Child />
                    </Modal>
                </div>
            </Profiler>
        );
    }
}

function Child() {
    return (
        <div className='modal'>
            <button>Кликните</button>
        </div>
    );
}

//React без ES6
var createReactClass = require('create-react-class');
var Greeting = createReactClass({
    render: function() {
        return <h1>Hello, Julia!</h1>
    }
})

//React без JSX
class Hello extends React.Component {
    render() {
        return React.createElement(
            'div',
            null,
            `Hello, ${this.props.toWhat}`
        );
    }
}

//Добавление рефа к DOM-элементу
//ref используется для сохранения ссылки
class CustomTextInput1 extends React.Component {
    constructor(props) {
        super(props);

        //создание рефа в поле textInput для хранения DOM-элемента
        this.textInput = React.createRef();
        this.focusTextInput = this.focusTextInput.bind(this);
    }

    focusTextInput() {
        //установка фокуса на текстовое поле с помощью чистого DOM API
        //примечание: обращаемся к current, чтобы получить DOM-узел
        this.textInput.current.focus();
    }

    render() {
        //описываем, что мы хотим связать реф input 
        //с textInput созданным в конструкторе
        return (
            <div>
                <input
                    type="text"
                    ref={this.textInput}
                />
                <input
                    type="button"
                    value="фокус на текстовом поле"
                    onClick={this.focusTextInput}
                />
            </div>
        );
    }
}

//Добавление рефа к классовому компоненту
//для того, чтобы произвести имитацию клика по customTextInput сразу же после 
//монтирования, можно
//использовать реф, чтобы получить доступ к пользовательскому input и явно 
//вызвать его метод focusTextInput
class AutoFocusTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }

    componentDidMount() {
        this.textInput.current.focusTextInput();
    }

    render() {
        return (
            <CustomTextInput1 ref={this.textInput} />
        )
    }
}

//Колбэк-рефы
class CustomTextInput2 extends React.Component {
    constructor(props) {
        super(props);

        this.textInput = null;

        this.setTextInputRef = element => {
            this.textInput = element;
        };

        this.focusTextInput = () => {
            //устанавливаем фокус на текстовом поле ввода с помощью чистого DOM API
            if (this.textInput) {
                this.textInput.focus();
            }
        }
    }

    componentDidMount() {
        //устанавливаем фокус на input при монтировании
        this.focusTextInput();
    }

    render() {
        //используем колбэк реф, чтобы сохранить ссылку на DOM элемент
        //поля текстового ввода в поле экземпляра (например, this.textInput)

        //react вфзовет ref коллбэк с ДОМ элементом при монтировании компонента
        //а также вызовет его со значением null при размонтировании. Рефы будут 
        //хранить актуальное значение перед вызовом методов componentDidMount или
        //componentDidUpdate
        return (
            <div>
                <input
                    type="text"
                    ref={this.setTextInputRef}
                />
                <input 
                    type="button"
                    value="focus the text input"
                    onClick={this.focusTextInput}
                />
            </div>
        )
    }
}

//Использование рендер-пропа для сквозных задач
//компонент отслеживает положение мыши
class MouseTracker extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = {x: 0, y: 0};
    }

    handleMouseMove(event) {
        this.setState({
            x: event.clientX,
            y: event.clientY
        })
    }

    render() {
        return (
            <div style={{height: '100vh'}} onMouseMove={this.handleMouseMove}>
                <h1>перемещайте курсор мыши!</h1>
                <p>текущее положение курсора мыши: ({this.state.x}, {this.state.y})</p>
            </div>
        );
    }
}

//использование этого поведения в другом компоненте
// Компонент <Mouse> инкапсулирует поведение, которое нам необходимо
class Mouse extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = {x: 0, y: 0};
    }

    handleMouseMove(event) {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }

    render() {
        return (
            <div style={{height: '100vh'}} onMouseMove={this.handleMouseMove}>
                {/* но как можно отрендерить что-то кроме p */}
                <p>текущее положение курсора мыши: ({this.state.x}, {this.state.y})</p>
            </div>
        );
    }
}

//у нас есть компонент <Cat>, который рендерит изображение 
//кошки, преследующей мышь по экрану
class Cat extends React.Component {
    render() {
        const mouse = this.props.mouse;
        return (
            <img src='./cat.gif' style={{position: 'absolute', left: mouse.x, top: mouse.y}}/>
        );
    }
}

class MouseWithCat extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = {x: 0, y: 0};
    }

    handleMouseMove(event) {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }

    render() {
        return (
            <div style={{height: '100vh'}} onMouseMove={this.handleMouseMove}>
                {/*
                    можно было бы просто поменять p на Cat, но тогда нужно создать
                    отдельный компонент MouseWithSomethingElse. каждый раз, когда
                    он нам нужен, поэтому MouseWithCat пока что нельзя повторно 
                    использовать
                */}
                <Cat mouse={this.state}/>
            </div>
        );
    }
}

class MouseWithoutCat extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = {x: 0, y: 0}
    }

    handleMouseMove(event) {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }

    render() {
        return (
            <div style={{height: '100vh'}} onMouseMove={this.handleMouseMove}>
                {/* вместо статического представления того, что 
                    рендерит MouseWithoutCat используется рендер-проп для 
                    динамического определения, что отрендерить */}
                {this.props.render(this.state)}
            </div>
        )
    }
}

class MouseTracker1 extends React.Component {
    render() {
        return (
            <>
                <React.StrictMode>
                    <h1>перемещайте курсор мыши!</h1>
                    <MouseWithoutCat 
                        render={mouse => (
                            <Cat mouse={mouse} />
                        )}                
                    />
                </React.StrictMode>
            </>
        );
    }
}

//Проверка типов с помощью PropTypes
class Greeting1 extends React.Component {
    render() {
        return (
            <h1>Hello {this.props.name}</h1>
        );
    }
}

Greeting1.propTypes = {
    name: PropTypes.string
}

//Значения пропсов по умолчанию
class Greeting2 extends React.Component {
    render() {
        return (
            <h1>Hello {this.props.name}</h1>
        );
    }
}

Greeting2.defaultProps = {
    name: "unknown"
}

//Функциональные компоненты
function HelloWorldComponent({name}) {
    return (
        <div>Hello {name}</div>
    )
}

HelloWorldComponent.propTypes = {
    name: PropTypes.string
}

//Обработчик неуправляемого компонента может получить имя от элемента input
class NameForm1 extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.input = React.createRef();
    }

    handleSubmit(event) {
        alert('Sent name: ' + this.input.current.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input defaultValue="Sierra" type="text" ref={this.input}/>
                </label>
                <input type={"submit"} value="Send"/>
            </form>
        );
    }
}

//Тег поля загрузки файла
class FileInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    handleSubmit(event) {
        event.preventDefault();
        alert(
            `Selected file - ${this.fileInput.current.files[0].name}`
        );
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Upload file:
                    <input type={"file"} ref={this.fileInput} />
                </label>
                <br />
                <button type='submit'>Submit</button>
            </form>
        );
    }
}

//Использование веб-компонентов в React
class HelloMessage extends React.Component {
    render() {
        return <div>Hello <x-search class="test-class">{this.props.name}</x-search></div>;
    }
}

//жизненный цикл компонента
class ClickButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { class: "off", label: "push" };

        this.press = this.press.bind(this);

        console.log("constructor");
    }

    static getDerivedStateFromError(props, state) {
        console.log("getDerivedStateFromError");
        return null;
    }

    componentDidMount() {
        console.log("componentDidMount");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
    };

    shouldComponentUpdate() {
        console.log("shouldComponentUpdate");
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("getSnapshotBeforeUpdate");
        return null;
    }

    componentDidUpdate() {
        console.log("componentDidUpdate");
    }

    press() {
        let className = (this.state.class === "off") ? "on" : "off";
        this.setState({class: className});
    }

    render() {
        console.log("render");
        return (
            <button
                onClick={this.press}
                id="test"
            >
                {this.state.label}
            </button>
        );
    }
}

class DeleteButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {isButton: false, label: "Показать"};

        this.handleButtonAppearence = this.handleButtonAppearence.bind(this);
    };

    handleButtonAppearence() {
        let labelBtn = (this.state.label === "Скрыть") ? "Показать" : "Скрыть";
        this.setState({label: labelBtn});
        this.setState({isButton: !this.state.isButton});
    }

    render() {
        return (
            <>
                {this.state.isButton && <ClickButton />}
                <button onClick={this.handleButtonAppearence}>{this.state.label}</button>
            </>
        );
    }
}

ReactDOM.render(
    <>
        <DeleteButton />
    </>,
    appRoot
);

