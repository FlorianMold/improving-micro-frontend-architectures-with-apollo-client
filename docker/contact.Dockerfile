# Run Stage

FROM nginx:alpine
COPY nginx/nginx.conf /etc/nginx/nginx.conf

COPY dist/apps/contact/ /usr/share/nginx/html/

CMD ["/bin/sh", "-c", "envsubst < /usr/share/nginx/html/assets/settings.template.json > /usr/share/nginx/html/assets/settings.json && exec nginx -g 'daemon off;'"]
