# log-compass

log-compass is a Node.js command-line tool that parses JSON logs from a child process's stdout and displays them in a web application.

## Installation

To install log-compass, run the following command:

    npm install -g log-compass

## Usage

To use log-compass, run the following command:

    log-compass -p [port] -- [command]

Where `-p` (optional) is the port number where the web application will be exposed, and its default value is `56428`. `[command]` is the command to run and parse logs from.

For example, to parse logs from a Node.js server and expose the web application on port `3000`, run the following command:

    log-compass -p 3000 -- node index.js

## Viewing Logs

Once log-compass is running, you can view the logs in a web browser by navigating to `http://localhost:[port]` where `[port]` is the port number specified in the command-line arguments.

The logs are displayed in a web application that updates in real-time.

## License

log-compass is licensed under the [MIT License](LICENSE).