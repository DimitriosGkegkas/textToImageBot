cd bot
yarn
yarn run lint
cd ..
docker-compose -f docker-compose.dev.yml up --build  --force-recreate 