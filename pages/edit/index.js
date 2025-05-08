import { ajax } from "../../modules/ajax.js"
import { productUrls } from "../../modules/productUrls.js"
import { MainPage } from "../main/index.js"
import { EditPagePage } from "../operations/edit.js"
import { OperaitonsPage } from "../operations/index.js"

export class EditPage {
    constructor(parent, data) {
        this.parent = parent
        this.data = data
    }

    getHtml() {
        return `
            <style>
        /* Основные стили */
        :root {
            --primary: #FC3F1D;
            --primary-hover: #F33517;
            --yellow: #FFDD2D;
            --yellow-hover: #FCC521;
            --gray-lightest: #F5F5F5;
            --gray-light: #E5E5E5;
            --gray: #B3B3B3;
            --dark: #21201F;
            --blue: #3E77AA;
            --blue-light: #E5F0FF;
            --green: #34A853;
            --red: #F33;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'YS Text', 'Helvetica Neue', Arial, sans-serif;
        }

        body {
            background-color: #f9f9f9;
            color: var(--dark);
            line-height: 1.5;
            min-height: 100vh;
        }

        .container {
            max-width: 1000px;
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
            color: var(--dark);
            font-weight: bold;
            font-size: 20px;
            text-decoration: none;
            align-items: center;
        }

        .logo-icon {
            color: var(--primary);
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

        /* Форма добавления товара */
        .add-product-card {
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
            padding: 30px;
            margin-bottom: 40px;
        }

        .form-header {
            margin-bottom: 24px;
        }

        .form-title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 8px;
        }

        .form-description {
            color: #666;
            font-size: 14px;
        }

        .form-group {
            margin-bottom: 22px;
        }

        .form-label {
            display: block;
            font-weight: 500;
            margin-bottom: 8px;
            font-size: 15px;
            color: #333;
        }

        .form-control {
            width: 100%;
            padding: 12px 14px;
            border: 1px solid var(--gray-light);
            border-radius: 4px;
            font-size: 15px;
            transition: all 0.2s;
        }

        .form-control:focus {
            border-color: var(--blue);
            outline: none;
            box-shadow: 0 0 0 2px rgba(62, 119, 170, 0.2);
        }

        .form-hint {
            display: block;
            margin-top: 6px;
            font-size: 13px;
            color: #888;
        }

        .has-error .form-control {
            border-color: var(--red);
        }

        .has-error .form-hint {
            color: var(--red);
        }

        textarea.form-control {
            min-height: 120px;
            resize: vertical;
        }

        /* Предпросмотр изображения */
        .image-preview {
            margin-top: 16px;
            background: var(--gray-lightest);
            border-radius: 6px;
            padding: 16px;
            text-align: center;
            min-height: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .preview-placeholder {
            color: #666;
            font-size: 14px;
        }

        .preview-image {
            max-width: 100%;
            max-height: 200px;
            object-fit: contain;
        }

        /* Кнопки */
        .form-actions {
            margin-top: 30px;
            display: flex;
            gap: 12px;
            align-items: center;
            justify-content: flex-end;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 15px;
            font-weight: 500;
            text-align: center;
            border: none;
            padding: 12px 24px;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s;
        }

        .btn-primary {
            background: var(--yellow);
            color: var(--dark);
        }

        .btn-primary:hover {
            background: var(--yellow-hover);
        }

        .btn-secondary {
            background: white;
            color: var(--dark);
            border: 1px solid var(--gray-light);
        }

        .btn-secondary:hover {
            background: var(--gray-lightest);
        }

        /* Инфо-блок */
        .info-block {
            background-color: var(--blue-light);
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

        /* Footer */
        .footer {
            margin-top: 60px;
            padding: 24px 0;
            border-top: 1px solid var(--gray-light);
            font-size: 13px;
            color: #777;
            text-align: center;
        }

        /* Адаптивность */
        @media (max-width: 768px) {
            .form-actions {
                flex-direction: column-reverse;
                align-items: stretch;
            }
            
            .btn {
                width: 100%;
            }
            
            .add-product-card {
                padding: 20px;
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
                <a href="#" class="logo">
                    <span class="logo-icon">Я</span>
                    Маркет
                </a>
            </div>
        </div>
    </header>

    <!-- Основное содержимое -->
    <main class="container">
        <h1 class="page-title">Редактирование товара</h1>
        <p class="page-description">Добавьте новый товар в каталог</p>

        <!-- Информационный блок -->
        <div class="info-block">
            <div class="info-icon">ℹ️</div>
            <div class="info-text">
                Заполните все обязательные поля. Товар будет опубликован после проверки модератором.
            </div>
        </div>

        <!-- Форма добавления товара -->
        <div class="add-product-card">
            <div class="form-header">
                <h2 class="form-title">Информация о товаре</h2>
                <p class="form-description">Заполните основную информацию о товаре</p>
            </div>

            <form id="add-product-form">
                <!-- Изображение товара -->
                <div class="form-group">
                    <label for="product-src" class="form-label">URL изображения товара *</label>
                    <input 
                        type="url" 
                        class="form-control" 
                        id="product-src" 
                        name="src" 
                        placeholder=${this.data.src}
                        value=${this.data.src}
                    >
                    <span class="form-hint">Укажите прямую ссылку на изображение товара</span>
                    
                    <!-- Предпросмотр изображения -->
                    <div class="image-preview">
                        <div class="preview-placeholder">Здесь будет отображаться предпросмотр изображения</div>
                        <!-- <img src="" alt="Предпросмотр товара" class="preview-image" style="display: none;"> -->
                    </div>
                </div>

                <!-- Название товара -->
                <div class="form-group">
                    <label for="product-title" class="form-label">Название товара *</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="product-title" 
                        name="title" 
                        placeholder=${this.data.title}
                        value=${this.data.title}
                        maxlength="100"
                    >
                    <span class="form-hint">До 100 символов</span>
                </div>

                <!-- Описание товара -->
                <div class="form-group">
                    <label for="product-text" class="form-label">Описание товара *</label>
                    <textarea 
                        class="form-control" 
                        id="product-text" 
                        name="text" 
                        placeholder=${this.data.text} 
                        value=${this.data.text}
                        maxlength="1000"
                    >${this.data.text}</textarea>
                    <span class="form-hint">Опишите товар подробно, указав его характеристики и особенности</span>
                </div>

                <!-- Кнопки действий -->
                <div class="form-actions">
                    <button id="exit" type="button" class="btn btn-secondary">Отмена</button>
                    <button id="submit" type="submit" class="btn btn-primary">Отредактировать товар</button>
                </div>
            </form>
        </div>
    </main>
        `
    }

