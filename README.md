This project is my attempt to create a quickstart codebase for
building UI with Backbone and Bootstrap. It's for my own personal
use, so please don't expect the organization of the project to
be stable or consistent over any length of time.

Instead, think of it as me sharing what I've learned thus far.
It took a few hours to crack into [webpack](http://webpack.github.io/docs/),
and I wanted to lock in the new knowledge by creating something
reusable&mdash;that's why I created this project.

The code here&mdash;what little of it that is something more
than just configuration&mdash;is all MIT-licensed. Please do with
it as you please, but do so understanding that I won't be able
to support any effort you undertake to build something with it.

And that said, if you do make use of it, I'd be happy to hear
from you: just e-mail [aaron@collegeman.net](mailto:aaron@collegeman.net).

### How to quickstart a UI project with this codebase

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

