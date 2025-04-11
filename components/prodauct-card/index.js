export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return (
            `
                <div class="card" id="product-card-${data.id}"
    style="width: 260px; border-radius: 8px; border: 1px solid #e6e6e6; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; overflow: hidden;">
    <img class="card-img-top" src="${data.src}" alt="картинка"
        style="width: 100%; height: 200px; object-fit: contain; padding: 10px; background: #fff;">
    <div class="card-body" style="padding: 15px; background: #f8f8f8;">
        <h5 class="card-title" style="margin: 0 0 10px 0; font-size: 16px; font-weight: bold; color: #333;">
            ${data.title}</h5>
        <p class="card-text" style="margin: 0 0 15px 0; font-size: 14px; color: #666;">${data.text}</p>
        <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}"
            style="width: 100%; padding: 10px; background-color: #FFDB4D; color: #000; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; transition: background-color 0.2s;">
            Нажми на меня
        </button>
        <button id="minus-${data.id}" style="margin-top: 5px; display: inline-flex;align-items: center;justify-content: center;width: 40px;height: 40px;background-color: #FFF;border: 2px solid #FFDB4D;border-radius: 8px;color: #000;font-family: 'YS Text', Arial, sans-serif;font-size: 20px;font-weight: 500;cursor: pointer;transition: all 0.3s ease;">
            <span style="
                display: inline-block;
                transition: transform 0.3s ease;
            ">-</span>
        </button>
    </div>
</div>
            `
        )
    }

    deleteCard(data) {
        const elem = document
        .getElementById(`product-card-${data.id}`)

        elem.remove()
    }

    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener)
    }

    render(data, listener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)

        this.addListeners(data, listener)

        document.getElementById(`minus-${data.id}`).addEventListener('click', () => this.deleteCard(data))
    }
}