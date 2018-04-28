
export const dbConfig = {
  secret: 'SomeRandomSecretString',
  db: 'mongodb://sarah:hej@ds247479.mlab.com:47479/hittahem',
};

export const API_URL = process.env.NODE_ENV === 'production' ? 'http://localhost:8000' : 'http://localhost:8000';
