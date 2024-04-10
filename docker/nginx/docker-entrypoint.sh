#!/bin/sh
set -e

if [ "${1#-}" != "$1" ]; then
	set -- php-fpm "$@"
fi

if [ "$1" = 'php-fpm' ] || [ "$1" = 'bin/console' ]; then
    # composer install --prefer-dist --no-progress --no-interaction
    # bin/console assets:install --no-interaction

	until bin/console doctrine:query:sql "select 1" >/dev/null 2>&1; do
	    (>&2 echo "Waiting for db to be ready...")
		sleep 5
	done

	if [ -f "./migrations/*.php" ]; then
        (>&2 echo "Connection is Ready, Running Migration")
        bin/console doctrine:migrations:migrate
    else
        (>&2 echo "No migrations found, skipping migration.")
    fi
fi
exec "$@"