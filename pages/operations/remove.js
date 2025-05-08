import { ShortCardComponent } from "../../components/short-card/remove.js"
import { OperaitonsPage } from "./index.js"


export class RemovePage {
    constructor(parent, data) {
        this.parent = parent
        this.data = data
    }

    get cardsContainer() {
        return document.getElementById("cards-container")
    }

    getHtml() {
        return `
        <style>
        /* Основные стили */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'YS Text', 'Helvetica Neue', 'Arial', sans-serif;
        }

        body {
            background-color: #f9f9f9;
            color: #222;
            line-height: 1.5;
            padding-bottom: 40px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Шапка */
        .header {
            background: #fff;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            padding: 16px 0;
            margin-bottom: 30px;
        }

        .logo-container {
            display: flex;
            align-items: center;
        }

        .logo {
            display: inline-flex;
            color: #222;
            font-weight: bold;
            font-size: 20px;
            text-decoration: none;
            align-items: center;
        }

        .logo-icon {
            color: #f33;
            margin-right: 8px;
            font-size: 22px;
        }

        /* Заголовок страницы */
        .page-title {
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 16px;
        }

        .page-description {
            font-size: 16px;
            color: #666;
            margin-bottom: 24px;
        }

        /* Инфо-блок */
        .info-block {
            background-color: #fff8e1;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 24px;
            display: flex;
            align-items: flex-start;
        }

        .info-icon {
            font-size: 20px;
            margin-right: 12px;
            margin-top: 2px;
        }

        .info-text {
            font-size: 14px;
            color: #5a5a5a;
        }

        /* Список карточек */
        .cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 16px;
            margin-bottom: 32px;
        }

        /* Карточка товара */
        .product-card {
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
            position: relative;
            transition: box-shadow 0.2s ease, transform 0.2s ease;
        }

        .product-card:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transform: translateY(-2px);
        }

        .card-image-container {
            height: 160px;
            padding: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f6f6f6;
        }

        .card-image {
            max-height: 100%;
            max-width: 100%;
            object-fit: contain;
        }

        .card-content {
            padding: 16px;
        }

        .card-title {
            font-size: 15px;
            font-weight: 500;
            color: #222;
            margin-bottom: 8px;
            line-height: 1.4;
        }

        .card-delete {
            position: absolute;
            top: 8px;
            right: 8px;
            background: #fff;
            border: none;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            transition: background 0.2s ease;
            color: #f33;
            font-size: 15px;
            z-index: 2;
        }

        .card-delete:hover {
            background: #f33;
            color: #fff;
        }

        /* Нижняя панель действий */
        .action-panel {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #fff;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
            padding: 16px 0;
            z-index: 100;
        }

        .action-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .action-info {
            font-size: 14px;
            color: #666;
        }

        .selected-count {
            font-weight: bold;
            color: #222;
        }

        .action-buttons {
            display: flex;
            gap: 10px;
        }

        .btn {
            border: none;
            border-radius: 4px;
            padding: 10px 16px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.2s ease;
        }

        .btn-secondary {
            background: #f2f2f2;
            color: #222;
        }

        .btn-secondary:hover {
            background: #e5e5e5;
        }

        .btn-danger {
            background: #f33;
            color: #fff;
        }

        .btn-danger:hover {
            background: #e62e2e;
        }

        /* Checkbox для выбора карточек */
        .card-checkbox {
            position: absolute;
            left: 8px;
            top: 8px;
            width: 20px;
            height: 20px;
            z-index: 2;
            accent-color: #fc0;
        }

        /* Пустое состояние */
        .empty-state {
            text-align: center;
            padding: 40px 0;
            background: #fff;
            border-radius: 8px;
            margin-bottom: 32px;
        }

        .empty-icon {
            font-size: 48px;
            color: #e0e0e0;
            margin-bottom: 16px;
        }

        .empty-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 8px;
            color: #333;
        }

        .empty-text {
            font-size: 14px;
            color: #666;
            max-width: 500px;
            margin: 0 auto;
        }

        /* Адаптивность */
        @media (max-width: 768px) {
            .cards-grid {
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            }
        }

        @media (max-width: 480px) {
            .cards-grid {
                grid-template-columns: 1fr;
            }
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
    </style>
    <!-- Шапка -->
    <header class="header">
        <div class="container">
            <div class="logo-container">
            <button id="home-button" class="home-button">
                        <span class="home-icon">🏠</span> Домой
                    </button>
                <a href="#" class="logo">
                    <span class="logo-icon">Я</span>
                    Маркет
                </a>
            </div>
        </div>
    </header>
            <div id="remove-page" class="container"> 
            <h1 class="page-title">Удаление товаров</h1>
        <p class="page-description">Выберите товары, которые хотите удалить из каталога</p>

        <!-- Информационный блок -->
        <div class="info-block">
            <div class="info-icon">ℹ️</div>
            <div class="info-text">
                Для удаления товара нажмите на кнопку с корзиной на карточке или выберите несколько товаров с помощью чекбоксов и удалите их одновременно.
            </div>
        </div>
                <div id="cards-container" class="cards-grid"></div>
            </div>
        `
    }

    goToPage(page) {
        page.render()
    }

    render() {
        this.parent.innerHTML = ''

        const html = this.getHtml()
        this.parent.insertAdjacentHTML('beforeend', html)

        this.data.forEach(element => {
            const card = new ShortCardComponent(this.cardsContainer)

            card.render(element)
        });

        // Добавляем обработчик для кнопки домой
        document.getElementById('home-button').addEventListener('click', () => this.goToPage(new OperaitonsPage(this.parent, this.data)))

    }
}