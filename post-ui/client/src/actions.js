export const BEGIN = "BEGIN";
export const SUCCESS = "SUCCESS";
export const ERROR = "ERROR"

export const begin = (method) => (
    {
        type: BEGIN,
        method
    }
)

export const success = (method, content) => (
    {
        type: SUCCESS,
        method,
        content
    }
);

export const error = (method, error) => (
    {
        type: ERROR,
        method,
        error
    }
);