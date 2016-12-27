FROM node:6.9.1

RUN useradd --user-group --create-home --shell /bin/false app

RUN npm install -g nightwatch

ENV HOME=/home/app

COPY package.json $HOME/sower-ui/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/sower-ui
RUN npm cache clean && npm install --silent --progress=false

EXPOSE 3000

USER root
COPY . $HOME/sower-ui
RUN chown -R app:app $HOME/*
USER app

CMD ["npm", "start"]
