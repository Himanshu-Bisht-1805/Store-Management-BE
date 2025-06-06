export const generateUniqueString = (alias = "role", min = 8, max = 32) => {
  const cleanAlias = alias.trim().toLowerCase().replace(/\s+/g, "_");
  const timestamp = Date.now().toString(); // e.g. 1717692158123
  let base = `${cleanAlias}${timestamp}`;

  // Pad if shorter than min
  while (base.length < min) {
    base += Math.floor(Math.random() * 10); // Add random digits
  }

  // Trim if longer than max
  return base.length > max ? base.slice(0, max) : base;
};
