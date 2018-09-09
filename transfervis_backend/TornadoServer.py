from datetime import date
import tornado
from tornado import ioloop, web
import glob
import json
from transfervis_backend import twitterAPI
from geopy import geocoders

gn = geocoders.GeoNames(username='wassabi.vl')
from pathlib import Path

my_file = Path("data.json")


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
        response = []
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
                        temp_array.update({'location': data['user']['location']})
                        if data['user']['location'] is not None or data['user']['location'] != "":
                            try:
                                lat_lon = gn.geocode(data['user']['location'])
                                temp_array.update({'latitude': str(lat_lon.latitude)})
                                temp_array.update({'longitude': str(lat_lon.longitude)})
                            except:
                                temp_array.update({'latitude': ""})
                                temp_array.update({'longitude': ""})
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


if __name__ == "__main__":
    application = main()
    application.listen(8888)
    tornado.ioloop.IOLoop.current().start()
