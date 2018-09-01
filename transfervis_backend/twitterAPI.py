import base64
import requests

# tweeter API Initial Setup
client_key = '317914452-Zz9yqYRmEaJ1CCpqaqeUlmfzL4VwuaH8TPTvhOpW '
client_secret = 'u8dGJHFeT87ppl3YhCpsiujBG2VVlV53nyjkWjAGQMBKq '
key_secret = '{}:{}'.format(client_key, client_secret).encode('ascii')
b64_encoded_key = base64.b64encode(key_secret)
b64_encoded_key = b64_encoded_key.decode('ascii')
base_url = 'https://api.twitter.com/'
auth_url = '{}oauth2/token'.format(base_url)
search_url = '{}1.1/search/tweets.json'.format(base_url)


class TwitterAPI():
    def __init__(self, query, count):
        self.auth_headers = {
            'Authorization': 'Basic {}'.format(b64_encoded_key),
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
        self.auth_data = {
            'grant_type': 'client_credentials'
        }
        self.query = query
        self.count = count

    def return_request(self):
        return requests.post(
            auth_url, headers=self.auth_headers, data=self.auth_data
        )

    def return_json(self):
        return self.return_request().json()

    def return_acccess_token(self):
        return self.return_json()['access_token']

    def return_search_query(self):
        search_headers = {
            'Authorization': 'Bearer {}'.format(self.return_acccess_token())
        }
        search_params = {
            'q': str(self.query),
            'result_type': 'recent',
            'count': int(self.count)
        }
        return requests.get(search_url, headers=search_headers, params=search_params)
