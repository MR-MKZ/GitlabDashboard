export function timeConverter(minutes) {
  const minutesInADay = 1440; // 24 hours * 60 minutes
  const minutesInAnHour = 60;

  const days = Math.floor(minutes / minutesInADay);
  const hours = Math.floor((minutes % minutesInADay) / minutesInAnHour);
  const remainingMinutes = minutes % minutesInAnHour;

  const result = `${days}D ${hours}H ${remainingMinutes}M`;

  return result;
}
