
project_name="log-services"

rm -rf temp
mkdir temp
cd temp
mkdir log-services && cd ../..

ls

cp -r src .env nodemon.json package.json tsconfig.json ./docker/temp/log-services

cd ./docker/temp/log-services && yarn && cd ..

tar czf log-services.tar.gz log-services && rm -rf log-services

docker stop `docker ps | grep 'log-services' | awk '{print $1}'`

docker rmi --force `docker images | grep 'log-services' | awk '{print $3}'`

docker build -f ../Dockerfile -t log-services .  

docker run -d -p 9077:9077 log-services 
