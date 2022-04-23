const dotenv = require('dotenv');

dotenv.config();


const config = {
    openSubApiKey : process.env.OPENSUB_API_KEY,
    openSubUser : process.env.OPENSUB_USER_NAME,
    openSubPass : process.env.OPENSUB_PASSWORD
}

module.exports = config