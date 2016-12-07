const toBasicAuth = (email, password) => {
  const base64String = new Buffer(`${email}:${password}`).toString('base64');
  return `Basic ${base64String}`;
};

export default toBasicAuth;
