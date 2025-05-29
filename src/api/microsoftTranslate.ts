import axios from 'axios';

const AZURE_TRANSLATE_KEY = process.env.AZURE_TRANSLATE_KEY;
const AZURE_ENDPOINT = process.env.AZURE_ENDPOINT;
const REGION = process.env.REGION;

export const microsoftTranslate = async (
  text: string,
  to: string = 'en'
): Promise<string> => {
  try {
    const response = await axios({
      baseURL: AZURE_ENDPOINT,
      url: '/translate?api-version=3.0',
      method: 'post',
      headers: {
        'Ocp-Apim-Subscription-Key': AZURE_TRANSLATE_KEY,
        'Ocp-Apim-Subscription-Region': REGION,
        'Content-Type': 'application/json',
      },
      params: {
        to,
      },
      data: [
        {
          Text: text,
        },
      ],
    });

    return response.data[0].translations[0].text;
  } catch (error) {
    console.error('Microsoft translation error:', error);
    return text;
  }
};
