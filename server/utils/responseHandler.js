export const successResponse = (
  res,
  statusCode = 200,
  message = "Success",
  data = null
) => {
  if (statusCode < 200 || statusCode >= 300) {
    throw new Error(
      "Invalid status code for successResponse. It should be in the 2xx range."
    );
  }

  const response = {
    message: message,
  };

  if (data) {
    response.data = data;
  }

  res.status(statusCode).json(response);
};

export const clientResponse = (
  res,
  statusCode = 400,
  message = "Client side Error",
  error = null
) => {
  if (statusCode < 400 || statusCode >= 500) {
    throw new Error(
      "Invalid status code for clientResponse. It should be in the 4xx range."
    );
  }

  const response = {
    message: message,
  };

  if (error) {
    response.data = error;
  }

  res.status(statusCode).json(response);
};

export const serverResponse = (
  res,
  statusCode = 500,
  message = "Server side Error",
  error = null
) => {
  if (statusCode < 500 || statusCode >= 600) {
    throw new Error(
      "Invalid status code for serverResponse. It should be in the 5xx range."
    );
  }

  const response = {
    message: message,
  };

  if (error instanceof Error) {
    response.data = {
      message: error.message,
      stack: error.stack,
    };
  } else {
    response.data = { message: error };
  }

  res.status(statusCode).json(response);
};
