
export const dbConfig = {
  secret: 'SomeRandomSecretString',
  db: 'mongodb://sarah:hej@ds247479.mlab.com:47479/hittahem',
};

export const emailConfig = {
  service: 'Gmail',
  auth: {
    user: 'email@gmail.com',
    pass: 'Password',
  },
};

export const API_URL = process.env.NODE_ENV === 'production' ? 'http://dimitrimikadze.com:3333' : 'http://localhost:8000';
