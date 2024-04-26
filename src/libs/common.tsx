import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import colorNameList from './namedColors.json';
dayjs.extend(isoWeek)

export function getWeekOfYear(year: number, week: number) {
  // The first monday of the first week includes at least one day of the year
  let firstMondayOfYear = dayjs().year(year).isoWeek(week).day(1)
  console.log('Monday 1:', firstMondayOfYear.format('dddd, DD MMM YYYY'))
  // Now make sure it really is the first monday of the year
  if (firstMondayOfYear.year() !== year) {
    firstMondayOfYear = firstMondayOfYear.add(7, 'days')
  }
  console.log('Monday 2:', firstMondayOfYear.format('dddd, DD MMM YYYY'))
  // return the week for that "real" first monday of the year
  return new Array(7).fill(firstMondayOfYear).map((day, idx) => day.add(idx, 'day').format('dddd, DD MMM YYYY'))
}

export const flattenObject = (obj: any, parentKey = ''): { [key: string]: any } => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (typeof value === 'object' && value !== null) {
      // Recursively flatten nested objects
      Object.assign(acc, flattenObject(value, newKey));
    } else {
      // Add leaf key-value pair
      acc[newKey] = value;
    }

    return acc;
  }, {} as { [key: string]: any }); // Type assertion here
}

export const unflattenObject = (obj: { [key: string]: any }): any => {
  const result: any = {};
  for (const [path, value] of Object.entries(obj)) {
    const keys = path.split('.');
    let currentObj = result;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      // Create nested object if it doesn't exist
      currentObj[key] = currentObj[key] || {};
      currentObj = currentObj[key];
    }
    currentObj[keys[keys.length - 1]] = value;
  }
  return result;
}

export const convertStringToBoolean = (value: string) => {
  if (value === 'true') {
    return true
  }
  return false
}


export const lightenColor = (color: string, percent: number) => {
  // If the color is a named color, use its hex value
  let namedColor = colorNameList.find(c => c.name.toLowerCase() === color.toLowerCase());
  if (namedColor) {
    color = namedColor.hex;
  }

  const num = parseInt(color.replace("#", ""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    B = ((num >> 8) & 0x00FF) + amt,
    G = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
}
export const getColorCode = (color: string) => {
  // If the color is a named color, use its hex value
  let namedColor: { name: string, hex: string } | undefined = colorNameList.find(c => c.name.toLowerCase() === color.toLowerCase());
  if (namedColor) {
    return namedColor.hex;
  }
  return color;
}

export function toCamelCase(sentence: string) {
  const words = sentence.split(' ');
  return words.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase();
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  }).join('');
}