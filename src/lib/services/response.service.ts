interface ErrorResponse {
    data: any;
    error: {
      stackMsg: string;
      systemName: string;
      friendlyMsg: string;
      action: string;
      show: boolean;
    };
    status: number;
    success: boolean;
    notification: any;
  }
  
  class Response {
    status: number;
    data: any;
    notification: any;
    error: any;
    success: boolean;
  
    constructor(status: number, data: any, error: any, notification = {}) {
      this.status = status;
      this.data = data;
      this.notification = notification;
      this.error = error || {};
      this.success = !error;
      if (error && typeof data === "object") {
        this.error.info = this.data;
      }
    }
  
    getError(cb: (errorResponse: ErrorResponse) => void) {
      cb({
        data: this.data,
        error: {
          stackMsg: this.error.message || "",
          systemName: "",
          friendlyMsg: this.error.friendlyMsg || "",
          action: "none",
          show: true,
        },
        status: this.status,
        success: this.success,
        notification: this.notification,
      });
    }
  }
  
  export default Response;
  