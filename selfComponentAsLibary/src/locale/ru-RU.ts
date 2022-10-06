const fieldShouldNotBeEmpty = 'Поле не должно быть пустым'
const creationDate = 'Дата создания'
const modifyDate = 'Дата изменения'

/* eslint-disable */
export const russian = {
  title: 'Русский',
  display: 'RUS',
  code: 'ru-RU',
  app: {
    journal: {
      organization: {
        label: 'Реквизиты организации',
        name: 'Наименование организации',
        inn: 'ИНН',
        kpp: 'КПП',
        rf: 'РФ'
      },
      client: {
        label: 'Реквизиты Клиента',
        name: 'Наименование клиента',
        inn: 'ИНН',
        kpp: 'КПП'
      },
      relation: {
        label: 'Связи',
        deal: 'Сделка',
        claim: 'Заявка',
        transh: 'Транш'
      }
    },
    messages: {
      uploadfile: 'Загружаем файл...',
      fileUploaded: 'Файл "{name}" успешно загружен',
      notUploadedFiles: 'Файлы с такими именами уже существуют.<br>Вы можете, изменив название, заменить на новую версию или добавить их как новые.',
      draganddrop: 'Перетащите файлы сюда или <a href="#">выберите файл</a>',
      draganddropBPMN: 'Перетащите файл сюда или <a href="#">выберите файл</a> (.bpmn)',
      fileNameExists: 'Файл уже существует',
      switchCurentFileName: 'Использовать название текущей версии',
      pleaseWait: 'Подождите пожалуйста...',
      nodatatext: 'Нет данных для отображения...',
      loadingtext: 'Идёт загрузка...',
      notasks: 'Нет задач...',
      toDeleteItem: 'Вы уверены, что хотите удалить элемент?',
      setSearchText: 'Начните вписывать текст для быстрого поиска...',
      itemUpdated: 'Элемент обновлен',
      itemAdded: 'Элемент добавлен',
      documentSended: 'Документ отправлен',
      requestSended: 'Запрос отправлен',
      addedNewVresion: 'Добавлена новая версия для "{name}"',
      reportRuning: 'Отчет "{name}" запущен.<br>По готовности Вы получите уведомление!',
      userAdded: 'Пользователь добавлен',
      userDeleted: 'Пользователь удален',
      createCardRuning: 'Учетная карточка создается.<br>По завершению Вы получите уведомление',
      subscribe: 'Подпись',
      notnull: 'Не выбран Оператор',
      fileUrlCopiedToClipboard: 'URL файла скопирован в буфер обмена',
      urlCopiedToClipboard: 'URL скопирован в буфер обмена',
      documentCannotBeDisplayed: 'Документ не может быть отображен',
      documentCannotBeDisplayedWithName: 'не может быть отображен',
      selectDocumentToView: 'Выберите файл для просмотра...',
      selectDocumentVersionToView: 'Версия файла',
      saved: 'Сохранено',
      objectDeleted: 'Объект удален',
      dictCancelUploadConfirmation: 'Вы уверены, что хотите отменить загрузку?',
      dictFileTooBig: 'Файл слишком большой ({{filesize}} МБ). Максимальный размер: {{maxFilesize}} МБ.',
      dictResponseError: 'Сервер вернул ошибку с кодом {{statusCode}}.',
      dictFileSizeUnits: {
        'tb': 'ТБ',
        'gb': 'ГБ',
        'mb': 'МБ',
        'kb': 'КБ',
        'b': 'Б'
      },
      graphMaxNodes: 'Используйте фильтры для уточнения запроса отображения структуры объектов'
    },
    notifications: {
      types: {
        bpm_approve: 'Новая задача: "Согласование"',
        bpm_revision: 'Новая задача: "Доработка"',
        bpm_signing: 'Новая задача: "Подписание"',
        bpm_execution: 'Новая задача: "Исполнение"',
        bpm_execution_ups: 'Новая задача: "Заявка УПС на исполнении"',
        bpm_check_ostd: 'Новая задача: "Проверка менеджером ОСТД',
        bpm_conclusion: 'Новая задача: "Заключение менеджера ОСТД',
        object: 'Документ обновлен',
        bpm_control: 'Задача входного контроля',
        report_file_fail: 'Ошибка при создании отчета',
        report_file_ready: 'Отчет успешно создан'
      }
    },
    buttons: {
      add: 'Добавить',
      save: 'Сохранить',
      close: 'Закрыть',
      cancel: 'Отмена',
      reset: 'Сбросить',
      select: 'Выбрать',
      update: 'Обновить',
      no: 'Нет',
      yes: 'Да',
      open: 'Открыть',
      login: 'Войти',
      properties: 'Свойства',
      preview: 'Предпросмотр',
      download: 'Скачать',
      remove: 'Удалить',
      search: 'Поиск',
      searchEbat: 'Искать',
      saveSearch: 'Сохранить поиск',
      send: 'Отправить',
      taskComplete: 'Завершить',
      taskReject: 'Отклонить',
      taskAssignToMe: 'Взять на себя',
      taskUnassign: 'Вернуть',
      levelUp: 'На уровень выше',
      generate: 'Генерировать',
      next: 'Далее',
      addVersion: 'Заменить',
      viewAll: 'Посмотреть все',
      acl: 'Права доступа',
      run: 'Запустить',
      createCard: 'Сформировать УК',
      requestAccess: 'Запросить доступ',
      getAll: 'Выгрузить содержимое',
      subscribe: 'Подписать',
      signVeried: 'Подпись верифицирована',
      signNotVeried: 'Подпись не верифицирована',
      invite: 'Пригласить',
      block: 'Заблокировать',
      sync: 'Синхронизировать',
      updateStatus: 'Обновить статусы',
      operator: 'Оператор',
      recipient: 'Получатель',
      versions: 'Версии',
      more: 'Ещё',
      attach: 'Прикрепить',
      print: 'Распечатать',
      zoom_in: 'Увеличить',
      zoom_out: 'Уменьшить',
      rotate_right: 'Повернуть вправо',
      rotate_left: 'Повернуть влево',
      link: 'Копировать URL на карточку',
      previewLink: 'Копировать URL просмотр',
      downloadLink: 'Копировать URL для скачивания',
      openPreviewPane: 'Показать предпросмотр',
      closePreviewPane: 'Скрыть предпросмотр',
      openFullscreen: 'Открыть во весь экран',
      closeFullscreen: 'Выйти из полноэкранного режима',
      export: 'Экспорт',
      dontSetTime: 'Не указывать время',
      back: 'Назад',
      edit: 'Редактировать',
      addFilter: 'Добавить значение',
      openGraph: 'Показать граф',
      closeGraph: 'Скрыть граф'
    },
    filters: {
      EQUALS: 'Равно',
      NOT_EQUALS: 'Не равно',
      LIKE: 'Подобно',
      START_WITH: 'Начинается на',
      END_WITH: 'Заканчивается на'
    },
    dialogs: {
      titles: {
        selectItem: 'Выберите элемент',
        selectType: 'Выберите тип',
        editing: 'Редактирование',
        newEl: 'Новый элемент',
        preview: 'Просмотр',
        docPreview: 'Карточка документа',
        myNotifications: 'Мои уведомления',
        uploadFiles: 'Загрузка файлов',
        newComment: 'Новый комментарий',
        certificates: 'Список сертификатов',
        addDocDict: 'Добавить документ',
        addRelation: 'Добавить связь',
        closeTabWithUnsavedData: 'У Вас есть несохранённые данные, Вы действительно хотите закрыть вкладку?',
        saveSearch: 'Сохранение поискового запроса',
        selectSubdivision: 'Выберите подразделение',
        selectRelationType: 'Выберите вид связи',
        selectObject: 'Выберите объект'
      }
    },
    tabs: {
      details: 'Реквизиты',
      files: 'Файлы',
      properties: 'Свойства',
      audit: 'История',
      approving: 'Согласование',
      claims: 'Заявки',
      attributes: 'Атрибуты',
      versions: 'Версии',
      userData: 'Личные данные',
      users: 'Пользователи',
      userGroups: 'Группы',
      substitution: 'Заместители',
      substituted: 'Замещаемые',
      settings: 'Настройки',
      comments: 'Комментарии',
      uzedo: 'Файлы ЭДО',
      systems: 'ID внешних систем',
      relation: 'Связи',
      accessGroup: 'Группы доступа',
      requiredattrs: 'Обязательные атрибуты'
    },
    toolbar: {
      titles: {
        approvingList: 'Лист согласования'
      },
      menu: {
        settings: 'Настройки',
        logout: 'Выйти',
        admin: 'Администратор',
        ptofile: 'Профиль'
      }
    },
    drawer: {
      links: {
        settings: 'Настройки',
        userslist: 'Пользователи',
        groupslist: 'Группы',
        rolelist: 'Системные роли'
      }
    },
    tables: {
      files: {
        number: '№',
        name: 'Наименование файла',
        type: 'Тип',
        size: 'Размер',
        date: 'Дата версии',
        datetime: 'Дата и время версии',
        user: 'Пользователь',
        version: 'Версия'
      }
    },
    versions: {
      version: 'Версия',
      actual: 'актуальная',
      actualVersion: 'Актуальная версия'
    }
  },
  ModelsTypes: {
    DocBase: {
      title: 'Документ',
      attrs: {
        objectName: { title: 'Наименование', errorMsg: fieldShouldNotBeEmpty },
        creator: { title: 'Автор' },
        creationDate: { title: creationDate },
        modifier: { title: 'Изменил' },
        modifyDate: { title: modifyDate },
        from: { title: 'с' },
        to: { title: 'по' }
      }
    },
    DocConfiguration: {
      title: 'Документ',
      new: 'Новый документ',
      attrs: {
        objectName: { title: 'Наименование', errorMsg: fieldShouldNotBeEmpty },
        description: { title: 'Описание' },
        docCategory: { title: 'Категория документа' },
        businessProcessCode: { title: 'Код бизнес-процесса' },
        kind: { title: 'Вид документа', errorMsg: fieldShouldNotBeEmpty, },
        rfCode: { title: 'Код РФ' },
        codeRF: { title: 'Код РФ' },
        docNum: { title: 'Номер документа' },
        docDate: { title: 'Дата документа', titleFilter: 'Дата документа' },
        sourceChannel: { title: 'Канал поступления документа' },
        sourceSystemIdentifier: { title: 'Идентификатор объекта во внешней системе' },
        sourceSystem: { title: 'Система-источник' },
        creator: { title: 'Автор' },
        creationDate: { title: 'Дата и время создания', titleFilter: creationDate },
        modifier: { title: 'Изменил' },
        modifyDate: { title: 'Дата и время изменения' },
        objectState: { title: 'Статус объекта' },
        version: { title: 'Версия' },
        hasFile: { title: 'Файл' },
        deleted: { title: 'Удален' },
        application: { title: 'Наименование приложения конфигурации' },
        key: { title: 'Ключ конфигурации' },
        value: { title: 'Значение конфигурации' },
        creation: { title: 'Дата и время создания', titleFilter: creationDate },
        modify: { title: 'Изменил', titleFilter: modifyDate }
      }
    },
  },
  config: {
    appName: 'Наименование приложения конфигурации',
    profile: 'Профиль конфигурации',
    label: 'Метка конфигурации',
    key: 'Ключ конфигурации',
    value: 'Значение конфигурации',
    description: 'Описание конфигурации',
    dateCreate: creationDate,
    dateChange: modifyDate,
    type: 'Тип значения конфигурации'
  },
  CONSTANTS: {
    filters: {
      journal: {
        NEW: 'Создана',
        SEND: 'Отправлена на обработку',
        PREPARE_TASKS: 'Подготовка операций для обработки',
        PROCESS: 'Обрабатывается',
        PENDING: 'Ожидает загрузки',
        READY: 'Обработана успешно',
        ERROR: 'Ошибка обработки',
        CANCEL: 'Обработка отменена',
      }
    }
  }
}
