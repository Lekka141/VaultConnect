
// Health check endpoint
const healthCheck = (req, res) => {
    res.status(200).json({ message: 'API is up and running' });
  };
  
  // Get app information
  const appInfo = (req, res) => {
    res.status(200).json({ name: 'VaultConnect', version: '1.0.0' });
  };
  
  module.exports = { healthCheck, appInfo };
  
  