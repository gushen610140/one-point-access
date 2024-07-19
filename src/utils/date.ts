// 示例格式
// 2024-07-19 00:30:19

export const pad = (timeEl: number, total = 2, str = "0") => {
  return timeEl.toString().padStart(total, str);
};

export const date = (time: Date) => {
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();
  return `${pad(year, 4)}-${pad(month)}-${pad(day)} ${pad(hour)}:${pad(minute)}:${pad(second)}`;
};
