import { isPalindrome, concatenate, countPrefixes, moveElement } from "../../homework.js";

export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        // Создаем массив характеристик товара
        const characteristics = [
            `Название: ${data.title}`,
            `Описание: ${data.text}`,
            `Является палиндромом: ${isPalindrome(data.title) ? 'Да ✓' : 'Нет ✗'}`,
        ];
        
        // Используем moveElement для перестановки элементов в массиве
        // (Переставляем последний элемент на второе место)
        if (characteristics.length > 2) {
            moveElement(characteristics, characteristics.length - 1, 1);
        }
        
        // Найдем число слов, начинающихся с "abc"
        const words = data.text.split(' ');
        const abcWords = countPrefixes(words, 'abc');
        
        return (
            `
            <div class="product-full ${isPalindrome(data.title) ? 'palindrome-highlight' : ''}">
                <div class="product-header">
                    <div class="product-image-container">
                        <img src="${data.src}" alt="${data.title}" class="product-image">
                    </div>
                    <div class="product-title-area">
                        <h2>${data.title}</h2>
                        ${isPalindrome(data.title) ? 
                          '<div class="palindrome-tag">✨ Это палиндром!</div>' : ''}
                    </div>
                </div>
                
                <div class="product-body">
                    <div class="product-description">
                        <p>${data.text}</p>
                        ${abcWords > 0 ? 
                          `<p class="prefix-note">В описании ${abcWords} ${this.getWordForm(abcWords)} с префиксом "abc"</p>` : ''}
                    </div>
                    
                    <div class="product-characteristics">
                        <h4>Характеристики:</h4>
                        <ul>
                            ${characteristics.map(char => `<li>${char}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="product-extra-info">
                        <div class="info-box">
                            <h5>Интересный факт</h5>
                            <p>${concatenate(['Знаете', 'ли', 'вы', 'что', data.title.length > 5 ? 
                              'это длинное название' : 'это короткое название'], ' ')}?</p>
                        </div>
                    </div>
                    
                    <div class="product-actions">
                        <button class="buy-button">
                            Купить сейчас
                        </button>
                        <div class="quantity-selector">
                            <button id="product-minus" class="quantity-btn">-</button>
                            <span id="product-count" class="quantity-count">1</span>
                            <button id="product-plus" class="quantity-btn">+</button>
                        </div>
                    </div>
                </div>
                
                <style>
                    .product-full {
                        padding: 20px;
                        background: white;
                        border-radius: 8px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    
                    .palindrome-highlight {
                        background: linear-gradient(to right, #fff9e6, #fff);
                        border: 2px solid gold;
                    }
                    
                    .product-header {
                        display: flex;
                        gap: 20px;
                        margin-bottom: 20px;
                    }
                    
                    .product-image-container {
                        width: 300px;
                        height: 300px;
                    }
                    
                    .product-image {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                        border-radius: 8px;
                    }
                    
                    .product-title-area {
                        display: flex;
                        flex-direction: column;
                    }
                    
                    .palindrome-tag {
                        display: inline-block;
                        background-color: gold;
                        color: #333;
                        padding: 5px 10px;
                        border-radius: 15px;
                        font-weight: bold;
                        margin-top: 10px;
                    }
                    
                    .product-description {
                        margin-bottom: 20px;
                        line-height: 1.6;
                    }
                    
                    .prefix-note {
                        font-style: italic;
                        color: #666;
                    }
                    
                    .product-characteristics {
                        margin-bottom: 20px;
                        padding: 15px;
                        background: #f8f8f8;
                        border-radius: 8px;
                    }
                    
                    .product-characteristics ul {
                        padding-left: 20px;
                    }
                    
                    .product-characteristics li {
                        margin-bottom: 8px;
                    }
                    
                    .info-box {
                        padding: 15px;
                        background: #f0f7ff;
                        border-radius: 8px;
                        margin-bottom: 20px;
                    }
                    
                    .product-actions {
                        display: flex;
                        align-items: center;
                        margin-top: 20px;
                    }
                    
                    .buy-button {
                        padding: 12px 25px;
                        background-color: #FFDB4D;
                        border: none;
                        border-radius: 8px;
                        font-weight: bold;
                        cursor: pointer;
                        transition: all 0.3s;
                    }
                    
                    .buy-button:hover {
                        background-color: #FFD11A;
                    }
                    
                    .quantity-selector {
                        display: flex;
                        align-items: center;
                        margin-left: 20px;
                    }
                    
                    .quantity-btn {
                        width: 40px;
                        height: 40px;
                        border: 2px solid #FFDB4D;
                        background: white;
                        border-radius: 8px;
                        font-size: 20px;
                        cursor: pointer;
                    }
                    
                    .quantity-count {
                        margin: 0 15px;
                        font-weight: bold;
                        font-size: 18px;
                    }
                </style>
            </div>
            `
        );
    }
    
    // Вспомогательный метод для получения правильной формы слова
    getWordForm(count) {
        if (count === 1) return 'слово';
        if (count >= 2 && count <= 4) return 'слова';
        return 'слов';
    }

    render(data) {
        this.parent.innerHTML = ''; 
        
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        
        // Добавляем обработчики для кнопок +/-
        let count = 1;
        const countElement = document.getElementById('product-count');
        
        // Кнопка минус
        const minusBtn = document.getElementById('product-minus');
        if (minusBtn) {
            minusBtn.addEventListener('click', () => {
                if (count > 1) {
                    count--;
                    countElement.textContent = count;
                }
            });
        }
        
        // Кнопка плюс
        const plusBtn = document.getElementById('product-plus');
        if (plusBtn) {
            plusBtn.addEventListener('click', () => {
                count++;
                countElement.textContent = count;
            });
        }
    }
}
