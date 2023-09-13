## Mini App Boilerplate

Project structure for mini app with sample `$fetch` and `$bridge` methods

### Important Notes

- This project is running on Vue 3 composition API
- Use Vue CLI since [Vite](https://vitejs.dev/guide/) does not support file protocol (for now) so we cannot run index.html file directly from dist folder
- Use [Pinia](https://pinia.vuejs.org/introduction.html) store for data centralize

## Project setup

This setup using docker to create containers and running through it, [install](https://www.docker.com/) it if you doesn't have one.


After you have docker install, let create a container

- Create container

```bash
docker build -t vuejs/vuejs-app  .
```

This will create a container and name it as vuejs/vuejs-app, u can rename to something else

- Run the container

```bash
docker run --name vue-js-docker -p 8080:8080 -v $(pwd):/app vuejs/vuejs-app
```

Running on port `8080` and the process container running name `vue-js-docker`
please go to to [http://localhost:8080](http://localhost:8080) to view the complete development

- Running docker container again (optional)

In case you have problem with duplicate process container
please remove it by using this below command

```bash
docker stop vue-js-docker

docker rm vue-js-docker
```

It will stop the process and remove it, then you doing the reverse step

> Noted: After the container has been running then you have something changes on your file, it will atomically update your code but the web browser won't reload, unless you refresh it.
