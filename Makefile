setup:
	docker volume create nextportfolio_postgres

pull:
	git pull --rebase

db-migrate:
	docker-compose exec web npx prisma migrate deploy

deploy:
	docker-compose build
	docker-compose down
	docker-compose up -d
	make db-migrate

deploy-latest:
	make pull
	make deploy
