# Presentation ![Build Status](https://travis-ci.org/hakimel/reveal.js.svg?branch=master)

Hello! I am Pavel and today I want to speak with you about ReactJS.

## Let's do it!
### Part One
ReactJS - it's a simple library by Facebook. But so many people say that it's Framework and we can agree with it.
First relize was in March in 2013. 
ReactJS using in applications like a Instagram, Amazon, Facebook and etc.
Main React goal - it's simply UI building.

#### React is easy to learn
ReactJS is easy to learn. Yeah, it's true. For using react you should have knowledge in JavaScript, HTML and CSS. But I know people who know just frameworks but they don't have deep knowledge in JavaScript. PLease, don't do that. It's really bad practice, because you should know what you write. If you can't understand how does it work you can't write a good code.

Let's imagine that we have a project which uses pure JavaScript or it's just layout. And now we are ready for something new in our project. 
Let's create magic! And add React! (OH, not is it!)

* For add ReactJS in a project, you should add a DOM Container to the HTML. We added div with unique ID for search this block later and for add our logic.

* On the second step we should add the script tags.

And now we have first conclusions!
* You can add React in just one page or in all project

* And if you have been starting project from scratch you can use
##### WHAT MAKES REACTJS STAND OUT?
* JSX

At first ReactJS it's JSX - special syntax,  which unites XML and JS.
But you can use HTML + JavaScript. JSX helping you with DOM manipulation. 

ReactJS is a component-based library. Thanks to react-components you can build incapsulated blocks with their own state, then compose them to make complex UIs. 
When you write your code you should think in components.
##### React has two variables of components: stateful and stateless.

* Simple component

That just a simple component without its own state. U can use a simple component for render static HTML. But stateless component - isn't just static HTML. You can use this component and for dynamic HTML with props. About props I will say later.
##### So, when the simple component is needed?
    When you just need to present the props
    When you don’t need a state, or any internal variables
    When creating element does not need to be interactive
    When you want reusable code

* Statefull component

That component has state and thanks to state u can build dynamic HTML.
And your simple component can inherite state thanks to props.
##### When would you use a stateful component?
    When building element that accepts user input
    ..or element that is interactive on page
    When dependent on state for rendering, such as, fetching data before rendering
    When dependent on any data that cannot be passed down as props

* ReactDOM

ReactJS has own virtualDOM. Thanks to that your ReactJs applications are crossbrawsers(переписать). And thanks to that applications can work faster.
The main concept of virtual DOM is a new render of just changed children. Not ALL DOM. 

* Props and State

I've just said about state and props. It's two connected things. If you need just one stateful component, you can transfer values of state thanks to props. It's like a bridge between parents and children components.
