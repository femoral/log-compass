export const createObserver = () => {
    const observers = new Map();
    return {
        add: (id, callback) => observers.set(id, callback),
        delete: (id) => observers.delete(id),
        notify: (data) => observers.forEach((callback) => callback(data)),
    }
}