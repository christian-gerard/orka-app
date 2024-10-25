server {
    listen 80;
    server_name api.orka-app.com;

    # Serve the .well-known/acme-challenge for Certbot
    location ^~ /.well-known/acme-challenge/ {
        root /var/www/certbot;
        default_type "text/plain";
    }

    # Redirect all other HTTP traffic to HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name api.orka-app.com;

    ssl_certificate /etc/letsencrypt/live/api.orka-app.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.orka-app.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location ^~ /.well-known/acme-challenge/ {
        root /var/www/certbot;  # Ensure this path matches Certbot's webroot path
        default_type "text/plain";
    }

    location /static {
        alias /vol/static;
    }

    location / {
        uwsgi_pass              ${APP_HOST}:${APP_PORT};
        include                 /etc/nginx/uwsgi_params;
        client_max_body_size    10M;
    }

}