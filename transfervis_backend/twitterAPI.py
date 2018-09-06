# https://python-twitter.readthedocs.io/en/latest/getting_started.html
# https://twitter.com/search?l=&q=%23soccer&src=typd
import twitter
from urllib import parse
from geopy import geocoders
import json
import codecs

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


class TwitterApi:
    def __init__(self, query=None, count=None, location=None, radius=None, result_type='mixed', id_user=None):
        self.query = query
        self.count = count if count is not None else 100
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
        datas =[]
        results = api.GetSearch(term=self.query, geocode=self.geocode, count=self.count, include_entities=True,
                                return_json=True)
        name = self.query[1:]+'.json'
        with open(name, 'r') as outfile:
            datas = json.load(outfile)
        # results = json.load(results)
        merged_dict = datas.copy()
        merged_dict.update(results)
        with open(name, 'a') as outfile:
            json.dump(merged_dict, outfile, indent=2)
        self.check_json_file(name)
        return results

    def get_user(self):
        return api.GetUser(user_id=self.id_user)

    def check_json_file(self,name):
        test_id = []
        rewritefile = []
        file1 = {}
        datas = []
        with codecs.open(name,'rU') as f:
            for line in f:
                datas.append(json.loads(line))

        for data in datas['statuses']:
            if data['id'] not in test_id:
                test_id.append(int(data['id']))
                rewritefile.append(data)
        with open(name, 'w') as outfile:
            # for result in results:
            file1['statuses'] = rewritefile
            file1["search_metadata"] = datas["search_metadata"]
            json.dump(file1, outfile, indent=2)
        return rewritefile


# twitter_api = TwitterApi('@LFC', 50, "liverpool", 50)
twitter_api = TwitterApi('@LFC')
twitter_api1 = TwitterApi('@premierleague')
twitter_api2 = TwitterApi('@ChelseaFC')
twitter_api3 = TwitterApi('@WatfordFC')
twitter_api4 = TwitterApi('@ManCity')
twitter_api5 = TwitterApi('@SpursOfficial')
twitter_api6 = TwitterApi('@afcbournemouth')
twitter_api7 = TwitterApi('@Everton')
twitter_api8 = TwitterApi('@LCFC')
twitter_api9 = TwitterApi('@Arsenal')
twitter_api10 = TwitterApi('@ManUtd')
twitter_api11 = TwitterApi('@Wolves')
twitter_api12 = TwitterApi('@SouthamptonFC')
twitter_api13 = TwitterApi('@FulhamFC')
twitter_api14 = TwitterApi('@OfficialBHAFC')
twitter_api15 = TwitterApi('@CPFC')
twitter_api16 = TwitterApi('@CardiffCityFC')
twitter_api17 = TwitterApi('@htafcdotcom')
twitter_api18 = TwitterApi('@NUFC')
twitter_api19 = TwitterApi('@BurnleyOfficial')
twitter_api20 = TwitterApi('@WestHamUtd')
print(twitter_api.results())
print(twitter_api1.results())
print(twitter_api2.results())
print(twitter_api3.results())
print(twitter_api4.results())
print(twitter_api5.results())
print(twitter_api6.results())
print(twitter_api7.results())
print(twitter_api8.results())
print(twitter_api9.results())
print(twitter_api10.results())
print(twitter_api11.results())
print(twitter_api12.results())
print(twitter_api13.results())
print(twitter_api14.results())
print(twitter_api15.results())
print(twitter_api16.results())
print(twitter_api17.results())
print(twitter_api18.results())
print(twitter_api19.results())
# print(twitter_api20.check_json_file('LFC.json'))
# print(twitter_api.get_user())
# print(gn.geocode("liverpool").raw)
