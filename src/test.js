import { element } from 'prop-types';
import React, { Profiler } from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {act} from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';

//ReactTestUtils act
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: 0};
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        document.title = `вы нажали на кнопку ${this.state.count} раз`;
    }

    componentDidUpdate() {
        document.title = `вы нажали на кнопку ${this.state.count} раз`;
    }

    handleClick() {
        this.setState(state => ({
            count: state.count + 1,
        }));
    }

    render() {
        return (
            <div>
                <p>вы нажали на кнопку {this.state.count} раз</p>
                <button onClick={this.handleClick}>
                    click on me
                </button>
            </div>
        );
    }
}

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

it('рендер и обновление счетчика', () => {
    //тестируем первый рендер и метод componentDidMount
    act(() => {
        ReactDOM.render(<Counter />, container);
    });

    const button = container.querySelector('button');
    const label = container.querySelector('p');
    expect(label.textContent).toBe('вы нажали на кнопку 0 раз');
    expect(document.title).toBe('вы нажали на кнопку 0 раз');

    //Тестируем второй рендер и метод componentDidUpdate
    act(() => {
        button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });

    expect(label.textContent).toBe('вы нажали на кнопку 1 раз');
    expect(document.title).toBe('вы нажали на кнопку 1 раз');
});

//TestRenderer
function Link(props) {
    return <a href={props.page}>{props.children}</a>
}

const testRenderer = TestRenderer.create(
    <Link page="https://www.facebook.com/">Facebook</Link>
);

console.log(testRenderer.toJSON());//возвращает объект, представляющий собой 
//отрендеренное дерево

//поиск в дереве конкретных узлов и проверка утверждения относительно них
function MyComponent() {
    return (
        <div>
            <SubComponent foo='bar' />
            <p className='my'>Hello</p>
        </div>
    )
}

function SubComponent() {
    return (
        <p className='sub'>Sub</p>
    );
}

it('поиск в дереве конкретных узлов и проверка утверждения относительно них', () => {
    const testRenderer1 = TestRenderer.create(<MyComponent />);//создает экземпляр TestRenderer
    //для переданного React-элемента
    const tetsInstance = testRenderer1.root;//возвращает корневой тестовый экземпляр, кот. полезен
    //для проверок конкретных узлов дерева
    
    expect(tetsInstance.findByType(SubComponent).props.foo).toBe('bar');//находит единственный вложенный
    //тестовый экземпляр с указанный типом type
    expect(tetsInstance.findByProps({className: "sub"}).children).toEqual(['Sub']);//находит единственный
    //вложенный тестовый экземпляр с указанными пропсами
    //testInstance.children - дочерние тестовые экземпляры 
    //текущего тестового экземпляра
});

//Используем тестовый рендерер
class MyComponent1 extends React.Component {
    constructor(props) {
        super(props);
        this.input = null;
    }

    componentDidMount() {
        this.input.focus();
    }

    render() {
        return <input type="text" ref={el => this.input = el} />
    }
}

it('Используем тестовый рендерер', () => {
    let focused = false;
    TestRenderer.create(
      <MyComponent1 />,
      {
        createNodeMock: (element) => {
          if (element.type === 'input') {
            // возвращаем фиктивную функцию "focus"
            return {
              focus: () => {
                focused = true;
              }
            };
          }
          return null;
        }
      }
    );
    expect(focused).toBe(true);
});

