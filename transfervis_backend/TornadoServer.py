from datetime import date
import tornado.ioloop
import tornado.web


class VersionHandler(tornado.web.RequestHandler):
    def data_received(self, chunk):
        pass

    def get(self):
        response = {'version': '3.5.1',
                    'last_build': date.today().isoformat()}
        self.write(response)
        self.set_header("Content-Type", "text/plain")


class GetGameByIdHandler(tornado.web.RequestHandler):
    def data_received(self, chunk):
        pass

    def get(self, id):
        response = {'id': int(id),
                    'name': 'Crazy Game',
                    'release_date': date.today().isoformat()}
        self.write(response)


application = tornado.web.Application([
    (r"/getgamebyid/([0-9]+)", GetGameByIdHandler),
    (r"/version", VersionHandler)
])

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
