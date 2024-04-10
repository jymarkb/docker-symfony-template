FROM composer:2.7 AS composer-build

ARG WORKDIR=/app

RUN mkdir -p ${WORKDIR}
WORKDIR ${WORKDIR}

ENV COMPOSER_ALLOW_SUPERUSER=1

COPY composer.json composer.lock symfony.lock ./
RUN set -eux; \
    composer install --prefer-dist --no-autoloader --no-scripts --no-progress; 

RUN set -eux \
    && mkdir -p var/cache var/log \
    && composer dump-autoload --classmap-authoritative

ADD ./ /www
COPY ./vendor /www/vendor

VOLUME ${WORKDIR}/var

## JS Assets
FROM node:20 as asset-build
WORKDIR /app

COPY ./node_modules /
COPY package.json yarn.lock ./

RUN yarn install
RUN yarn run build

FROM php:8.2-fpm-alpine AS php-build

WORKDIR /app

# Install required packages and extensions
RUN apk add --no-cache \
        $PHPIZE_DEPS \
        mysql-dev \
        linux-headers \
        icu-dev \
    && docker-php-ext-install pdo_mysql \
    && pecl install xdebug \
    && docker-php-ext-enable xdebug \
    && docker-php-ext-configure intl \
    && docker-php-ext-install intl \
    && apk del $PHPIZE_DEPS \
    && rm -rf /tmp/* /var/cache/apk/*

RUN docker-php-ext-enable intl

# COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
COPY ./docker/phpfpm/php.ini $PHP_INI_DIR/conf.d/php.ini
COPY ./docker/phpfpm/php-cli.ini $PHP_INI_DIR/conf.d/php-cli.ini
COPY ./docker/nginx/docker-entrypoint.sh /usr/local/bin/docker-entrypoint
# No need to copy xdebug.ini separately; it's enabled using docker-php-ext-enable

RUN chmod +x /usr/local/bin/docker-entrypoint
ENTRYPOINT ["docker-entrypoint"]

CMD ["php-fpm"]