/**
 * @constant
 * @type {number}
 * @default
 */
const COL_MIN_WIDTH = 50

/**
 * @constant
 * @type {number}
 * @default
 */
const COL_DEFAULT_WIDTH = 100

/**
 * @constant
 * @type {number}
 * @default
 */
const COL_DIVIDER_WIDTH = 20

/**
 * @constant
 * @type {string}
 * @default
 */
const COL_DIVIDER_BORDER = 'thin solid rgba(0, 0, 0, 0.12)'

/**
 * @constant
 * @type {string}
 * @default
 */
const COL_DIVIDER_CLASS_NAME = 'col-divider'

/**
 * @constant
 * @type {string}
 * @default
 */
const COL_FIXED_CLASS_NAME = 'fixed'

/**
 * @constant
 * @type {string}
 * @default
 */
const COL_STICKY_CLASS_NAME = 'sticky'

/**
 * @constant
 * @type {boolean}
 * @default
 */
const IS_FIRST_COL_STICKY = false

/**
 * @constant
 * @type {boolean}
 * @default
 */
const IS_LAST_COL_STICKY = false

/**
 * @constant
 * @type {string}
 * @default
 */
const STICKY_COL_BACKGROUND_COLOR = '#fff'

/**
 * @constant
 * @type {string}
 * @default
 */
const HIDE_BUTTON_BACKGROUND_COLOR = '#fff'

let isLastColHidden = false

/**
 * Настройки столбцов.
 * @typedef {Object} ResizableColumnsOptions
 * @property {number} colMinWidth - Минимальная ширина, устанавливается всем столбцам.
 * @property {number} colDefaultWidth - Ширина по умолчанию, устанавливается столбцам без заданной ширины.
 * @property {number} colDividerWidth - Ширина разделителя столбцов.
 * @property {string} colDividerBorder - Стиль рамки разделителя столбцов.
 * @property {string} colDividerClassName - Название класса разделителя столбцов.
 * @property {string} colFixedClassName - Название класса столбца с фиксированной шириной.
 * @property {string} colStickyClassName - Название класса закрепленного столбца.
 * @property {boolean} isFirstColSticky - Закреплен ли первый столбец.
 * @property {boolean} isLastColSticky - Закреплен ли последний столбец.
 * @property {string} stickyColBackgroundColor - Цвет фона закрепленного столбца.
 * @property {string} hideButtonBackgroundColor - Цвет фона кнопки сокрытия/отображения столбцов.
 */
export type ResizableColumnsOptions = {
  colMinWidth?: number
  colDefaultWidth?: number
  colDividerWidth?: number
  colDividerBorder?: string
  colDividerClassName?: string
  colFixedClassName?: string
  colStickyClassName?: string
  isFirstColSticky?: boolean
  isLastColSticky?: boolean
  stickyColBackgroundColor?: string
  hideButtonBackgroundColor?: string
}

/**
 * Сделать у всех таблиц столбцы с изменяемой шириной.
 * @param {ResizableColumnsOptions} [options] - Настройки столбцов.
 */
export default function makeColumnsResizable (options?: ResizableColumnsOptions): void {
  const tables: HTMLCollectionOf<HTMLTableElement> = document.getElementsByTagName('table')
  for (const table of tables) {
    makeTableColumnsResizable(table, options)
  }
}

interface IParams {
  colMinWidth: number
  colDefaultWidth: number
  colDividerWidth: number
  colDividerBorder: string
  colDividerClassName: string
  colFixedClassName: string
  colStickyClassName: string
  stickyColBackgroundColor: string
  hideButtonBackgroundColor: string
  isFirstColSticky: boolean
  isLastColSticky: boolean
}

function getNumberParams(params: IParams, options?: ResizableColumnsOptions) {
  params.colMinWidth = (options && options.colMinWidth) || COL_MIN_WIDTH
  params.colDefaultWidth = (options && options.colDefaultWidth) || COL_DEFAULT_WIDTH
  params.colDividerWidth = (options && options.colDividerWidth) || COL_DIVIDER_WIDTH
}

