# logbud

logbud is a Node.js command-line tool that parses JSON logs from a child process's stdout and displays them in a web application.

## Installation

To install logbud, run the following command:

    npm install -g logbud

## Usage

To use logbud, run the following command:

    logbud -p [port] -- [command]

Where `-p` (optional) is the port number where the web application will be exposed, and its default value is `56428`. `[command]` is the command to run and parse logs from.

For example, to parse logs from a Node.js server and expose the web application on port `3000`, run the following command:

    logbud -p 3000 -- node index.js

## Viewing Logs

Once logbud is running, you can view the logs in a web browser by navigating to `http://localhost:[port]` where `[port]` is the port number specified in the command-line arguments.

The logs are displayed in a web application that updates in real-time.

## License

logbud is licensed under the [MIT License](LICENSE).