    // Функция валидации формы
    validateForm() {
        // Проверка URL изображения
        const srcInput = document.getElementById('product-src');
        const srcValue = srcInput.value.trim();

        if (!srcValue) {
            this.showError(srcInput, 'Укажите URL изображения');
            return false;
        }

        try {
            new URL(srcValue);
        } catch (e) {
            this.showError(srcInput, 'Укажите корректный URL');
            return false;
        }

        // Проверка названия товара
        const titleInput = document.getElementById('product-title');
        const titleValue = titleInput.value.trim();

        if (!titleValue) {
            this.showError(titleInput, 'Укажите название товара');
            return false;
        }

        if (titleValue.length < 3) {
            this.showError(titleInput, 'Название товара должно содержать не менее 3 символов');
            return false;
        }

        // Проверка описания товара
        const textInput = document.getElementById('product-text');
        const textValue = textInput.value.trim();

        if (!textValue) {
            this.showError(textInput, 'Добавьте описание товара');
            return false;
        }

        if (textValue.length < 10) {
            this.showError(textInput, 'Описание товара должно содержать не менее 10 символов');
            return false;
        }

        // Убираем все ошибки
        this.clearErrors();

        return true;
    }

    // Функция для отображения ошибки валидации
    showError(inputElement, message) {
        // Находим родительский элемент
        const formGroup = inputElement.closest('.form-group');

        // Добавляем класс ошибки
        formGroup.classList.add('has-error');

        // Находим или создаем элемент с сообщением об ошибке
        let errorElement = formGroup.querySelector('.error-message');

        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'form-hint error-message';
            formGroup.appendChild(errorElement);
        }

        // Устанавливаем сообщение об ошибке
        errorElement.textContent = message;

        // Фокусируемся на поле с ошибкой
        inputElement.focus();
    }

    // Функция для очистки ошибок
    clearErrors() {
        // Убираем все классы ошибок
        document.querySelectorAll('.has-error').forEach(el => {
            el.classList.remove('has-error');
        });

        // Удаляем все сообщения об ошибках
        document.querySelectorAll('.error-message').forEach(el => {
            el.remove();
        });
    }

    addProduct(event) {
        if (!this.validateForm()) {
            
            return
        }

        event.preventDefault()

        const form = event.target
        const formData = new FormData(form)

        const data = Object.fromEntries(formData)

        ajax.patch(productUrls.updateProductById(), data, (response) => console.log(response))
    }

    addListenerToSrcInput() {
        // Находим элементы предпросмотра изображения
        const srcInput = document.getElementById('product-src');
        const previewContainer = document.querySelector('.image-preview');
        const previewPlaceholder = document.querySelector('.preview-placeholder');

        srcInput.addEventListener('input', function () {
            const imageUrl = this.value.trim();

            // Если URL не пустой, пробуем загрузить изображение
            if (imageUrl) {
                // Удаляем старое изображение если оно есть
                const oldPreview = previewContainer.querySelector('.preview-image');
                if (oldPreview) {
                    oldPreview.remove();
                }

                // Создаем новое изображение
                const img = document.createElement('img');
                img.className = 'preview-image';
                img.alt = 'Предпросмотр товара';

                // Обработчики загрузки и ошибки
                img.onload = function () {
                    previewPlaceholder.style.display = 'none';
                    previewContainer.appendChild(img);
                };

                img.onerror = function () {
                    previewPlaceholder.textContent = 'Ошибка загрузки изображения. Проверьте URL.';
                    previewPlaceholder.style.display = 'block';
                };

                img.src = imageUrl;
            } else {
                // Если URL пустой, показываем плейсхолдер
                previewPlaceholder.textContent = 'Здесь будет отображаться предпросмотр изображения';
                previewPlaceholder.style.display = 'block';

                // Удаляем изображение если оно есть
                const oldPreview = previewContainer.querySelector('.preview-image');
                if (oldPreview) {
                    oldPreview.remove();
                }
            }
        });
    }

    goToPage(page) {
        page.render()
      }

    addListenerToCancel() {
        const exitBtn = document.getElementById("exit")
        exitBtn.addEventListener("click", () => this.goToPage(new MainPage(document.getElementById('root'), document)))
    }

    render() {
        this.parent.innerHTML = ''

        const html = this.getHtml()
        this.parent.insertAdjacentHTML('beforeend', html)

        const form = document.getElementById("add-product-form")
        form.addEventListener("submit", this.addProduct.bind(this))

        this.addListenerToSrcInput()
        this.addListenerToCancel()
    }
}