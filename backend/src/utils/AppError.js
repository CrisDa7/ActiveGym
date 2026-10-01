/** Error "esperado" con código HTTP; el manejador global lo convierte en respuesta JSON. */
class AppError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}
module.exports = AppError;
