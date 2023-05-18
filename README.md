# Use of DERIV API for live Stock updates

Features:-
- As a user, I can filter the asset list by category (e.g Forex, Stock indices etc) and sub-category (e.g. Major pairs), so that I can find assets that match what I’m looking for.
- As a user, I can see real-time prices for each asset, so that I can decide which one I want to trade on.
- As a user, I can see the highest and lowest price in the last 24 hour period, so that I can see the fluctuations over the day.
- As a user, I can see the highest and lowest price in a mini chart, so that I can visualize the price changes.

## Prerequisites

1. Install Node.js LTS version ([from here](https://nodejs.org/en/)).

2. For package manager, Install Yarn v1 ([from here](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)).

```sh
  npm install --global yarn
```

3. Check that Yarn is successfully installed by running: `yarn --version`

## Setup

Please follow all below steps to setup the project correctly on your local machine.

#### Clone the project repo

```sh
git clone https://github.com/Priya1311/deriv.git or download the zip folder 
```

#### Change current directory to project root folder

```sh
cd deriv
```

#### Install project dependencies

```sh
yarn install
```

#### Environment variables setup (Important)

In the project root dir, [environments](https://github.com/F3Fitness/Deriv By Priya-web/tree/main/environments) folder contains template environment files for below modes

| Mode        | Env File        |
| ----------- | --------------- |
| local       | .env            |
| development | .env.dev        |
| qa          | .env.qa         |
| staging     | .env.staging    |
| production  | .env.production |

`.env.*.local` files created contain sensitive variables and as these files are local only and are .local they are ignored by git.

```
.env # loaded in all cases
.env.local # loaded in all cases, ignored by git
.env.[mode] # only loaded in specified mode
.env.[mode].local # only loaded in specified mode, ignored by git
```

_For local development server_, Change the `VITE_API_BASE_URL` value to `"wss://ws.binaryws.com/websockets/v3"` in `.env.local` file.

_For other modes_, You must update the environment variables in `.env.[mode].local` file.

#### Launch local development server

Run below cammand in root directory, and open `localhost:3000` in your browser:

```sh
yarn start
```
## Built With

List of major frameworks/libraries used to bootstrap the project:

- [React.js](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/)
- [Chart.js](https://www.chartjs.org/docs/latest/getting-started/)
- [Socket.io](https://socket.io/docs/v4/)

Plugins/Add-ons:

- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Conventional-Commit](https://kapeli.com/cheat_sheets/Conventional_Commits.docset/Contents/Resources/Documents/index)
- [Husky](https://typicode.github.io/husky/#/)

## Reusable Components

Developed following shared components to improve code maintainability and reusability:
- Custom Chips (Used for filters)
- Custom Chart (Used to display mini chart in each row of every table)
- Custom Loader
- Custom Paper
- Custom Table with sorting
- Custom Tab 
- Custom Theme (Application can be viewed in light & dark mode)
- Header
- Side Navigation


<sup>Made with ♥ by Priya</sup>
