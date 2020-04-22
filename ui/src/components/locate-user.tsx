export const locateUser = () => {
  const status = document.querySelector('#locateStatus');

  let latitude: number;
  let longitude: number;

  return new Promise<{ latitude: number; longitude: number }>(
    (resolve, reject) => {
      const success = (position: any) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log('Location: ', latitude, longitude);

        resolve({ latitude, longitude });
      };

      const error = () => {
        reject('Sorry, could not locate you!');
        console.log('Error on location');
      };

      if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
      }
      navigator.geolocation.getCurrentPosition(success, error);
    }
  );
};
