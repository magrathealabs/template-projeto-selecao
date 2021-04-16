""" This file contains all variables and environment
 variables needed for the
    project to run
"""

import os

# Database configuration
DATABASE_URL = os.getenv(
    'DATABASE_URL', 'not informed')
