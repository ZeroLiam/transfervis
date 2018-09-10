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
        results = api.GetSearch(term=self.query, geocode=self.geocode, count=self.count, include_entities=True,
                                return_json=True)
        name = self.query[1:] + '.json'
        with open(name, 'r') as outfile:
            datas = json.load(outfile)
        merged_dict = datas['statuses']
        metadata = datas["search_metadata"]
        results = json.dumps(results)
        results = json.loads(results)
        merged_dict.extend(results['statuses'])
        data = {"statuses": merged_dict, "search_metadata": metadata}
        data = self.check_json_data(data)
        with open(name, 'w') as outfile:
            json.dump(data, outfile, indent=2)
        return results

    def get_user(self):
        return api.GetUser(user_id=self.id_user)

    def check_json_data(self, datas):
        test_id = []
        rewritefile = []
        file1 = {}
        for data in datas["statuses"]:
            if data['id'] not in test_id:
                test_id.append(data['id'])
                rewritefile.append(data)
        datas["search_metadata"]["count"] = len(test_id)
        file1['statuses'] = rewritefile
        file1["search_metadata"] = datas["search_metadata"]
        return file1


# twitter_api = TwitterApi('@LFC', 50, "liverpool", 50)
# TwitterApi('#LFC').results()
# TwitterApi('@premierleague').results()
# TwitterApi('@ChelseaFC').results()
# TwitterApi('@WatfordFC').results()
# TwitterApi('@ManCity').results()
# TwitterApi('@SpursOfficial').results()
# TwitterApi('@afcbournemouth').results()
# TwitterApi('@Everton').results()
# TwitterApi('@LCFC').results()
# TwitterApi('@Arsenal').results()
# TwitterApi('@ManUtd').results()
# TwitterApi('@Wolves').results()
# TwitterApi('@SouthamptonFC').results()
# TwitterApi('@FulhamFC').results()
# TwitterApi('@OfficialBHAFC').results()
# TwitterApi('@CPFC').results()
# TwitterApi('@CardiffCityFC').results()
# TwitterApi('@htafcdotcom').results()
# TwitterApi('@NUFC').results()
# TwitterApi('@BurnleyOfficial').results()
# TwitterApi('@WestHamUtd').results()