function getStringParams(params: IParams, options?: ResizableColumnsOptions) {
  params.colDividerBorder = (options && options.colDividerBorder) || COL_DIVIDER_BORDER
  params.colDividerClassName = (options && options.colDividerClassName) || COL_DIVIDER_CLASS_NAME
  params.colFixedClassName = (options && options.colFixedClassName) || COL_FIXED_CLASS_NAME
  params.colStickyClassName = (options && options.colStickyClassName) || COL_STICKY_CLASS_NAME
  params.stickyColBackgroundColor = (options && options.stickyColBackgroundColor) || STICKY_COL_BACKGROUND_COLOR
  params.hideButtonBackgroundColor = (options && options.hideButtonBackgroundColor) || HIDE_BUTTON_BACKGROUND_COLOR
}

function getBooleanParams(params: IParams, options?: ResizableColumnsOptions) {
  params.isFirstColSticky = (options && options.isFirstColSticky) || IS_FIRST_COL_STICKY
  params.isLastColSticky = (options && options.isLastColSticky) || IS_LAST_COL_STICKY
}

function fixedColumns (params: IParams, table: HTMLTableElement) {
  if (params.isFirstColSticky || params.isLastColSticky) {
    const lastColCells: HTMLTableCellElement[] = []
    const rows: HTMLCollectionOf<HTMLTableRowElement> = table.rows
    fixedColumnsRowsLoop(params, rows, lastColCells)

    // Добавить кнопку сокрытия/отображения к последнему столбцу.
    if (params.isLastColSticky) {
      const lastColHeaderCell: HTMLTableCellElement = rows[0].lastChild as HTMLTableCellElement
      for (const oldHideButton of lastColHeaderCell.getElementsByClassName('hide-button')) {
        oldHideButton.remove()
      }
      const hideButton: HTMLDivElement = createHideButton(params, lastColCells)
      lastColHeaderCell.appendChild(hideButton)
      // hideButton.click() - чтобы сразу скрыть столбец
    }
  }
}

function fixedColumnsRowsLoop (params: IParams, rows: HTMLCollectionOf<HTMLTableRowElement>, lastColCells: HTMLTableCellElement[]) {
  for (const row of rows) {
    for (let i = 0; i < row.cells.length; i++) {
      fixedColumnsSetCells(params, lastColCells, i, row)
    }
  }
}

function fixedColumnsSetCells (params: IParams, lastColCells: HTMLTableCellElement[], i: number, row: any) {
  if (params.isFirstColSticky && i === 0 || params.isLastColSticky && i === row.cells.length - 1) {
    const cell: HTMLTableCellElement = row.cells[i]
    cell.style.position = 'sticky'
    cell.classList.add('sticky')
    cell.style.backgroundColor = params.stickyColBackgroundColor
    // cell.style.zIndex = '10'
    if (params.isFirstColSticky && i === 0) {
      cell.style.left = '0' // Крайний левый столбец пока не поддерживается в полной мере (но закрепляется)
      cell.style.borderRight = params.colDividerBorder
      cell.style.backgroundColor = params.stickyColBackgroundColor
    } else if (params.isLastColSticky && i === row.cells.length - 1) {
      cell.style.right = '0'
      cell.style.borderLeft = params.colDividerBorder
      cell.style.backgroundColor = params.stickyColBackgroundColor
      lastColCells.push(cell)
    }
  }
}

function checkingPinnedColumnsByClassName (params: IParams, i: number, cell: HTMLTableCellElement, headerCells: HTMLCollectionOf<HTMLTableCellElement>) {
  if (cell.classList.contains(params.colStickyClassName)) {
    if (i === 0) {
      params.isFirstColSticky = true
    } else if (i === headerCells.length - 1) {
      params.isLastColSticky = true
    }
  }
}

/**
 * Создать кнопку для сокрытия/отображения первого или последнего столбца.
 * @param {HTMLTableCellElement[]} cells - Ячейки столбца.
 * @returns {HTMLDivElement} - Кнопка сокрытия/отображения столбца.
 */
