## JS Assets
FROM node:20 as asset-build
WORKDIR /app

ARG PURGE_CSS=0

COPY ./node_modules /

# Copy node related configuration files
COPY package.json /
COPY webpack.config.js ./


COPY package.json yarn.lock ./

RUN yarn install
RUN yarn run build

FROM php:8.2-fpm-alpine AS app_php

ARG WORKDIR=/app

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
COPY ./docker/phpfpm/php.ini $PHP_INI_DIR/conf.d/php.ini
COPY ./docker/phpfpm/php-cli.ini $PHP_INI_DIR/conf.d/php-cli.ini
COPY ./docker/phpfpm/xdebug.ini $PHP_INI_DIR/conf.d/xdebug.ini

RUN mkdir -p ${WORKDIR}
WORKDIR ${WORKDIR}

ADD ./ /www
COPY ./vendor /www/vendor

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