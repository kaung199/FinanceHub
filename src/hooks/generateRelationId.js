const generateRelationId = (userId, userName) => {
  const now = new Date();
  const formattedDate = now
    .toISOString()
    .replace(/[-:.TZ]/g, "") // Remove unwanted characters
    .slice(0, 14); // Keep only YYYYMMDDHHMMSS
  const sanitizedUserName = userName.toLowerCase().replace(/\s+/g, ""); // Convert to lowercase and remove spaces
  return `${formattedDate}${sanitizedUserName}${userId}`;
};

export default generateRelationId;
