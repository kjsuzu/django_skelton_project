"""
Local development settings.
"""

import os

from .base import *

# session
SESSION_COOKIE_NAME = 'django_skelton_project_devel'

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
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
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': os.path.join(PROJECT_ROOT, 'logs', 'application.log'),
            'formatter': 'all',
        },
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'all',
        },
    },
    'loggers': {
        'root': {
            'handlers': ['file', 'console'],
            'level': 'DEBUG',
        },
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
        },
    },
}

# javascript webpack loading
WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': '',
        'STATS_FILE': os.path.join(BASE_DIR, 'javascript/webpack-stats-local.json'),
    }
}

# static files
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'javascript/build'),
)
