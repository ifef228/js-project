import { AddPage } from "../operations/add.js"
import { EditPagePage } from "../operations/edit.js"
import { RemovePage } from "../operations/remove.js"
import { MainPage } from "../main/index.js"


export class OperaitonsPage {
  constructor(parent, data) {
    this.parent = parent
    this.data = data
  }

  getHTML() {
    return (
      `
            <style>
    /* Основные стили */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'YS Text', 'Helvetica', 'Arial', sans-serif;
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
      margin-bottom: 24px;
    }
    
    /* Карточка с операциями */
    .operations-card {
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      padding: 24px;
      margin-bottom: 24px;
    }
    
    .operations-title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
      color: #222;
    }
    
    .operations-description {
      color: #666;
      margin-bottom: 24px;
      font-size: 15px;
    }
    
    /* Кнопки операций */
    .operations-menu {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }
    
    .operation-item {
      background: #fff;
      border: 1px solid #e5e5e5;
      border-radius: 8px;
      padding: 20px;
      transition: all 0.2s ease;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    
    .operation-item:hover {
      border-color: #FFCC00;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
      transform: translateY(-2px);
    }
    
    .operation-icon {
      background: #FFDB4D;
      width: 48px;
      height: 48px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      margin-bottom: 16px;
    }
    
    .operation-item.delete .operation-icon {
      background: #ffebed;
      color: #f33;
    }
    
    .operation-item.edit .operation-icon {
      background: #e5f0ff;
      color: #1e88e5;
    }
    
    .operation-item.add .operation-icon {
      background: #e6ffed;
      color: #34a853;
    }
    
    .operation-title {
      font-size: 17px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    
    .operation-desc {
      color: #666;
      font-size: 14px;
      flex-grow: 1;
    }
    
    .operation-button {
      background: #FFDB4D;
      border: none;
      border-radius: 4px;
      padding: 10px 16px;
      font-weight: 500;
      font-size: 15px;
      cursor: pointer;
      margin-top: 16px;
      transition: background 0.2s ease;
      color: #000;
      text-align: center;
    }
    
    .operation-button:hover {
      background: #FFCC00;
    }
    
    .operation-item.delete .operation-button {
      background: #fff;
      border: 1px solid #f33;
      color: #f33;
    }
    
    .operation-item.delete .operation-button:hover {
      background: #ffebed;
    }
    
    .operation-item.edit .operation-button {
      background: #f0f6ff;
      color: #1e88e5;
      border: 1px solid #1e88e5;
    }
    
    .operation-item.edit .operation-button:hover {
      background: #e5f0ff;
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
    
    /* Footer */
    .footer {
      margin-top: 40px;
      color: #888;
      font-size: 13px;
      text-align: center;
    }
    
    /* Adaptive */
    @media (max-width: 768px) {
      .operations-menu {
        grid-template-columns: 1fr;
      }
      
      .page-title {
        font-size: 24px;
      }
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

            <!-- Основное содержимое -->
  <main class="container">
    <h1 class="page-title">Управление товарами</h1>
    
    <div class="operations-card">
      <h2 class="operations-title">Выберите операцию</h2>
      <p class="operations-description">
        Выберите необходимое действие для работы с товарами в каталоге
      </p>
      
      <div class="operations-menu">
        <!-- Карточка добавления -->
        <div class="operation-item add">
          <div class="operation-icon">+</div>
          <h3 class="operation-title">Добавить товар</h3>
          <p class="operation-desc">
            Создание нового товара в каталоге с указанием всей необходимой информации.
          </p>
          <button class="operation-button" id="add">Добавить</button>
        </div>
        
        <!-- Карточка редактирования -->
        <div class="operation-item edit">
          <div class="operation-icon">✏️</div>
          <h3 class="operation-title">Редактировать товар</h3>
          <p class="operation-desc">
            Изменение информации о существующем товаре в каталоге.
          </p>
          <button class="operation-button"  id="edit">Редактировать</button>
        </div>
        
        <!-- Карточка удаления -->
        <div class="operation-item delete">
          <div class="operation-icon">🗑️</div>
          <h3 class="operation-title">Удалить товар</h3>
          <p class="operation-desc">
            Удаление одного или нескольких товаров из каталога.
          </p>
          <button class="operation-button"  id="remove">Удалить</button>
        </div>
      </div>
    </div>
  </main>
            `
    )
  }

  goToPage(page) {
    page.render()
  }

  getListeners() {
    const add = document.getElementById("add")
    add.addEventListener("click", () => this.goToPage(new AddPage(this.parent)))

    const edit = document.getElementById("edit")
    edit.addEventListener("click", () => this.goToPage(new EditPagePage(this.parent, this.data)))


    const remove = document.getElementById("remove")
    remove.addEventListener("click", () => this.goToPage(new RemovePage(this.parent, this.data)))

    // Добавляем обработчик для кнопки домой
    document.getElementById('home-button').addEventListener('click', () => this.goToPage(new MainPage(this.parent, document)))
  }

  render() {
    this.parent.innerHTML = ''

    const html = this.getHTML()
    this.parent.insertAdjacentHTML('beforeend', html)

    this.getListeners()
  }
}