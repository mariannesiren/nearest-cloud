export const locateUser = () => {
  const status = document.querySelector('#locationInformation');

  let latitude: number;
  let longitude: number;

  return new Promise<{ latitude: number; longitude: number }>(
    (resolve, reject) => {
      const success = (position: any) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log('Location: ', latitude, longitude);
        status.textContent = '';

        resolve({ latitude, longitude });
      };

      const error = () => {
        status.textContent = 'Sorry, could not locate you!';
        reject('Sorry, could not locate you!');
        console.log('Error on location');
      };

      if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
      }

      status.textContent = 'Locating..';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  );
};
