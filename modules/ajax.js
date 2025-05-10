class Ajax {
    /**
     * GET запрос
     * @param {string} url - Адрес запроса
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    async get(url, callback) {
        try {
            const result = await fetch(url, {
                method: "GET"
            })
                .then(r => r.json())
                .then(r => callback(r))

            return result
        } catch (err) {
            console.error("не удалось выполнить get - запрос:", err)
        }
    }

    /**
     * POST запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для отправки
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    async post(url, data, callback) {
        try {
            const result = await fetch(url, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(r => r.json())
                .then(r => callback(r))
            return result
        } catch (err) {
            console.error(`не удалось выполнить post - запрос ${url}: ${err}`)
        }
    }

    /**
     * PATCH запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для обновления
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    async patch(url, data, callback) {
        try {
            const result = await fetch(url, {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(r => r.json())
                .then(r => callback(r))

            return result
        } catch (err) {
            console.error(`не удалось выполнить patch - запрос ${url}: ${err}`)
        }
    }

    /**
     * DELETE запрос
     * @param {string} url - Адрес запроса
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    async delete(url, callback) {
        try {
            const result = await fetch(url, {
                method: "DELETE",
            })
                .then(r => r.json())
                .then(r => callback(r))

            return result
        } catch (err) {
            console.error(`не удалось выполнить patch - запрос ${url}: ${err}`)
        }
    }

    /**
     * Обработчик ответа (приватный метод)
     * @param {XMLHttpRequest} xhr - Объект запроса
     * @param {function} callback - Функция обратного вызова
     */
    _handleResponse(xhr, callback) {
        // Успешный HTTP-статус (200-299)
        const isSuccess = xhr.status >= 200 && xhr.status < 300;

        if (isSuccess) {
            try {
                // Проверяем, что текст ответа не пустой
                if (xhr.responseText) {
                    const data = JSON.parse(xhr.responseText);
                    callback(data, xhr.status);
                } else {
                    console.warn('Пустой ответ от сервера');
                    callback(null, xhr.status, 'Пустой ответ');
                }
            } catch (e) {
                console.error('Ошибка парсинга JSON:', e);
                // Выводим текст ответа для анализа
                console.error('Ответ от сервера:', xhr.responseText);
                callback(null, xhr.status, 'Ошибка парсинга JSON');
            }
        } else {
            console.error(`HTTP-ошибка ${xhr.status}: ${xhr.statusText}`);
            callback(null, xhr.status, xhr.statusText);
        }
    }
}

export const ajax = new Ajax();