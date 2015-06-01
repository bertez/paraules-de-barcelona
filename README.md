This is a prototype build in one day at InterDocs Barcelona 2015. Do not expect beautiful and clean code, but it works. And it is online: [Paraules de Barcelona](http://paraules.midori.ber.to/).

# Install:

1. Clone the repo
2. `npm install`
3. `bower install`
4. Create a free database at mongolab (or similar) and fill the user, pass and db url at `config/settings.js`
5. execute `grunt dev` to start the development server, then go to [http://localhost:3000](http://localhost:3000)

To create a build ready for production execute `grunt`.