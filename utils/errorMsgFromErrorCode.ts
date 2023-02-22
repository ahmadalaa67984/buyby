export const getErrorMsgFromErrorCode = (error: any) => {
  switch (error?.response?.data?.errorCode) {
    case "1": {
      return "";
    }
  }
};
