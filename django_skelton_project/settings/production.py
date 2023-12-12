"""
Production settings.
"""

import os

from .base import *

DEBUG = False

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'django_skelton',
        'USER': 'django_skelton',
        'PASSWORD': '',
        'HOST': '127.0.0.1',
    }
}

# Logging
LOGGING = {
    'version': 1,
    'formatters': {
        'all': {
            'format': '%(asctime)s [%(levelname)s] %(name)s %(message)s'
        },
    },
    'handlers': {
        'file_app': {
            'level': 'DEBUG',
            'class': 'logging.handlers.TimedRotatingFileHandler',
            'filename': os.path.join(PROJECT_ROOT, 'logs', 'application.log'),
            'when': 'D',
            'interval': 1,
            'formatter': 'all',
        },
        'file_serv': {
            'level': 'DEBUG',
            'class': 'logging.handlers.TimedRotatingFileHandler',
            'filename': os.path.join(PROJECT_ROOT, 'logs', 'server.log'),
            'when': 'D',
            'interval': 1,
            'formatter': 'all',
        },
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'all',
        }
    },
    'loggers': {
        'root': {
            'handlers': ['file_app'],
            'level': 'INFO',
        },
        'django': {
            'handlers': ['file_serv'],
            'level': 'INFO',
        },
    },
}

# javascript webpack loading
WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': '',
        'STATS_FILE': os.path.join(BASE_DIR, 'javascript/webpack-stats-production.json'),
    }
}

# static files
STATIC_URL = '/django_skelton/static/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'javascript/dist'),
)
