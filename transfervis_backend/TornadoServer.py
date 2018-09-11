from datetime import date
import tornado
from tornado import ioloop, web
import glob
import json
from transfervis_backend import twitterAPI
from geopy import geocoders
from geotext import GeoText
import pycountry
from pathlib import Path

gn = geocoders.GeoNames(username='wassabi.vl', timeout=30)

my_file = Path("data.json")

clubs = ['helseaFC', 'lfc', 'WatfordFC', 'ManCity', 'SpursOfficial', 'afcbournemouth', 'Everton', 'LCFC',
         'Arsenal', 'ManUtd', 'Wolves', 'SouthamptonFC', 'FulhamFC', 'OfficialBHAFC', 'CPFC', 'CardiffCityFC',
         'htafcdotcom', 'NUFC', 'BurnleyOfficial', 'WestHamUtd']
Dates = ['Tue Sep 04', 'Wed Sep 05', 'Thu Sep 06', 'Fri Sep 07', 'Sat Sep 08', 'Sun Sep 09', 'Mon Sep 10']


class VersionHandler(tornado.web.RequestHandler):
    def data_received(self, chunk):
        pass

    def get(self):
        response = {'data': 'Getting',
                    'last_build': date.today().isoformat()}
        self.write(response)
        self.set_header("Content-Type", "text/plain")

    def on_finish(self):
        return MainHandler

    @staticmethod
    def new_data():
        twitterAPI.TwitterApi('#LFC').results()
        twitterAPI.TwitterApi('@premierleague').results()
        twitterAPI.TwitterApi('@ChelseaFC').results()
        twitterAPI.TwitterApi('@WatfordFC').results()
        twitterAPI.TwitterApi('@ManCity').results()
        twitterAPI.TwitterApi('@SpursOfficial').results()
        twitterAPI.TwitterApi('@afcbournemouth').results()
        twitterAPI.TwitterApi('@Everton').results()
        twitterAPI.TwitterApi('@LCFC').results()
        twitterAPI.TwitterApi('@Arsenal').results()
        twitterAPI.TwitterApi('@ManUtd').results()
        twitterAPI.TwitterApi('@Wolves').results()
        twitterAPI.TwitterApi('@SouthamptonFC').results()
        twitterAPI.TwitterApi('@FulhamFC').results()
        twitterAPI.TwitterApi('@OfficialBHAFC').results()
        twitterAPI.TwitterApi('@CPFC').results()
        twitterAPI.TwitterApi('@CardiffCityFC').results()
        twitterAPI.TwitterApi('@htafcdotcom').results()
        twitterAPI.TwitterApi('@NUFC').results()
        twitterAPI.TwitterApi('@BurnleyOfficial').results()
        twitterAPI.TwitterApi('@WestHamUtd').results()


class MainHandler(tornado.web.RequestHandler):
    def data_received(self, chunk):
        pass

    def get(self):
        response = self.get_json_data()
        print(response)
        # self.write(json.dumps(response))
        self.render('trail.html', items=response)

    def get_json_data(self):
        for filename in glob.glob('*.json'):
            with open(filename, 'r') as outfile:
                if outfile.name is not "data.json":
                    datas = json.load(outfile)
                    temp_array = {}
                    for data in datas["statuses"]:
                        temp_array.update({'created_at': data['created_at']})
                        temp_array.update({'id_str': data['id_str']})
                        temp_array.update({'name': data['user']['name']})
                        temp_array.update({'screen_name': data['user']['screen_name']})
                        temp_array.update({'text': data["text"]})
                        temp_array.update({'location': data['user']['location']})
                        if data['user']['location'] is not None or data['user']['location'] != "":
                            try:
                                lat_lon = gn.geocode(data['user']['location'])
                                temp_array.update({'latitude': str(lat_lon.latitude)})
                                temp_array.update({'longitude': str(lat_lon.longitude)})
                            except:
                                places = GeoText(data['user']['location'])
                                lat_lon = gn.geocode(places.cities + ', ' + places.countries)
                                temp_array.update({'latitude': str(lat_lon.latitude)})
                                temp_array.update({'longitude': str(lat_lon.longitude)})
                        temp_array.update({'user_mentions': data['entities']['user_mentions']})
                        temp_array.update({'retweet_count': data['retweet_count']})
                        temp_array.update({'favorite_count': data['favorite_count']})
                        with open('data.json', 'a') as outfile:
                            outfile.write(',')
                            json.dump(temp_array, outfile, indent=2)

        with open(my_file, 'wr') as outfile:
            response = json.load(outfile)
        return response


