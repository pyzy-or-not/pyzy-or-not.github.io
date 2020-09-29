// Edit your script here
window.onload = onPageLoaded;
var textElement = null;
var optionButtonsElement = null;

function onPageLoaded() {
  textElement = document.getElementById("text");
  optionButtonsElement = document.getElementById('option-buttons')
  imageElement = document.getElementById('image')
  startGame();
}
let state = {}

function startGame() {
  state = {}
  showTextNode(0)
}

function restartGame() {
  state = {}
  showTextNode(1)
}

function changeImage(imageIndex) {

  imageElement.src = "img/sr/" + imageIndex + ".jpg "
}

function showTextNode(textNodeIndex) {

  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  changeImage(textNode.idImage)
  if (textNode.setState != null) {
    state = Object.assign(state, textNode.setState)
  }
  console.log(textElement);
  textElement.innerText = textNode.text

  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => Object.assign(state, option.setState) && selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return restartGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}



const textNodes = [{
    id: 0,
    idImage: 0,
    text: 'Порт игры века от Павла ака "Kenny' + "'" + 's Killer.""' + "\n\n" + ' Авторские права не принадлежат никому, орфография и логика игры оригинальны. ' + "\n\n" + 'Посвящается жителям комнаты 109 Т-2',
    options: [{
      text: 'ТАДЕУШ ЛОВИ БОМБУ',
      nextText: 1
    }]
  }, {
    id: 1,
    idImage: 7,
    text: 'Вы вор Владислав. Вы забрались в квартиру своего дяди в шабанах и стоите в прихожей.',
    setState: {
      prihod: true,
      checkWC: false,
      makeBed: 0,
      uwidelDayadu: false,
      goldenKey: false,
      rustyKey: false,
      isCheckedGoldenKey: false,
      isCheckedRustyKey: false
    },
    options: [{
        text: 'Осмотреться',
        nextText: 3
      },
      {
        text: 'Зал',
        nextText: 12
      },
      {
        text: 'Туалет',
        nextText: 4
      }
    ]
  },
  {
    id: 2,
    idImage: 7,
    text: 'Вы все еще вор Владислав и стоите в прихожей своего дяди. В шабанах.',
    options: [{
        text: 'Осмотреться',
        nextText: 3
      },
      {
        text: 'Зал',
        requiredState: (currentState) => currentState.makeBed == 0 || currentState.makeBed == 2,
        nextText: 12
      },
      {
        text: 'Зал',
        requiredState: (currentState) => currentState.makeBed == 1 || currentState.makeBed == 3,
        nextText: 14
      },
      {
        text: 'Туалет',
        requiredState: (currentState) => currentState.checkWC == false,
        nextText: 4
      },
      {
        text: 'Туалет',
        requiredState: (currentState) => currentState.checkWC == true,
        nextText: 9
      }
    ]
  },
  {
    id: 3,
    idImage: 2,
    text: 'Перестань осматриваться, действуй.',
    options: [{
        text: 'Пойти в туалет',
        requiredState: (currentState) => currentState.checkWC == false,
        nextText: 4
      },
      {
        text: 'Пойти в туалет',
        requiredState: (currentState) => currentState.checkWC == true,
        nextText: 9
      },
      {
        text: 'Пойти в зал',
        nextText: 12
      }
    ]
  },
  {
    id: 4,
    idImage: 9,
    text: 'Только вы приблизились к двери, как услышали за ней подозрительный шорох. Возможно это ваш дядя и если он вас увидит, то вам несдобровать.',
    options: [{
        text: 'Рискнуть и зайти в туалет',
        nextText: 18
      },
      {
        text: 'Вернуться в прихожую',
        nextText: 2
      }
    ]
  },
  {
    id: 18,
    idImage: 8,
    setState: {
      goldenKey: true,
      checkWC: true
    },
    text: 'Подозрительным шорохом оказалась течь в проржавевшей трубе. А еще вы нашли золотой ключ. ',
    options: [{
      text: 'Вернуться в прихожую',
      nextText: 2
    }]
  },
  {
    id: 9,
    idImage: 12,
    text: 'В туалете больше нет ничего ценного. Шорох из трубы кажется уже не таким подозрительным. ',
    options: [{
      text: 'Вернуться в прихожую',
      nextText: 2
    }]
  },
  {
    id: 5,
    idImage: 14,
    text: 'Дядя медленно зашел в туалет. Медленно закрыл дверь. Медленно достал дробовик. И быстро распределил ваши внутренности по кафельной плитке.',
    options: [{
      text: 'КОНЕЦ.',
      nextText: -1
    }]
  },
  {
    id: 6,
    idImage: 15,
    text: 'Вы в тупике. Вы гений.',
    options: [{
      text: 'Вспомнить лучшие моменты жизни',
      nextText: 5
    }]
  },
  {
    id: 7,
    idImage: 16,
    text: 'Дядя медленно зашел на кухню. Медленно закрыл дверь. Медленно достал дробовик. И быстро распределил ваши внутренности по дверце холодильника.',
    options: [{
      text: 'КОНЕЦ.',
      nextText: -1
    }]
  },
  {
    id: 8,
    idImage: 3,
    text: 'Вы не взяли во внимание, что дядя живет на 6ом этаже. Вы разбились и умерли.',
    options: [{
      text: 'КОНЕЦ.',
      nextText: -1
    }]
  },
  {
    id: 10,
    idImage: 1,
    text: 'Молодец. Вы застелили дядину постель.',
    setState: {
      makeBed: 3
    },
    options: [{
        text: 'Отойти от постели',
        nextText: 12 //zal tut nado
      },
      {
        text: 'Расстелить обратно',
        nextText: 15 //rasstilka posteli
      }
    ]
  },
  {
    id: 11,
    idImage: 17,
    text: 'Молодец. Вы застелили дядину постель. А на полу нашли ржавый ключ.',
    setState: {
      rustyKey: true,
      makeBed: 1
    },
    options: [{
        text: 'Отойти от постели',
        nextText: 14 //zal tut nado
      },
      {
        text: 'Расстелить обратно',
        nextText: 15 //rasstilka posteli
      }
    ]
  },
  {
    id: 12,
    idImage: 4,
    text: 'Вы тихо зашли в зал. Окна завешаны. Постель не заправлена. Дяди нет.',
    options: [{
        text: 'Пойти на кухню',
        nextText: 21
      },
      {
        text: 'Застелить постель',
        requiredState: (currentState) => currentState.makeBed == 0,
        nextText: 11
      },
      {
        text: 'Застелить постель',
        requiredState: (currentState) => currentState.makeBed == 2,
        nextText: 16
      },
      {
        text: 'Вернуться в прихожую',
        nextText: 2
      }
    ]
  }, {
    id: 13,
    idImage: 10,
    text: 'У вас нет времени на раздумья, надо действовать.',
    options: [{
        text: 'Выпрыгнуть в окно',
        nextText: 8
      },
      {
        text: 'Бегом на кухню',
        nextText: 21
      }
    ]
  }, {
    id: 14,
    idImage: 1,
    text: 'Вы тихо зашли в зал. Окна завешаны. Постель заправлена. Дяди нет.',
    options: [{
      text: 'Пойти на кухню',
      nextText: 21
    }, {
      text: 'Расстелить постель',
      nextText: 15
    }, {
      text: 'Вернуться в прихожую',
      nextText: 2
    }]
  }, {
    id: 15,
    idImage: 4,
    text: 'Вы вернули постель в прежнее состояние. ',
    setState: {
      makeBed: 2
    },
    options: [{
        text: 'Снова застелить постель',
        requiredState: (currentState) => currentState.makeBed == 2,
        nextText: 16 //zastilka posteil fatal
      },
      {
        text: 'Отойти от постели',
        nextText: 12 //zal
      }
    ]
  }, {
    id: 16,
    idImage: 18,
    text: 'Только вы подровнаяли уголки одеяла, как вдруг услышали шум из прихожей. ',
    options: [{
        text: 'Выпрыгнуть в окно',
        nextText: 8
      },
      {
        text: 'Бегом в прихожую',
        nextText: 20 //prowerka1
      }
    ]
  }, {
    id: 17,
    idImage: 19,
    text: 'Теперь он вас точно заметил. Браво!',
    options: [{
        text: 'Убежать в зал',
        nextText: 13 //zal
      },
      {
        text: 'Убежать в туалет',
        nextText: 5 //tupikowyi_tualet
      },
      {
        text: 'Бросить в дядю ржавым ключом и убежать в тулет',
        requiredState: (currentState) => currentState.rustyKey == true && !currentState.isCheckedRustyKey,
        nextText: 5 //tupikowyi_tualet
      },
      {
        text: 'Бросить в дядю золотым ключом и убежать в тулет ',
        requiredState: (currentState) => currentState.goldenKey == true && !currentState.isCheckedGoldenKey,
        nextText: 5 //tupikowyi_tualet
      }
    ]
  }, {
    id: 19,
    idImage: 1,
    text: 'Зал(дядей замечен)',
    options: [{
        text: 'Выпрыгнуть в окно',
        nextText: 8
      },
      {
        text: 'Пойти на кухню',
        nextText: 21
      }
    ]

  }, {
    id: 20,
    idImage: 5,
    text: 'Оказавшись в прихожей вы увидели только что вернувшегося дядю.' + "\n" + ' Кажется он вас видит...',
    setState: {
      uwidelDayadu: true
    },
    options: [{
        text: 'Убежать в зал',
        nextText: 13 //zal
      },
      {
        text: 'Убежать в туалет',
        nextText: 5 //tupikowyi_tualet
      },
      {
        text: 'Бросить в дядю ржавым ключом',
        requiredState: (currentState) => currentState.rustyKey == true,
        setState: {
          rustyKey: false
        },
        nextText: 17 //tupikowyi_tualet
      },
      {
        text: 'Бросить в дядю золотым ключом ',
        requiredState: (currentState) => currentState.goldenKey == true,
        setState: {
          goldenKey: false
        },
        nextText: 17 //tupikowyi_tualet
      }
    ]
  }, {
    id: 21, //KUCHNIA
    idImage: 20,
    text: 'Перед вами холодильник с замком.',
    options: [{
        text: 'Попробовать открыть золотым ключом',
        requiredState: (currentState) => currentState.goldenKey == true && currentState.uwidelDayadu == false,
        setState: {
          isCheckedGoldenKey: true
        },
        nextText: 22
      },
      {
        text: 'Попробовать открыть ржавым  ключом',
        requiredState: (currentState) => currentState.rustyKey == true,
        setState: {
          isCheckedRustyKey: true
        },
        nextText: 24
      }, {
        text: 'Попробовать открыть',
        requiredState: (currentState) => currentState.goldenKey == false && currentState.rustyKey == false && !currentState.uwidelDayadu,
        nextText: 22
      }, {
        text: 'Вернуться в зал',
        requiredState: (currentState) => currentState.uwidelDayadu == false && (currentState.makeBed == 0 || currentState.makeBed == 2),
        nextText: 12
      },
      {
        text: 'Вернуться в зал',
        requiredState: (currentState) => currentState.uwidelDayadu == false && (currentState.makeBed == 1 || currentState.makeBed == 3),
        nextText: 14
      }, {
        text: 'Попробовать открыть золотым ключом',
        requiredState: (currentState) => currentState.goldenKey == true && currentState.uwidelDayadu == true,
        setState: {
          isCheckedGoldenKey: true
        },
        nextText: 23
      }, {
        text: 'Попробовать открыть',
        requiredState: (currentState) => currentState.goldenKey == false && currentState.rustyKey == false && currentState.uwidelDayadu,
        nextText: 23
      },
    ]
  }, {
    id: 22,
    idImage: 21,
    text: ' Заперто.',
    options: [{
      text: 'Отойти от холодильника',
      nextText: 21
    }]
  }, {
    id: 23,
    idImage: 13,
    text: 'Заперто. Времени больше не осталось. Вы в тупике. ',
    options: [{
      text: 'Вспомнить лучшие моменты жизни',
      nextText: 7
    }]
  }, {
    id: 24,
    idImage: 11,
    text: ' Пызы.'
  }, {
    id: 25,
    idImage: 1,
    text: 'Молодец. Вы застелили дядину постель.',
    setState: {
      makeBed: 3
    },
    options: [{
        text: 'Отойти от постели',
        nextText: 14 //zal tut nado
      },
      {
        text: 'Расстелить обратно',
        nextText: 15 //rasstilka posteli
      }
    ]
  } //25 next
]