function createHideButton (params: IParams, cells: HTMLTableCellElement[]): HTMLDivElement {
  const div: HTMLDivElement = document.createElement('div')
  div.className = 'hide-button'
  div.style.width = '25px'
  div.style.height = '100%'
  div.style.top = '0'
  div.style.right = '0'
  div.style.position = 'absolute'
  div.style.cursor = 'pointer'
  div.style.userSelect = 'none'
  div.style.display = 'flex'
  div.style.alignItems = 'center'

  const icon: HTMLElement = document.createElement('i')
  icon.className = 'v-icon material-icons theme--light'
  icon.style.backgroundColor = params.hideButtonBackgroundColor
  icon.style.borderTop = params.colDividerBorder
  icon.style.borderLeft = params.colDividerBorder
  icon.style.borderBottom = params.colDividerBorder
  icon.style.borderRadius = '5px 0 0 5px'
  icon.innerText = 'keyboard_arrow_right'
  icon.title = 'Скрыть столбец'
  const initialIconInnerText = icon.innerText
  const initialIconTitle = icon.title

  const cell: HTMLTableCellElement = cells[0]
  const initialCellWidth: string = cell.offsetWidth + 'px'
  const initialCellBackgroundColor: string = '' + cell.style.backgroundColor
  const initialCellBorderLeft: string = '' + cell.style.borderLeft

  function displayLastCol (): void {
    icon.innerText = isLastColHidden ? 'keyboard_arrow_left' : initialIconInnerText
    icon.title = isLastColHidden ? 'Показать столбец' : initialIconTitle
    displayLastColSetStyles()
  }

  function displayLastColSetStyles (): void {
    for (let i = 0; i < cells.length; i++) {
      const cell: HTMLTableCellElement = cells[i]
      cell.style.width = isLastColHidden ? '25px' : initialCellWidth
      cell.style.backgroundColor = isLastColHidden ? 'transparent' : initialCellBackgroundColor
      cell.style.borderLeft = isLastColHidden ? 'none' : initialCellBorderLeft
      if (i === 0) {
        continue
      }
      const children = cell.children as HTMLCollectionOf<HTMLElement>
      for (let i = 0; i < children.length; i++) {
        const child: HTMLElement = children[i]
        child.style.display = isLastColHidden ? 'none' : ''
      }
    }
  }
  displayLastCol()

  div.onclick = function () {
    isLastColHidden = !isLastColHidden
    displayLastCol()
  }
  div.appendChild(icon)

  return div
}

function checkLoading(progressRow: HTMLCollectionOf<Element>, emptyWrapperRow: HTMLCollectionOf<Element>) {
  if (progressRow.length || emptyWrapperRow.length) {
    return true
  }
  else {
    return false
  }
}

/**
 * Сделать у таблицы столбцы с изменяемой шириной.
 * Чтобы оставить столбец фиксированным, нужно добавить ему класс, указанный в настройках.
 * @param {HTMLTableElement} table - Ссылка на таблицу, полученная через getElementById, например.
 * @param {ResizableColumnsOptions} [options] - Настройки столбцов.
 */
