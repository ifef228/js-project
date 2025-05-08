import { isPalindrome, concatenate, countPrefixes } from "../../homework.js";

export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        // Проверка на палиндром
        const isPalindromeResult = isPalindrome(data.title);
        // Находим количество слов, начинающихся на "abc"
        const prefixCount = countPrefixes(data.text.split(' '), 'abc');
        
        return (
            `
            <div id="product-card-${data.id}" class="product-card ${isPalindromeResult ? 'palindrome-card' : ''}">
                <img src="${data.src}" alt="${data.title}" class="product-image">
                <div class="product-details">
                    <div class="title-container">
                        <h5>${data.title}</h5>
                        ${isPalindromeResult ? '<span class="palindrome-badge">Палиндром!</span>' : ''}
                    </div>
                    <p>${data.text} 
                       ${prefixCount > 0 ? `<span class="prefix-info">(${prefixCount} слов начинаются с "abc")</span>` : ''}
                    </p>
                    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}"
                        style="width: 100%; padding: 10px; background-color: #FFDB4D; color: #000; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; transition: background-color 0.2s;">
                        ${concatenate(['Нажми', 'на', 'меня'], ' ')}
                    </button>
                    <div class="card-actions">
                        <button id="minus-${data.id}" class="control-button" 
                            style="margin-top: 5px; display: inline-flex;align-items: center;justify-content: center;width: 40px;height: 40px;background-color: #FFF;border: 2px solid #FFDB4D;border-radius: 8px;color: #000;font-family: 'YS Text', Arial, sans-serif;font-size: 20px;font-weight: 500;cursor: pointer;transition: all 0.3s ease;">
                            <span>-</span>
                        </button>
                        <span id="count-${data.id}" class="item-count">0</span>
                        <button id="plus-${data.id}" class="control-button"
                            style="margin-top: 5px; display: inline-flex;align-items: center;justify-content: center;width: 40px;height: 40px;background-color: #FFF;border: 2px solid #FFDB4D;border-radius: 8px;color: #000;font-family: 'YS Text', Arial, sans-serif;font-size: 20px;font-weight: 500;cursor: pointer;transition: all 0.3s ease;">
                            <span>+</span>
                        </button>
                    </div>
                </div>
                <style>
                    .product-card {
                        border: 1px solid #e0e0e0;
                        border-radius: 8px;
                        overflow: hidden;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        transition: transform 0.2s;
                        background: white;
                        margin-bottom: 15px;
                    }
                    
                    .product-card:hover {
                        transform: translateY(-5px);
                    }
                    
                    .palindrome-card {
                        border: 2px solid gold;
                        box-shadow: 0 0 10px gold;
                    }
                    
                    .product-image {
                        width: 100%;
                        height: 180px;
                        object-fit: cover;
                    }
                    
                    .product-details {
                        padding: 15px;
                    }
                    
                    .title-container {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-bottom: 8px;
                    }
                    
                    .palindrome-badge {
                        background-color: gold;
                        color: #000;
                        font-size: 12px;
                        padding: 3px 8px;
                        border-radius: 10px;
                        font-weight: bold;
                    }
                    
                    .prefix-info {
                        display: inline-block;
                        color: #666;
                        font-style: italic;
                        margin-top: 5px;
                    }
                    
                    .card-actions {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-top: 10px;
                    }
                    
                    .item-count {
                        margin: 0 10px;
                        font-weight: bold;
                        font-size: 18px;
                    }
                </style>
            </div>
            `
        );
    }

    deleteCard(data) {
        const elem = document.getElementById(`product-card-${data.id}`);
        elem.remove();
    }

    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", listener);
            
        // Счетчик для количества товаров
        let count = 0;
        const countElement = document.getElementById(`count-${data.id}`);
        
        // Кнопка минус
        document.getElementById(`minus-${data.id}`).addEventListener('click', () => {
            if (count > 0) {
                count--;
                countElement.textContent = count;
            }
            if (count === 0) {
                this.deleteCard(data);
            }
        });
        
        // Кнопка плюс
        document.getElementById(`plus-${data.id}`).addEventListener('click', () => {
            count++;
            countElement.textContent = count;
        });
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}
