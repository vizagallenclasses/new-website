# Use lightweight Nginx Alpine image for serving static content
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy all website files to nginx html directory
COPY . /usr/share/nginx/html

# Remove config files from html directory (cleanup)
RUN rm -f /usr/share/nginx/html/Dockerfile \
    /usr/share/nginx/html/.dockerignore \
    /usr/share/nginx/html/.gitignore \
    /usr/share/nginx/html/nginx.conf \
    /usr/share/nginx/html/*.md 2>/dev/null || true

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start Nginx in foreground mode
CMD ["nginx", "-g", "daemon off;"]
