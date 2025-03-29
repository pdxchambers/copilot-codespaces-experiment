import axios from 'axios';

// Load environment variables
const { CLIENT_ID, CLIENT_SECRET, BASE_URL } = process.env;

// const BASE_URL = 'https://us.api.blizzard.com';

const getAccessToken = async () => {
  const response = await axios.post('https://us.battle.net/oauth/token', null, {
    auth: {
      username: CLIENT_ID,
      password: CLIENT_SECRET,
    },
    params: {
      grant_type: 'client_credentials',
    },
  });
  return response.data.access_token;
};

export const getCharacterData = async (realm, characterName) => {
  const token = await getAccessToken();
  const response = await axios.get(
    `${BASE_URL}/profile/wow/character/${realm}/${characterName}`,
    {
      params: {
        namespace: 'profile-us',
        locale: 'en_US',
        access_token: token,
      },
    }
  );
  return response.data;
};
