build:
	docker compose -f ./dev-docker/local.yml up --build -d --remove-orphans

up:
	docker compose -f ./dev-docker/local.yml up -d

down:
	docker compose -f ./dev-docker/local.yml down

down-v:
	docker compose -f ./dev-docker/local.yml down -v

show-logs:
	docker compose -f ./dev-docker/local.yml logs

volume:
	docker volume inspect mern-invoice_mongodb-data

remove-images:
	docker image prune -f --all

remove-volumes:
	docker volume prune -f 