def main():
    return tornado.web.Application([
        (r"/", MainHandler),
        # (r"/getnewdata", VersionHandler)
    ], debug=True)


def get_json_data():
    # for filename in glob.glob('*.json'):
    with open('ManCity.json', 'r') as outfile:
        datas = json.load(outfile)
        temp_array = {}
        for data in datas["statuses"]:
            if data['user']['location'] is not None or data['user']['location'] != "":
                temp_array.update({'created_at': data['created_at']})
                temp_array.update({'id_str': data['id_str']})
                temp_array.update({'name': data['user']['name']})
                temp_array.update({'screen_name': data['user']['screen_name']})
                temp_array.update({'text': data["text"]})
                temp_array.update({'location': data['user']['location']})
                lat_lon = gn.geocode(data['user']['location'])
                if not lat_lon or lat_lon.latitude or not lat_lon.longitude:
                    places = GeoText(data['user']['location'])
                    cou = '' if not places.countries else places.countries[0]
                    lou = ' ' if not places.cities else places.cities[0]
                    lat_lon = gn.geocode(lou + ' ' + cou)
                    if lat_lon and lat_lon.address:
                        temp_array.update({'location': lat_lon.address})
                        temp_array.update({'latitude': str(lat_lon.latitude)})
                        temp_array.update({'longitude': str(lat_lon.longitude)})
                    else:
                        temp_array.update({'latitude': ''})
                        temp_array.update({'longitude': ''})
                else:
                    temp_array.update({'location': str(lat_lon.address)})
                    temp_array.update({'latitude': str(lat_lon.latitude)})
                    temp_array.update({'longitude': str(lat_lon.longitude)})
                temp_array.update({'user_mentions': data['entities']['user_mentions']})
                temp_array.update({'retweet_count': data['retweet_count']})
                temp_array.update({'favorite_count': data['favorite_count']})
                with open('data.json', 'a') as outfile1:
                    outfile1.write(',')
                    json.dump(temp_array, outfile1, indent=2)
                    print(temp_array)
        with open('data.json', 'a') as outfile1:
            outfile1.write(']')

    with open('data.json', 'r') as outfile:
        response = json.load(outfile)
    return response


def summary_json():
    with open('data.json', 'r') as outfile:
        datas = json.load(outfile)
        towrite2 = {}
        for club in clubs:
            towrite = {}
            towrite1 = {}
            for date in Dates:
                for country1 in pycountry.countries:
                    retweet_count = 0
                    favorite_count = 0
                    for data1 in datas:
                        if club.lower() in data1["text"].lower() and (
                                country1.alpha_2 in data1["location"][-3:] or country1.name in
                                data1['location']) and date in data1["created_at"]:
                            retweet_count += int(data1['retweet_count'])
                            favorite_count += int(data1["favorite_count"])
                    if retweet_count is not 0 and favorite_count is not 0:
                        lat_lon = gn.geocode(country1.name)
                        this = {"retweet_count": retweet_count, "favorite_count": favorite_count, "latitude":lat_lon.latitude, "longitude":lat_lon.longitude}
                        towrite.update({country1.name: this})

                towrite1.update({date: towrite})
            towrite2.update({club: towrite1})
    with open('min_data.json', 'w') as outfile1:
        json.dump(towrite2, outfile1, indent=2)


if __name__ == "__main__":
    # data = get_json_data()
    summary_json()
    # application = main()
    # application.listen(8888)
    # tornado.ioloop.IOLoop.current().start()
