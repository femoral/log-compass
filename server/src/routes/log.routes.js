import { Router } from 'express';

export const createLogRouter = ({getLogsController, streamLogsController }) => {
    const router = Router();
    router.get('/', getLogsController);
    router.get('/stream', streamLogsController);
    return router;
}