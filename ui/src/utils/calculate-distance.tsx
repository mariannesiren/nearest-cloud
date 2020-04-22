// calculateDistance and toRad functions are copy pasted from here:
// https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates/18883819#18883819
export const calculateDistance = (
  userLat: number,
  userLong: number,
  cloudLat: number,
  cloudLong: number
) => {
  const distanceLatRad = toRad(cloudLat - userLat);
  const distanceLonRad = toRad(cloudLong - userLong);
  const userLatRad = toRad(userLat);
  const cloudLatRad = toRad(cloudLat);

  const a =
    Math.sin(distanceLatRad / 2) * Math.sin(distanceLatRad / 2) +
    Math.sin(distanceLonRad / 2) *
      Math.sin(distanceLonRad / 2) *
      Math.cos(userLatRad) *
      Math.cos(cloudLatRad);
  const distance = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return distance;
};

const toRad = (value: number) => {
  return (value * Math.PI) / 180;
};
