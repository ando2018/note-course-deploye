module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'note-course-dev-secret-change-me',
  PORT: process.env.PORT || 3001,
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_DB: process.env.MONGODB_DB || 'note-course',
};
