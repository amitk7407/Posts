export const BEGIN = "BEGIN";
export const ERROR = "ERROR";
export const SUCCESS = "SUCCESS";

export const begin = (method) => (
    {
        type: BEGIN,
        method
    }
);

export const error = (method, error) => (
    {
        type: ERROR,
        method,
        error
    }
);

export const success = (method, content) => (
    {
        type: SUCCESS,
        method,
        content
    }
);
