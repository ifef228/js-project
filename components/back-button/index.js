export class BackButtonComponent {
    constructor(parent, document) {
        this.parent = parent
        this.document = document
    }

    addListeners(listener) {
        this.document.getElementById("back-button")
            .addEventListener('click', listener)
    }

    getHtml() {
        return (
            `
                <button 
    id="back-button" 
    class="btn btn-primary" 
    type="button" 
    style="
        padding: 10px 20px;
        background-color: #FFDB4D;
        color: #000;
        border: none;
        border-radius: 4px;
        font-family: Arial, sans-serif;
        font-weight: bold;
        font-size: 14px;
        cursor: pointer;
        transition: background-color 0.2s ease;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    "
    onmouseover="this.style.backgroundColor='#f0c800'"
    onmouseout="this.style.backgroundColor='#FFDB4D'"
>
    Назад
</button>`
        )
    }

    render(listener) {
        const html = this.getHtml()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}