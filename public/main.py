import os

import cloudstorage
from google.appengine.api import app_identity

import webapp2

def get(self):
    bucket_name = os.environ.get(
        'BUCKET_NAME', app_identity.get_default_gcs_bucket_name())

    self.response.headers['Content-Type'] = 'text/plain'
    self.response.write(
        'Demo GCS Application running from Version: {}\n'.format(
            os.environ['CURRENT_VERSION_ID']))
    self.response.write('Using bucket name: {}\n\n'.format(bucket_name))