export function makeTableColumnsResizable (
  table: HTMLTableElement,
  options?: ResizableColumnsOptions
): void {
  if (!table.rows.length) {
    return
  }

  const params: IParams = {
    colMinWidth: 0,
    colDefaultWidth: 0,
    colDividerWidth: 0,
    colDividerBorder: '',
    colDividerClassName: '',
    colFixedClassName: '',
    colStickyClassName: '',
    stickyColBackgroundColor: '',
    hideButtonBackgroundColor: '',
    isFirstColSticky: false,
    isLastColSticky: false
  }
  getNumberParams(params, options)
  getStringParams(params, options)
  getBooleanParams(params, options)

  const headerRow: HTMLTableRowElement = table.rows[0]
  const headerCells: HTMLCollectionOf<HTMLTableCellElement> = headerRow.cells
  const colDividers: HTMLDivElement[] = []

  for (let i = 0; i < headerCells.length; i++) {
    const cell: HTMLTableCellElement = headerCells[i]
    if (!cell.style.width) {
      cell.style.width = params.colDefaultWidth + 'px'
    } else if (parseInt(cell.style.width) < params.colMinWidth) {
      cell.style.width = params.colMinWidth + 'px'
    }
  }

  // Не изменять таблицу, пока данные не загрузятся.
  const progressRow: HTMLCollectionOf<Element> = table.getElementsByClassName('v-data-table__progress')
  const emptyWrapperRow: HTMLCollectionOf<Element> = table.getElementsByClassName('v-data-table__empty-wrapper')
  if (checkLoading(progressRow, emptyWrapperRow)) {
    return
  }

  table.style.tableLayout = 'fixed'
  table.style.width = '100%'
  table.style.height = '100%'

  const tableWrapper: HTMLElement | null = table.parentElement
  const tableWrapperWidth: number = (tableWrapper && tableWrapper.offsetWidth) || table.offsetWidth

  for (let i = 0; i < headerCells.length; i++) {
    const cell: HTMLTableCellElement = headerCells[i]
    cell.style.width = cell.style.minWidth
    cell.style.overflow = 'hidden'
    cell.style.whiteSpace = 'nowrap'
    // cell.style.textOverflow = 'ellipsis' // - Многоточие в ячейках шапки
    cell.title = cell.innerText
      .replace('arrow_upward', '') // arrow_upward - стрелка сортировки
      .trim()
    // 2 строки ниже необходимы для корректной работы фиксированной шапки таблицы.
    cell.style.position = 'sticky'
    cell.style.top = '0'

    if (i < headerCells.length - 1 && // На последнем столбце разделитель не нужен
      !cell.classList.contains(params.colFixedClassName) && // Не добавлять разделитель в фиксированный столбец
      !cell.getElementsByClassName(params.colDividerClassName).length // Чтобы исключить дубли
    ) {
      const colDivider: HTMLDivElement = createColDivider()
      colDividers.push(colDivider)
      cell.appendChild(colDivider)
      //cell.style.width = cell.offsetWidth + 'px'
      setListeners(colDivider, params, table, tableWrapperWidth, colDividers)
    }
    // Проверка закрепленных столбцов по названию класса.
    checkingPinnedColumnsByClassName(params, i, cell, headerCells)
  }

  /**
   * Закрепленные столбцы.
   */
  fixedColumns(params, table)


  /**
   * Этот блок нужен для того, чтобы у таблицы с фиксированной высотой строки не растягивались по высоте
   * в случае, когда они не заполняют все тело таблицы (отсутствует вертикальный скролл). Поэтому в конец
   * тела таблицы вставляется пустая строка с высотой 100%.
   */
  const tBodies: HTMLCollectionOf<HTMLTableSectionElement> = table.tBodies
  if (tBodies.length) {
    const tBody: HTMLTableSectionElement = tBodies[0]
    const maxHeightRows = tBody.getElementsByClassName('max-height-row')
    for (const maxHeightRow of maxHeightRows) {
      tBody.removeChild(maxHeightRow)
    }
    const maxHeightRow: HTMLTableRowElement = tBody.insertRow(-1)
    maxHeightRow.className = 'max-height-row'
    maxHeightRow.style.height = '100%'
  }

  /**
   * Создать разделитель столбцов.
   * @returns {HTMLDivElement} - Разделдитель столбцов.
   */
  function createColDivider (): HTMLDivElement {
    const div: HTMLDivElement = document.createElement('div')
    div.className = params.colDividerClassName
    div.style.width = params.colDividerWidth + 'px'
    div.style.height = '100%'
    div.style.top = '0'
    div.style.right = '0'
    div.style.position = 'absolute'
    div.style.cursor = 'col-resize'
    div.style.userSelect = 'none'
    return div
  }
}

let isMoveActive = false

/**
 * Подключить обработчики событий.
 * @param {HTMLDivElement} colDivider - Разделитель столбцов.
 */
