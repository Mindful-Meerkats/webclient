

# Mindful Meerkats Webclient

Welcome to the webclient of Mindful Meerkats

To install the project depenedencies run:

```bash
npm i
```

To run this project you will need to spin up the server for the static hosting like this:

```bash
gulp server
```

Because we do not have any CSS checked in to the repo you would need to init the CSS by running

```bash
gulp less
```

After that you could just run:

```bash
gulp watch
```
Which will watch the frontend files for changes and rebuild when files have changed.

So to give you a quick start:
```bash
npm i
gulp less
gulp watch
gulp server # as a seperate process
```
