# https://python-twitter.readthedocs.io/en/latest/getting_started.html
# https://twitter.com/search?l=&q=%23soccer&src=typd
import twitter
from urllib import parse
from geopy import geocoders

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
    def __init__(self, query=None, count=None, location=None, radius=None, result_type='mixed', id_user =None):
        self.query = query
        self.count = count
        self.location = location
        self.radius = radius
        if result_type in result_test:
            self.result_type = result_type
        else:
            self.result_type = 'mixed'
        if id_user is not None:
            self.id_user = id_user

    def parameters(self):
        search_query = {}
        if self.query is not None:
            search_query['q'] = self.query
        else:
            return None
        if self.count is not None:
            search_query['count'] = self.count
        if self.location is not None:
            try:
                lat_lon = gn.geocode(self.location)
                if self.radius is not None:
                    search_query['geocode'] = str(lat_lon.latitude) + ',' + str(lat_lon.longitude) + ',' + str(self.radius) + 'km'
                else:
                    search_query['geocode'] = str(lat_lon.latitude) + ',' + str(lat_lon.longitude)
            except:
                print('try reloading, could not find lat long')
        search_query['result_type'] = self.result_type
        return search_query

    def pars_url(self):
        return parse.urlencode(self.parameters())

    def results(self):
        return api.GetSearch(
            raw_query=self.pars_url())

    def send_city(self):
        # {'adminCode1': 'ENG', 'lng': '-2.97794', 'geonameId': 2644210, 'toponymName': 'Liverpool', 'countryId': '2635167', 'fcl': 'P', 'population': 864122, 'countryCode': 'GB', 'name': 'Liverpool', 'fclName': 'city, village,...', 'adminCodes1': {'ISO3166_2': 'ENG'}, 'countryName': 'United Kingdom', 'fcodeName': 'seat of a second-order administrative division', 'adminName1': 'England', 'lat': '53.41058', 'fcode': 'PPLA2'}
        return gn.geocode(self.location).raw

    def get_user(self):
        return api.GetUser(user_id=self.id_user)


# twitter_api = TwitterApi('@LFC', 50, "liverpool", 50)
twitter_api = TwitterApi('@LFC', id_user=1035908098844774401)

print(twitter_api.results())
print(twitter_api.get_user())

# print(gn.geocode("liverpool").raw)
