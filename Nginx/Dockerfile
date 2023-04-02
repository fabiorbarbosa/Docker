FROM nginx:latest

COPY build/ /usr/share/nginx/html

ENTRYPOINT [ "/docker-entrypoint.sh" ]
CMD [ "nginx", "-g", "daemon off;" ]