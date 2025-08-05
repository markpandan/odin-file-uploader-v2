# odin-file-uploader-v2

### App Title: <ins>**_SkyShare_**</ins>

This repository was made as a submission requirement to [The Odin Project: File Uploader](https://www.theodinproject.com/lessons/nodejs-file-uploader)

![SkyShare App Image](https://imgur.com/70avJFQ.jpg)

## Live Demo

You can access the website here: https://odin-file-uploader-v2.vercel.app/

## Features

This is a cloud storage app that features the following key aspects:

- **Account management** - Allows to sign up, and log in which utilizes [JWT (JSON Web Token)](https://www.jwt.io/introduction) as authentication
- **Create files and folders** - Which uses [Cloudinary](https://cloudinary.com/) as a cloud-based service.
- **Share and Download files** - Allows the user to share files which will provide a unique url, and provide them publicly.

## Installation

Clone this repository, and install the necessary modules by running this command in your command line that was relative to the file directory you've created:

```
npm install
```

The backend of this app was located at [odin-file-uploader-v2-api
](https://github.com/markpandan/odin-file-uploader-v2-api). Make sure to run them side-by-side to ensure that it works.

This app utilizes environment variable to secretly store the API URL. Make sure to create an `.env` file, and the place the URL of the configured API of this app to continue:

```
VITE_API_URL = "your_api_url"
```

You can now run the app by executing this command. A URL link will be provided as an output which you need to access:

```
npm run dev
```

## Components

This repository utilizes the following libraries and/or APIs:

- [React](https://react.dev/learn)
- [Tailwind CSS](https://tailwindcss.com/)
- [jwt-decode](https://www.npmjs.com/package/jwt-decode)
