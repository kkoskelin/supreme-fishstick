// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  plugins: {
    'posthtml-expressions': {
      locals: {
        DEPLOY_DATE:
          process.env.CI_PIPELINE_CREATED_AT || new Date().toString(),
      },
    },
  },
};
