#!/bin/sh

grep -rl REPLACE_HARDCODE_VITE_APP_API_BASE_URL /srv/www/assets/ | xargs sed -i "s|REPLACE_HARDCODE_VITE_APP_API_BASE_URL|${VITE_APP_API_BASE_URL}|g"
grep -rl REPLACE_HARDCODE_VITE_APP_GRAPHQL_ENTRY /srv/www/assets/ | xargs sed -i "s|REPLACE_HARDCODE_VITE_APP_GRAPHQL_ENTRY|${VITE_APP_GRAPHQL_ENTRY}|g"

nginx -g 'daemon off;'
