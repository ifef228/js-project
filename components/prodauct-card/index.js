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
            <!-- Обернуть все карточки в контейнер -->
<div class="products-container">
  <div class="product-card ${isPalindromeResult ? 'palindrome-card' : ''}" id="product-card-${data.id}">
    <img class="product-image" src="${data.src}" alt="${data.title}">
    <div class="product-details">
      <div class="title-container">
        <h5>${data.title}</h5>
        ${isPalindromeResult ? '<span class="palindrome-badge">Палиндром!</span>' : ''}
      </div>
      <p>
        ${data.text}
        ${prefixCount > 0 ? `<span class="prefix-info">(${prefixCount} слов начинаются с "abc")</span>` : ''}
      </p>
      <button class="btn btn-primary card-btn" id="click-card-${data.id}" data-id="${data.id}">
        ${concatenate(['Нажми', 'на', 'меня'], ' ')}
      </button>
      <div class="card-actions">
        <button id="minus-${data.id}" class="control-button"><span>-</span></button>
        <span id="count-${data.id}">0</span>
        <button id="plus-${data.id}" class="control-button"><span>+</span></button>
      </div>
    </div>
  </div>
</div>

<style>
.products-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 5px;
  /* overflow-x: auto; /* опционально, если карточек больше, чем влезает по ширине */
}
.product-card {
  flex: 0 0 320px; /* или нужная вам ширина карточки */
  min-width: 320px;
  max-width: 320px;
  min-height: 420px;
  max-height: 420px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
}
/* остальные стили оставить без изменений */

.product-card:hover {
  transform: translateY(-5px);
}

/* Палиндром */
.palindrome-card {
  border: 2px solid gold;
  box-shadow: 0 0 10px gold;
}

/* Изображение */
.product-image {
  width: 100%;
  max-width: 100%;
  height: 170px;
  object-fit: contain;   /* <=! сохраняет пропорции, не обрезает! */
  background: #f5f5f5;
  display: block;
}

/* Детали карточки */
.product-details {
  flex: 1 1 auto;
  padding: 12px 14px 16px 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  color: #666;
  font-style: italic;
  margin-top: 5px;
  font-size: 13px;
}
.card-btn {
  width: 100%;
  margin: 8px 0;
  padding: 10px;
  background-color: #FFDB4D;
  color: #000;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}
.card-btn:hover {
  background-color: #FFCC00;
}
.card-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 6px;
}
.control-button {
  margin: 0 4px;
  width: 40px;
  height: 40px;
  background-color: #FFF;
  border: 2px solid #FFDB4D;
  border-radius: 8px;
  color: #000;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}
.control-button:hover {
  background-color: #FFDB4D;
}
.item-count {
  font-weight: bold;
  font-size: 18px;
  margin: 0 10px;
}

/* Адаптивность */
@media (max-width: 1080px) {
  .product-card {
    min-width: 45%;
    max-width: 48%;
    flex-basis: 48%;
  }
}
@media (max-width: 700px) {
  .product-card {
    min-width: 95%;
    max-width: 99%;
    flex-basis: 99%;
  }
  .products-container {
    gap: 10px;
  }
}
</style>

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
