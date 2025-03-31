import {MainPage} from "../main/index.js"
import { BackButtonComponent } from "../../components/back-button/index.js";
import { ProductComponent } from "../../components/product/index.js"

export class ProductPage {
    constructor(root, id, data, document) {
        this.root = root
        this.id = id
        this.data = data
        this.document = document
    }

    get pageRoot() {
            return this.document.getElementById('dog-page')
    }
    
    getHTML() {
        return (
            `
                <div id="dog-page"></div>
            `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.root, this.document)
        mainPage.render()
    }


    render() {
            this.root.innerHTML = ''
            const html = this.getHTML()
            this.root.insertAdjacentHTML('beforeend', html)
        
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

            const backButton = new BackButtonComponent(this.pageRoot, this.document)
            backButton.render(this.clickBack.bind(this))
    }
}