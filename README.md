# webpack-bootstrap-backbone

This project is my attempt to create a quickstart codebase for
building UI with Backbone and Bootstrap. It's for my own personal
use, so please don't expect the organization of the project to
be stable or consistent over any length of time.

Instead, think of this codebase as me sharing what I've learned thus far.
It took a few hours to crack into [webpack](http://webpack.github.io/docs/),
and I wanted to lock in that new knowledge by creating something
reusable&mdash;that's why I created this project.

## But can I use this code to build something?

The code here&mdash;what little of it that is something more
than just configuration&mdash;is all MIT-licensed. Please do with
it as you please, but do so with the understanding that I won't be able
to support any effort you undertake to build something with it.

And that said, if you do make use of it, I'd be happy to hear
from you: just e-mail [aaron@collegeman.net](mailto:aaron@collegeman.net).

## How do I quickstart a UI project with this codebase?

    git clone git@github.com:collegeman/webpack-bootstrap-backbone
    npm install

If you don't want to install any other software for building your
web app&mdash;you'll probably have to, unless you're storing all
of your application's data at the client or in the cloud&mdash;you
can use Webpack's dev server to build your app:

    npm install webpack-dev-server -g
    webpack-dev-server --progress

Personally, I like [Valet](https://github.com/laravel/valet), which is
an amazing fucking feature of the Laravel ecosystem&mdash;I highly
recommend you give it a look.

## How is this project organized?

I tried to keep the files organized as logically and as close to
the webpack documentation as possible:

<img src="http://cl.ly/3b0P1q0D2Q1z/Screen%20Shot%202016-07-02%20at%2012.21.15%20PM.png" width="225px">

You'll find all application source in `src`, divided into JavaScript,
LESS, and Template source, respectively. 

Because this codebase is built on top of [Backbone](http://backbonejs.org),
I divided the JavaScript sources into Models, Collections, Views, and Routers.

The main application file is `js/app.js`.

## What modular and reusable components are in this codebase?

I've tried to put things here that I know I'll need in just about
every web app I build. I've also tried to implement each component
in a way that is responsive (in the sense that they adapt to make
the most of the screen size). 

Those things are:

- The basic building blocks of an application (a main file and a Backbone router)
- A master view on which to attach all other UI
- A base view that automatically builds a template and binds a model instance
- A hybrid modal for signing in, signing out, and resetting user accounts
- Slideout menus: left-hand, right-hand or both
- A basic User object for facilitating authentication

Things I'll be adding when I have time:

- Contenxt sensitive navbars
- Page transitions
- A standard way of presenting notifications

### The main file

The file `js/app.js` is the application main file. It setups up some basic
application components, including the router `Workspace` and the master
view `AppView`, and it initializes Backbone's history object (with pushstate
enabled).

### The master view

A view class `AppView` sets up a panel into which all other UI should be
rendered. It also sets up left-hand and right-hand menus as defined by
the properties `leftSideMenuClass` and `rightSideMenuClass`. 

You can and should create your own extension of `AppView` (refer to
Backbone's documentation for instructions).

### The base view

TBD

### The hybrid authentication modal

A view class `AuthModalView` implements a hybrid UI for signing in,
singing out, and requesting password resets. I built this to look
something like [this](https://www.facebook.com/designmodo/posts/1016706261712043)
awesome concept from DesignModo. Mine looks like this:

<img src="https://s3.amazonaws.com/f.cl.ly/items/3j1E2V2m241p2b0J1l3f/Screen%20Recording%202016-07-02%20at%2011.58%20AM.gif" border="1" alt="AuthModalView" width="300">

You can open the modal from any context by invoking `new AuthModalView().show()`,
but it makes the most sense to let your `AppView` do this when necessary.

### Slideout menus

TBD

### The User object

TBD