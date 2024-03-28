ARG PHP_VERSION=8.2

FROM php:${PHP_VERSION}-fpm-alpine AS app_php

ARG WORKDIR=/app

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
COPY ./docker/phpfpm/php.ini $PHP_INI_DIR/conf.d/php.ini
COPY ./docker/phpfpm/php-cli.ini $PHP_INI_DIR/conf.d/php-cli.ini
COPY ./docker/phpfpm/xdebug.ini $PHP_INI_DIR/conf.d/xdebug.ini

RUN mkdir -p ${WORKDIR}
WORKDIR ${WORKDIR}

ENV COMPOSER_ALLOW_SUPERUSER=1

COPY composer.json composer.lock symfony.lock ./
RUN set -eux; \
	composer install --prefer-dist --no-autoloader --no-scripts  --no-progress; \
	composer clear-cache

RUN set -eux \
	&& mkdir -p var/cache var/log \
	&& composer dump-autoload --classmap-authoritative

VOLUME ${WORKDIR}/var

CMD ["php-fpm"]