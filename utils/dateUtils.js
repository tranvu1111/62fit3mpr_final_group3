import {
  formatDistanceToNow,
  format,
  differenceInMinutes,
  differenceInHours,
  isToday,
  isYesterday,
} from "date-fns";

export const formatUpdateAt = (date) => {
  const now = new Date();
  const targetDate = new Date(date);

  const diffInMinutes = differenceInMinutes(now, targetDate);
  const diffInHours = differenceInHours(now, targetDate);
  const diffInDays = (now - targetDate) / (1000 * 60 * 60 * 24);

  if (diffInMinutes < 1) {
    return "Just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  } else if (diffInHours < 24 && isToday(targetDate)) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else if (isYesterday(targetDate)) {
    return `Yesterday`;
  } else if (diffInHours < 48) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else if (diffInDays > 14) {
    return format(targetDate, "MMM d, yyyy");
  } else {
    return formatDistanceToNow(targetDate, { addSuffix: true });
  }
};
