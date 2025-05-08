export function concatenate(arr, separator) {
    return arr.join(separator);
}
export function moveElement(arr, from, to) {
    // Проверка на валидность индексов
    if (from < 0 || from >= arr.length || to < 0 || to >= arr.length) {
        console.error("Некорректные индексы from или to");
        return arr; // Возвращаем исходный массив, если индексы неверны
    }

    // Удаляем элемент из позиции `from` и сохраняем его
    const element = arr.splice(from, 1)[0];
    
    // Вставляем элемент в позицию `to`
    arr.splice(to, 0, element);
    
    return arr;
}

export function countPrefixes(words, str) {
    let count = 0;
    for (const word of words) {
        if (str.startsWith(word)) {
            count++;
        }
    }
    return count;
}

export function isPalindrome(value) {
    // Приводим значение к строке, удаляем пробелы и приводим к нижнему регистру
    const str = String(value).toLowerCase().replace(/\s+/g, '');
    // Сравниваем строку с её перевёрнутой версией
    return str === str.split('').reverse().join('');
  }