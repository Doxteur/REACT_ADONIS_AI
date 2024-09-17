FROM nginx:alpine

# Copier le contenu du build dans le bon répertoire de Nginx
COPY build /usr/share/nginx/html

# Copier une configuration Nginx personnalisée si nécessaire
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
