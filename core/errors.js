const BaseError = (module.exports.BaseError = class extends Error {
  constructor(_message) {
    super(_message);
    this.name = "Internal server error";
    this.code = "ERR_INTERNAL_SERVER";
    this.statusCode = 500;
    this.errors = [];
    this.message = _message || "Internal server error";
  }
});

module.exports.EmailInUseError = class extends BaseError {
  constructor(_message) {
    super(_message);
    this.name = "Already in use error";
    this.code = "ERR_IN_USE";
    this.statusCode = 400;
    this.message = _message || "Email is already in use";
  }
};

module.exports.InvalidCredentialsError = class extends BaseError {
  constructor(_message) {
    super(_message);
    this.name = "Invalid Credentials";
    this.code = "ERR_INVALID_CREDENTIALS";
    this.statusCode = 400;
    this.message = _message || "Invalid Credentials";
  }
};

// ============== x-access-token Related Errors ============== //
module.exports.UnauthorizedError = class extends BaseError {
  constructor(_message) {
    super(_message);
    this.name = 'Unauthorized error';
    this.code = 'ERR_UNAUTHORIZED';
    this.statusCode = 401;
    this.message = _message || 'You are not authorized to perform this operation';
  }
};

module.exports.InvalidNoteIdError = class extends BaseError {
  constructor(_message) {
    super(_message);
    this.name = "Invalid Note Id";
    this.code = "ERR_INVALID_NOTE_ID";
    this.statusCode = 400;
    this.message = _message || "Invalid Note Id Entered";
  }
};

module.exports.RecordNotFoundError = class extends BaseError {
  constructor(_message) {
    super(_message);
    this.name = "Record not found error";
    this.code = "ERR_NOT_FOUND";
    this.statusCode = 404;
    this.message = _message || "Record not found";
  }
};