// Local Functions verify production Google tokens. The Auth emulator, if started,
// would reject those tokens and create-system would return 401.
if (process.env.FUNCTIONS_EMULATOR === "true") {
  delete process.env.FIREBASE_AUTH_EMULATOR_HOST;
}
