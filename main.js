import { MainPage } from "./pages/main/index.js"

const browseDocument = document
const root = browseDocument.getElementById('root')
const mainPage = new MainPage(root, browseDocument);
mainPage.render();
