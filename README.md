# webpack-bootstrap-backbone

This is a quickstart codebase for building responsive hybrid mobile apps with Backbone and Bootstrap. 

## Can I use this code to build something?

This codebase is intended mostly for my own personal use, so please 
don't expect the organization of the project to be stable or consistent 
over any length of time.

That said, this codebase is MIT-licensed, so you may do with
it as you please, but do so with the understanding that I won't be able
to support any effort you undertake to build something with it.

## How do I quickstart a project with this codebase?

    git clone git@github.com:collegeman/webpack-bootstrap-backbone
    npm install
    webpack --progress --watch

More than likely, you'll need a backend for your project. 
But if you're storing all of your application's data at the client or 
in the cloud&mdash;you can use Webpack's dev server to serve and
test your app:

    npm install webpack-dev-server -g
    webpack-dev-server --progress

Personally, I use [Valet](https://github.com/laravel/valet) to run
Laravel or WordPress for my backend.

## How is this project organized?

<img src="http://cl.ly/3b0P1q0D2Q1z/Screen%20Shot%202016-07-02%20at%2012.21.15%20PM.png" width="225px">

You'll find all application source in `src`, divided into JavaScript,
LESS, and Template sources. And because this codebase is built on top 
of [Backbone](http://backbonejs.org), I divided the JavaScript sources 
into Models, Collections, Views, and Routers.

The main application file is `js/app.js`.

## What modular and reusable components are in this codebase?

I've tried to put components in this project that I know I'll need
in just about any project I build.

Those components are:

- The basic building blocks of any application: a main loop, a master app view, and a router
- UI for faciliating login, logout, and resetting of user accounts
- Support for panel menus on the left side, the right side, or both sides at the same time ([Slideout](https://github.com/Mango/slideout))
- An API for managing navigation between screens and the animation of those transitions ([Navstack](https://github.com/rstacruz/navstack))
- Icons and emojis&mdash;care of Bootstrap, [Font Awesome](http://fontawesome.io/), and [EmojiOne](http://emojione.com/)

And these components are on my roadmap:

- A standard way of presenting notifications

### The main file

The file `js/app.js` is your application's main loop. It setups up some basic
application components, including the router `Workspace` and the master
view `AppView`, and it initializes Backbone's history object (with pushstate
enabled).

### The master view

A view class `AppView` sets up a panel into which all other UI is rendered. 
This panel contains a reference to the Navstack instance that's used to manage 
all of your application's views.

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