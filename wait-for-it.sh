#!/bin/bash

set -e

until mysqladmin ping -h "$DATABASE_HOST" -u "root" -p"$MYSQL_ROOT_PASSWORD"; do
  >&2 echo "Database is unavailable - sleeping"
  sleep 1
done

>&2 echo "Database is up - executing command"
exec "$@"
ç