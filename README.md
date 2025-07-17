## To reproduce the issue

Build and run the app using turbopack
```bash
npm run build-with-turbopack
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser

See "Could not load Google Maps" displayed

### working without turbopack
Build and run the app without turbopack
```bash
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser

See a grey box displayed with an alert from google, which means that google map's sdk was properly loaded
