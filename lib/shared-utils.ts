import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// tailwind helper
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// delay helper
export function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}

export const convertDate = (_date: string, options?: {
  locale?: string,
  year?: "numeric" | "2-digit" | undefined
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined
  day?: "numeric" | "2-digit" | undefined
}) => {
  return new Date(_date).toLocaleDateString(options?.locale ?? "en-US", {
    year: options?.year ?? 'numeric',
    month: options?.month ?? 'short',
    day: options?.day ?? '2-digit'
  })
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function capitalise(str: string) {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncate(str: string, length: number): string {
  if (str.length > length) {
    return str.slice(0, length) + '...';
  }
  return str;
}

export function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!user || !domain) {
    console.log("Invalid email format");
  }

  const maskedUser = user.length > 2 ? user.slice(0, 3) + '*'.repeat(3) : user;
  return `${maskedUser}@${domain}`;
}

export function timeSince(pastDate: string | Date) {

  const currentDate = new Date();

  if (typeof pastDate === 'string') {
    pastDate = new Date(pastDate);
  }

  const diff = currentDate.getTime() - pastDate.getTime();

  const dayDiff = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hourDiff = Math.floor(diff / (1000 * 60 * 60));
  const minDiff = Math.floor(diff / (1000 * 60));

  if (dayDiff > 365) {
    const yearDiff = Math.floor(dayDiff / 365);
    return `${yearDiff} year${yearDiff > 1 ? 's' : ''} ago`;
  } else if (dayDiff > 30) {
    const monthDiff = Math.floor(dayDiff / 30);
    return `${monthDiff} month${monthDiff > 1 ? 's' : ''} ago`;
  } else if (dayDiff > 7) {
    const weekDiff = Math.floor(dayDiff / 7);
    return `${weekDiff} week${weekDiff > 1 ? 's' : ''} ago`;
  } else if (dayDiff > 0) {
    return `${dayDiff} day${dayDiff > 1 ? 's' : ''} ago`;
  } else if (hourDiff > 0) {
    return `${hourDiff} hour${hourDiff > 1 ? 's' : ''} ago`;
  } else if (minDiff > 0) {
    return `${minDiff} minute${minDiff > 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
}