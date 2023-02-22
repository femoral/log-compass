import {v4 as uuid} from 'uuid';

export const createGetLogsController = ({logStore}) => {
    return (req, res) => {
        res.json(logStore.get());
    };
}

export const createStreamLogsController = ({observers}) => {
    return (req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
        });

        const clientId = uuid();
        const sendEvent = (event) => {
            res.write(`data: ${event}\n\n`);
        };

        const pingInterval = setInterval(() => {
            sendEvent(JSON.stringify({type: 'ping'}));
        }, 5000);

        const notify = (data) => {
            sendEvent(JSON.stringify({ type: 'log', message: data }));
        }

        observers.add(clientId, notify);

        req.on('close', () => {
            clearInterval(pingInterval);
            observers.delete(clientId);
        });
    }
}