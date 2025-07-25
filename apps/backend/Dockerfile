FROM node:20-alpine

RUN apk add --no-cache bash openssl

WORKDIR /app

COPY start.sh .

RUN chmod +x start.sh

CMD ["sh", "./start.sh"]
