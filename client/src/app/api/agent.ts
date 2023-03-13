import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async response => {
    await sleep();
    return response
}, (error: AxiosError) => {
    const {data, status} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title)
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            router.navigate('/server-error', {state: {error: data}})
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Catalog = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`)
}

const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorized'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),
}

const Basket = {
    get: () => requests.get('basket'),
    addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`)
}

const agent = {
    Catalog,
    TestErrors,
    Basket
}

export default agent;

/*This is a TypeScript file that defines an Axios-based HTTP agent for making API calls to a server. It exports a default object named agent that has two properties: Catalog and TestErrors.

The sleep function is a utility function that returns a Promise that resolves after 500 milliseconds. This is used to simulate network latency in the axios.interceptors.response.use method.

The axios.defaults.baseURL property is set to http://localhost:5000/api/ to define the base URL for all requests made with Axios.

The responseBody function is a utility function that extracts the data property from an Axios response object.

The axios.interceptors.response.use method adds a delay of 500 milliseconds to all responses, simulating network latency. It also handles Axios error responses with a switch statement that
checks the response status code. If the response is a 400 Bad Request error and contains validation errors, it extracts the validation errors from the response data and throws them as an array of strings.
If the response is a 401 Unauthorized error or a 500 Internal Server Error, it displays a toast error message. If the response is a 500 Internal Server Error, it also navigates to an error page using the 
router.navigate method.

The requests object defines HTTP methods that make requests using Axios with the base URL. These methods return Promises that resolve with the response data.

The Catalog object defines two methods: list and details. These methods make GET requests to the products and products/:id endpoints, respectively, using the requests methods.

The TestErrors object defines methods that make GET requests to various buggy endpoints to test error handling.

Finally, the agent object exports the Catalog and TestErrors objects as properties, making them available for use in other modules. */



/*A promise is a JavaScript object that represents a value that may not be available yet, but will be resolved at some point in the future. It's used to handle asynchronous operations in JavaScript.

When we have a piece of code that will take some time to run, like an HTTP request to an API, we don't want our code to stop and wait for the response, as this could cause our program to freeze or 
become unresponsive. Instead, we want to execute the code and continue running other tasks while we wait for the response to come back.

This is where promises come in. Promises provide a way to handle asynchronous operations and allow us to chain multiple asynchronous operations together. Promises have three states:

Pending: The initial state, before the promise is resolved or rejected.
Resolved: The promise has been resolved with a value.
Rejected: The promise has been rejected with an error. */