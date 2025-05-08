import {MainPage} from "../main/index.js"
import { ProductComponent } from "../../components/product/index.js"

export class ProductPage {
    constructor(root, id, data, document) {
        this.root = root
        this.id = id
        this.data = data
        this.document = document
    }

    get pageRoot() {
        return this.document.getElementById('product-content')
    }
    
    getHTML() {
        return (
            `
            <div class="product-page">
                <header class="product-header">
                    <button id="home-button" class="home-button">
                        <span class="home-icon">🏠</span> Домой
                    </button>
                    <h2>Страница товара</h2>
                </header>
                <div id="product-content"></div>
            </div>
            <style>
                .product-page {
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                
                .product-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 16px;
                    background-color: #FFDB4D;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    position: relative;
                }
                
                .home-button {
                    display: flex;
                    align-items: center;
                    padding: 8px 16px;
                    background-color: #FFFFFF;
                    border: 2px solid #FFDB4D;
                    border-radius: 8px;
                    font-weight: 500;
                    font-family: 'YS Text', Arial, sans-serif;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .home-button:hover {
                    background-color: #F6F6F6;
                }
                
                .home-icon {
                    margin-right: 8px;
                    font-size: 18px;
                }
                
                h2 {
                    margin: 0;
                    color: #000;
                    font-weight: bold;
                }
            </style>
            `
        )
    }

    goHome() {
        const mainPage = new MainPage(this.root, this.document)
        mainPage.render()
    }

    clickBack() {
        this.goHome()
    }

    render() {
        this.root.innerHTML = ''
        const html = this.getHTML()
        this.root.insertAdjacentHTML('beforeend', html)
        
        // Добавляем обработчик для кнопки домой
        this.document.getElementById('home-button').addEventListener('click', () => this.goHome())
        
        const product = new ProductComponent(this.pageRoot)
        let dataId = +this.id
        if (isNaN(dataId)) {
            dataId = 1
        } 

        const productData = this.data.find(x => x.id === dataId)
        if(!productData) {
            console.error("polundra!!!")
        }
        product.render(productData)
    }
}
