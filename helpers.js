/* Small pure helpers with no domain knowledge. */

const pad = (n) => String(n).padStart(2, "0");
const fmtYMD = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const today = () => fmtYMD(new Date());