function setListeners (colDivider: HTMLDivElement, params: IParams, table: HTMLTableElement, tableWrapperWidth: number, colDividers: HTMLDivElement[]): void {
  let currentPageX = 0
  let currentCol: HTMLElement | null = null
  let nextCol: HTMLElement | null = null
  let currentColWidth = 0
  let nextColWidth = 0

  colDivider.addEventListener('mouseover', function () {
    if (!isMoveActive) {
      this.style.borderRight = params.colDividerBorder
    }
  })

  colDivider.addEventListener('mouseout', function () {
    if (!isMoveActive) {
      this.style.borderRight = ''
    }
  })

  colDivider.addEventListener('click', function (event: MouseEvent) {
    event.stopPropagation() // Чтобы клик по разделителю не вызывал сортировку родительского столбца
  })

  colDivider.addEventListener('mousedown', function (event: MouseEvent) {
    isMoveActive = true
    currentPageX = event.pageX
    currentCol = (<HTMLElement>event.target).parentElement
    nextCol = currentCol && currentCol.nextElementSibling as HTMLElement
    currentColWidth = currentCol ? currentCol.offsetWidth : 0
    nextColWidth = nextCol ? nextCol.offsetWidth : 0
    table.style.cursor = 'col-resize'
    // Увеличивается до 100% ширина текущего и следующего разделителей для того,
    // чтобы предотвратить случайное срабатывание сортировки по столбцу.
    for (const colDivider of colDividers) {
      colDivider.style.width = '100%'
    }
  })

  table.addEventListener('mousemove', function (event: MouseEvent) {
    // Не изменять ширину столбца, если он фиксированный.
    if (currentCol && !currentCol.classList.contains(params.colFixedClassName)) {
      isMoveActive = true
      const diffX: number = event.pageX - currentPageX
      const currentColNewWidth: number = currentColWidth + diffX
      if (diffX && currentColNewWidth > params.colMinWidth) {
        currentCol.style.width = currentColNewWidth + 'px'
        /**
         * Не изменять ширину следующего столбца, если ширина таблицы выходит за границы, либо если столбец фиксированный.
         * Проверка на отрицательную разницу здесь для того, чтобы не уменьшалась ширина следующего столбца.
         */
        if (tableWrapperWidth >= table.offsetWidth &&
          nextCol &&
          !nextCol.classList.contains(params.colFixedClassName) &&
          diffX < 0
        ) {
          const nextColNewWidth: number = nextColWidth - diffX
          if (nextColNewWidth > params.colMinWidth) {
            nextCol.style.width = (nextColWidth - diffX) + 'px'
          }
        }
      }
    }
  })

  table.addEventListener('mouseup', function () {
    isMoveActive = false
    this.style.cursor = 'auto'
    if (currentCol) {
      for (const child of currentCol.children as HTMLCollectionOf<HTMLElement>) {
        if (child.className === params.colDividerClassName) {
          child.style.borderRight = ''
        }
      }
    }
    currentPageX = 0
    currentCol = null
    nextCol = null
    nextColWidth = 0
    currentColWidth = 0
    // Вернуть разделителям столбцов ширину по умолчанию, чтобы возобновить возможность сортировки.
    for (const colDivider of colDividers) {
      colDivider.style.width = params.colDividerWidth + 'px'
    }
  })
}

/**
 * Добавить к столбцам с указанными индексами класс, с помощью которого определяется, что эти столбцы фиксированные.
 * @param {HTMLTableElement} table - Ссылка на таблицу, полученная через getElementById, например.
 * @param {number[]} [indexes=[0]] - Индексы столбцов, которым нужно добавить класс.
 * @param {string} [colFixedClassName=COL_FIXED_CLASS_NAME] - Название класса столбца с фиксированной шириной.
 */
export function addFixedClass (
  table: HTMLTableElement,
  indexes: number[] = [0],
  colFixedClassName: string = COL_FIXED_CLASS_NAME
): void {
  if (!table.rows.length) {
    return
  }
  const headerRow: HTMLTableRowElement = table.rows[0]
  const headerCells: HTMLCollectionOf<HTMLTableCellElement> = headerRow.cells
  for (const index of indexes) {
    if (headerCells[index]) {
      headerCells[index].className = colFixedClassName
    }
  }
}
