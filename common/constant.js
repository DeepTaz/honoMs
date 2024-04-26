export const STATUS_CODE = {
    OK: 200, // Standard response for successful HTTP requests.
    CREATED: 201, // The request has been fulfilled, resulting in the creation of a new resource.
    ACCEPTED: 202, // The request has been accepted for processing, but the processing has not been completed.
    NO_CONTENT: 204, // The server successfully processed the request, and is not returning any content.
    BAD_REQUEST: 400, // The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).
    UNAUTHORIZED: 401, // 401 semantically means "unauthorised", the user does not have valid authentication credentials for the target resource.
    FORBIDDEN: 403, // The request contained valid data and was understood by the server, but the server is refusing action
    NOT_FOUND: 404, // The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.
    METHODE_NOT_ALLOWED: 405, // A request method is not supported for the requested resource; for example, a GET request on a form that requires data to be presented via POST, or a PUT request on a read-only resource.
    CONFLICT: 409, //Indicates that the request could not be processed because of conflict in the current state of the resource, such as an edit conflict between multiple simultaneous updates.
    UNPROCESSABLE_CONTENT: 422, // The request was well-formed (i.e., syntactically correct) but could not be processed.
    INTERNAL_SERVER_ERROR: 500, // A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.
    SERVER_TEMPORLY_UNAVALIBLE: 503, //  server has been comprised by a temporary overload (or sometimes purposeful maintenance). A DDoS attack (short for Distributed Denial of Service) is when a malicious party flood the bandwidth or resources of a specific system.
}


export const COOKIES = {
    AUTH: "auth-cookie"
}

export const HEADERS = {
    AUTH:"auth-authorization"
}