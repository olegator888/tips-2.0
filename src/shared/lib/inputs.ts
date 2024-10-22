export const normalizeInputNumberValue = (value: string) => {
  let dotIncluded = false;

  const normalized = [];

  for (const c of value) {
    if (c === "," || c === ".") {
      if (dotIncluded) continue;
      normalized.push(".");
      dotIncluded = true;
    }

    if (!/^\d+$/.test(c)) continue;

    normalized.push(c);
  }

  return normalized.join("");
};
