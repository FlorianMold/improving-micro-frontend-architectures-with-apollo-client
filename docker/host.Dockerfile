# Run Stage

FROM nginx:alpine
COPY nginx/nginx.conf /etc/nginx/nginx.conf

COPY dist/apps/host/ /usr/share/nginx/html/

CMD ["/bin/sh", "-c", "envsubst < /usr/share/nginx/html/assets/settings.template.json > /usr/share/nginx/html/assets/settings.json && envsubst < /usr/share/nginx/html/assets/module-federation.template.manifest.json > /usr/share/nginx/html/assets/module-federation.manifest.json && exec nginx -g 'daemon off;'"]
