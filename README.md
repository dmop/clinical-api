## Clinical API

Stack Info:
* `Postgresql` -  v10.5
* `Node.js` -  v10.9.0
* `Docker` -  v18.06.1-ce

### Run application

The simplest way to start this server is to use PM2 (Process Manager):

```
npm install pm2 -g
```
After install PM2:
```
npm start
```

Now browse to the app at `http://localhost:3333`.

#### Docker

You can use docker to run the project.

1. Alter host from '127.0.0.1' to 'postgres' in src/config/database.js

Follow this instructions to install docker on ubuntu
```
sudo apt-get update

sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
    
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo apt-key fingerprint 0EBFCD88

sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
   
sudo apt-get update

sudo apt-get install docker-ce
```

Follow this instructions to install docker-compose
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

Now, to run your project:
```
sudo docker-compose up
```

To Kill your project and your volumes:
```
sudo docker-compose down -v
```

To run docker without sudo:
```
sudo groupadd docker
sudo usermod -aG docker $USER
```
