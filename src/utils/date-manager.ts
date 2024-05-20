
export function checkSameDate(date1 : Date , date2 : Date) {
    console.log("today",date1);
    console.log("evaluate",date2);
    const date1_converted = convertTimezone(date1);
    const date2_converted = convertTimezone(date2);
    console.log("today converted", date1_converted);
    console.log("evaluate converted", date2_converted);
    return date1_converted.getFullYear() === date2_converted.getFullYear() &&
    date1_converted.getMonth() === date2_converted.getMonth() &&
    date1_converted.getDate() === date2_converted.getDate();
}

export function convertTimezone (date : Date, UTCOffset: number = -4) {
  
    const newDate = date;
    newDate.setTime(newDate.getTime() + (UTCOffset*3600000))
    return newDate;
  
  }