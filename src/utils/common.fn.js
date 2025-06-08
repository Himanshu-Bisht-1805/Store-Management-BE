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

export const formatName = (str) => {
  if (!str || typeof str !== "string") return "";

  return str
    .replace(/[^a-zA-Z\s]/g, "") // remove all special characters
    .trim() // remove leading/trailing spaces
    .replace(/\s+/g, " ") // replace multiple spaces with one
    .split(" ") // split into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const formatDescription = (input) => {
  if (!input || typeof input !== "string") return "";

  return (
    input
      .trim()
      .replace(/\s+/g, " ")
      .split(".")
      .map((sentence) => {
        const trimmed = sentence.trim();
        if (trimmed.length === 0) return "";
        return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
      })
      .filter(Boolean) // remove empty sentences
      .join(". ") + (input.trim().endsWith(".") ? "." : "")
  );
};
