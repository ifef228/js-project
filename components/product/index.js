export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `
                <div class="card mb-3" style="width: 540px; border-radius: 8px; border: 1px solid #e6e6e6; box-shadow: 0 1px 3px rgba(0,0,0,0.1); font-family: Arial, sans-serif; overflow: hidden;">
    <div class="row g-0">
        <div class="col-md-4" style="background: #fff; display: flex; align-items: center; justify-content: center; padding: 15px;">
            <img src="${data.src}" class="img-fluid" alt="картинка" style="max-height: 180px; width: auto; object-fit: contain;">
        </div>
        <div class="col-md-8">
            <div class="card-body" style="padding: 20px; background: #f8f8f8;">
                <h5 class="card-title" style="margin: 0 0 12px 0; font-size: 18px; font-weight: bold; color: #333;">${data.title}</h5>
                <p class="card-text" style="margin: 0; font-size: 14px; color: #666; line-height: 1.4;">${data.text}</p>
            </div>
        </div>
    </div>
</div>
            `
        )
    }

    render(data) {
        this.parent.innerHTML = ''; 
        
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}