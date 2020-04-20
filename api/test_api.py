from unittest.mock import Mock, patch

from nose.tools import assert_equals

from api import fetch_clouds

clouds = [
    {
        "cloud_description": "Africa, South Africa - Azure: South Africa North",
        "cloud_name": "azure-south-africa-north",
        "geo_latitude": -26.198,
        "geo_longitude": 28.03,
        "geo_region": "africa"
    },
    {
        "cloud_description": "Asia, Bahrain - Amazon Web Services: Bahrain",
        "cloud_name": "aws-me-south-1",
        "geo_latitude": 26.07,
        "geo_longitude": 50.55,
        "geo_region": "south asia"
    }
]


@patch('api.requests.get')
def test_success(mock_get):
    mock_get.return_value = Mock(ok=True)
    mock_get.return_value.json.return_value = clouds
    mock_get.return_value.status_code = 200
    response = fetch_clouds()
    mock_get.fetch_clouds().assert_called
    expected_response = {'success': 'true', 'clouds': clouds}
    assert_equals(expected_response, response)


@patch('api.requests.get')
def test_failure(mock_get):
    mock_get.return_value = Mock(ok=False)
    mock_get.return_value.status_code = 400
    response = fetch_clouds()
    mock_get.fetch_clouds().assert_called
    expected_response = {'success': 'false', 'clouds': ''}
    assert_equals(expected_response, response)
