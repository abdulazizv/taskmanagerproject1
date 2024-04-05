interface ErrorMessage {
    message: string;
    friendlyMsg?: string;
  }
  
  export default class ApiError extends Error {
    status: number;
    message: string;
  
    constructor(status: number, message: string) {
      super(message);
      this.status = status;
      this.message = message;
    }
  
    static badRequest(res: any, errorMessage: ErrorMessage) {
      return res.error(400, {
        message: errorMessage.message,
        friendlyMsg: errorMessage.friendlyMsg,
      });
    }
  
    static unauthorized(res: any, errorMessage: ErrorMessage) {
      return res.error(401, {
        message: errorMessage.message,
        friendlyMsg: errorMessage.friendlyMsg,
      });
    }
  
    static forbidden(res: any, errorMessage: ErrorMessage) {
      return res.error(403, {
        message: errorMessage.message,
        friendlyMsg: errorMessage.friendlyMsg,
      });
    }
  
    static notFound(res: any, errorMessage: ErrorMessage) {
      return res.error(404, {
        message: errorMessage.message,
        friendlyMsg: errorMessage.friendlyMsg,
      });
    }
  
    static internal(res: any, errorMessage: ErrorMessage) {
      console.log(errorMessage.message);
      return res.error(500, {
        friendlyMsg: errorMessage.friendlyMsg,
      });
    }
  }
  