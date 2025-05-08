import { OperaitonsPage } from "../../pages/operations/index.js"

export class SearchComponent {
    constructor(parent, data) {
        this.parent = parent
        this.data = data
    }

    getHtml() {
        return (
            `
            <div class="search-container">
                <div class="search-row">
                    <input type="text" id="search-input" class="search-input" placeholder="Поиск по названию товара...">
                </div>
                
                <div class="header-buttons">
                    <div class="search-buttons">
                        <button id="search-button" class="yandex-button">
                            Найти
                        </button>
                        <button id="clear-search" class="yandex-button">
                            Очистить
                        </button>
                        <button id="operations" class="yandex-button">
                            Операции
                        </button>
                    </div>
                    <div>
                        <button id="plus" class="yandex-button">
                            <span style="margin-right: 5px;">+</span> Добавить карточку
                        </button>
                    </div>
                </div>
            </div>
            <style>
                .search-container {
                    background-color: #FFDB4D;
                    padding: 16px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                
                .search-input {
                    width: 100%;
                    padding: 12px 16px;
                    border: none;
                    border-radius: 4px;
                    font-size: 16px;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
                }
                
                .search-input:focus {
                    outline: none;
                    box-shadow: 0 0 0 2px #3390EC;
                }
                
                .header-buttons {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 16px;
                }
                
                .yandex-button {
                    background-color: #FFF;
                    border: 2px solid #FFDB4D;
                    border-radius: 8px;
                    padding: 8px 16px;
                    font-weight: 500;
                    display: inline-flex;
                    align-items: center;
                    font-family: 'YS Text', Arial, sans-serif;
                    transition: all 0.3s ease;
                    margin-right: 10px;
                    cursor: pointer;
                }
                
                .yandex-button:hover {
                    background-color: #F6F6F6;
                }
            </style>
            `
        )
    }

    render() {
        const html = this.getHtml()
        this.parent.insertAdjacentHTML('beforeend', html)
        
        document.getElementById('search-button').addEventListener('click', () => {
            const searchQuery = document.getElementById('search-input').value.toLowerCase().trim();
            
            // Если строка поиска пуста, показываем все карточки
            if (!searchQuery) {
                this.showAllCards();
                return;
            }
            
            // Получаем все контейнеры card-trio
            const cardTrioContainers = document.querySelectorAll('[id^="card-trio-"]');
            
            cardTrioContainers.forEach(container => {
                // Получаем все карточки в контейнере
                // Здесь используем общий селектор, так как точное название класса карточек неизвестно
                const cards = container.children;
                let hasVisibleCard = false;
                
                // Перебираем все карточки в контейнере
                Array.from(cards).forEach(card => {
                    // Ищем заголовок в карточке
                    const title = card.querySelector('h5');
                    
                    if (title) {
                        const titleText = title.textContent.toLowerCase();
                        
                        // Проверяем, содержит ли заголовок подстроку поиска
                        if (titleText.includes(searchQuery)) {
                            card.style.display = '';
                            hasVisibleCard = true;
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
                
                // Показываем или скрываем весь контейнер в зависимости от наличия видимых карточек
                container.style.display = hasVisibleCard ? '' : 'none';
            });
        });
        
        // Очистка поиска и отображение всех карточек
        document.getElementById('clear-search').addEventListener('click', () => {
            document.getElementById('search-input').value = '';
            this.showAllCards();
        });
        
        // Поиск при нажатии Enter
        document.getElementById('search-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('search-button').click();
            }
        });

        document.getElementById("operations").addEventListener("click", () => {
            const opsPage = new OperaitonsPage(document.getElementById('root'), this.data)
            opsPage.render()
        })
    }
    
    // Метод для отображения всех карточек
    showAllCards() {
        const cardTrioContainers = document.querySelectorAll('[id^="card-trio-"]');
        
        cardTrioContainers.forEach(container => {
            container.style.display = '';
            
            const cards = container.children;
            Array.from(cards).forEach(card => {
                card.style.display = '';
            });
        });
    }
}
