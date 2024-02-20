let id = 0;

const getUniqueId = () => {
  return id++;
};

const escapeHtml = (unsafe) => unsafe
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");

export { getUniqueId, escapeHtml };