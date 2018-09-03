# https://python-twitter.readthedocs.io/en/latest/getting_started.html
# https://twitter.com/search?l=&q=%23soccer&src=typd
import twitter
from urllib import parse
from geopy import geocoders
import json

gn = geocoders.GeoNames(username='wassabi.vl')

result_test = ['mixed', 'recent', 'popular']

consumer_key = 'eF7UPCSWcf7gOj8a0pXruh12N'
consumer_secret = 'Gq5gAiVYd8mJftcPV1cas4LM4XXusucaO9LfdlBpNEo0euRmAQ'
access_token = '317914452-Zz9yqYRmEaJ1CCpqaqeUlmfzL4VwuaH8TPTvhOpW'
access_token_secret = 'u8dGJHFeT87ppl3YhCpsiujBG2VVlV53nyjkWjAGQMBKq'
api = twitter.Api(consumer_key=consumer_key,
                  consumer_secret=consumer_secret,
                  access_token_key=access_token,
                  access_token_secret=access_token_secret)


class TwitterApi():
    def __init__(self, query=None, count=None, location=None, radius=None, result_type='mixed', id_user=None):
        self.query = query
        self.count = count if count is not None else 50
        if result_type in result_test:
            self.result_type = result_type
        else:
            self.result_type = 'mixed'
        if id_user is not None:
            self.id_user = id_user
        if location is not None:
            try:
                lat_lon = gn.geocode(location)
                if radius is not None:
                    self.geocode = str(lat_lon.latitude) + ',' + str(lat_lon.longitude) + ',' + str(
                        radius) + 'km'
                else:
                    self.geocode = str(lat_lon.latitude) + ',' + str(lat_lon.longitude)
            except:
                print('try reloading, could not find lat long')
        else:
            self.geocode = None

    def results(self):
        results = api.GetSearch(term=self.query, geocode=self.geocode, count=self.count, include_entities=True,
                                return_json=True)
        print(results)
        with open('data.json', 'a') as outfile:
             # for result in results:
            json.dump(results, outfile, indent=2)
        return results

    def get_user(self):
        return api.GetUser(user_id=self.id_user)


# twitter_api = TwitterApi('@LFC', 50, "liverpool", 50)
twitter_api = TwitterApi('@LFC')

print(twitter_api.results())
# print(twitter_api.get_user())

# print(gn.geocode("liverpool").raw)
