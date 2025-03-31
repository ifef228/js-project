export class AccordionItemComponent {
    constructor(parent, document) {
        this.parent = parent
        this.document = document
    }

    getHTML(data) {
        return (
            `
            <div class="accordion-item" style="border: 2px solid yellow;">
            <h2 class="accordion-header" id="heading${data.id}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse${data.id}" aria-expanded="false" aria-controls="#panelsStayOpen-collapse${data.id}">
                    ${data.title}
                </button>
            </h2>
            <div id="panelsStayOpen-collapse${data.id}" class="accordion-collapse collapse" aria-labelledby="heading${data.id}">
                <div class="accordion-body">
                    <img class="card-img-top dog-img" src=${data.src} alt="картинка" style="width: 40%; border: 1px solid yellow;">
                    <div style="margin-top: 5px;">
                        <strong>${data.title} </strong> ${data.text}
                        <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}" style="margin-top: 5px; background-color: yellow; color: black; border-width: 0px;">Нажми на меня</button>
                    </div>
                </div>
            </div>
        `
        )
    }

    addListeners(data, listener) {
        this.document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener)
    }

    render(data, listener) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)

        this.addListeners(data, listener)
    }
}