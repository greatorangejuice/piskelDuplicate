#Instruments
*Paint Bucket
*Choose Color
*Move
*Transform

*Current color
*Prev color
*red
*blue



3. Метод Move:
    реализация через drag-n-drop
4. Менять цвета через style.background.color
5. Добавить кнопки на панели
Choose color на вторую палетку вешает слушатели


Два варианта: жмем choose color - навешиваем обработчик на вторую палетку, выбираем цвет, закидываем его в current.
Второй вариант - тыкаемся во второй палетке, ставим цвета. Потом жмем на choose, тянется цвет из current и записывается предыдущий цвет в Previous.