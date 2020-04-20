import {
  parseCloudProviders,
  parseCloudRegions,
} from '../../src/components/fetch-clouds';

test('parse functions to return correct values', () => {
  const cloudDescriptions = [
    'Africa, South Africa - Azure: South Africa North',
    'Asia, Bahrain - Amazon Web Services: Bahrain',
  ];

  const expectedProviders: string[] = ['Azure', 'Amazon Web Services'];
  const expectedRegions: string[] = ['Africa, South Africa', 'Asia, Bahrain'];

  const providers = parseCloudProviders(cloudDescriptions);
  expect(providers).toEqual(expectedProviders);

  const regions = parseCloudRegions(cloudDescriptions);
  expect(regions).toEqual(expectedRegions);
});
