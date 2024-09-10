"""
Django command to wait for the db to be available
"""

import time

from psycopg2 import OperationalError as Psycopg2Error
from django.db.utils import OperationalError

from django.core.management.base import BaseCommand


class Command(BaseCommand):
    """ Django Command to wait for DB"""

    def handle(self, *args, **options):
        """Entry Point for Command"""
        self.stdout.write('Waiting for Database...')
        db_up = False

        while db_up is False:
            try:
                self.check(databases=['default'])
                db_up = True

            except(Psycopg2Error, OperationalError):
                self.stdout.write('Database Unavailable, waiting 1 sec....')
                time.sleep(1)

        self.stdout.write(self.style.SUCCESS('Database Available!!'))
