# Run Stage

FROM nginx:alpine
COPY nginx/nginx.conf /etc/nginx/nginx.conf

COPY dist/apps/dashboard-react/ /usr/share/nginx/html/
