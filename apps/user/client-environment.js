module.exports = {
  /**
   * Fetches the environment variables that match the prefix UI_USER.
   *
   * @param configuration
   * @returns {{"process.env": {}}}
   */
  getClientEnvironment: function getClientEnvironment(configuration) {
    const UI_USER_APP = /^UI_USER/i;

    const raw = Object.keys(process.env)
      .filter((key) => UI_USER_APP.test(key))
      .reduce(
        (env, key) => {
          env[key] = process.env[key];
          return env;
        },
        {
          NODE_ENV: process.env.NODE_ENV || configuration,
          UI_USER_APPLICATION_BUILD_DATE: new Date().toISOString(),
        }
      );

    return {
      'process.env': Object.keys(raw).reduce((env, key) => {
        env[key] = JSON.stringify(raw[key]);
        return env;
      }, {}),
    };
  },
};
