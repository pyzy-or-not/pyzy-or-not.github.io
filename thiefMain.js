// Edit your script here
window.onload = onPageLoaded;
var textElement = null;
var optionButtonsElement = null;

function onPageLoaded() {
  textElement = document.getElementById("text");
  optionButtonsElement = document.getElementById('option-buttons')
  startGame();
}
let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)

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
      state = Object.assign(state, option.setState)
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
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
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}



const textNodes = [{
    id: 1,
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
    text: 'В туалете больше нет ничего ценного. Шорох из трубы кажется уже не таким подозрительным. ',
    options: [{
      text: 'Вернуться в прихожую',
      nextText: 2
    }]
  },
  {
    id: 5,
    text: 'Дядя медленно зашел в туалет. Медленно закрыл дверь. Медленно достал дробовик. И быстро распределил ваши внутренности по кафельной плитке.',
    options: [{
      text: 'КОНЕЦ.',
      nextText: -1
    }]
  },
  {
    id: 6,
    text: 'Вы в тупике. Вы гений.',
    options: [{
      text: 'Вспомнить лучшие моменты жизни',
      nextText: 5
    }]
  },
  {
    id: 7,
    text: 'Дядя медленно зашел на кухню. Медленно закрыл дверь. Медленно достал дробовик. И быстро распределил ваши внутренности по дверце холодильника.',
    options: [{
      text: 'КОНЕЦ.',
      nextText: -1
    }]
  },
  {
    id: 8,
    text: 'Вы не взяли во внимание, что дядя живет на 6ом этаже. Вы разбились и умерли.',
    options: [{
      text: 'КОНЕЦ.',
      nextText: -1
    }]
  },
  {
    id: 10,
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
        requiredState: (currentState) => currentState.rustyKey == true,
        nextText: 5 //tupikowyi_tualet
      },
      {
        text: 'Бросить в дядю золотым ключом и убежать в тулет ',
        requiredState: (currentState) => currentState.goldenKey == true,
        nextText: 5 //tupikowyi_tualet
      }
    ]
  }, {
    id: 19,
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
        nextText: 17 //tupikowyi_tualet
      }
    ]
  }, {
    id: 21, //KUCHNIA
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
    text: ' Заперто.',
    options: [{
      text: 'Отойти от холодильника',
      nextText: 21
    }]
  }, {
    id: 23,
    text: 'Заперто. Времени больше не осталось. Вы в тупике. ',
    options: [{
      text: 'Вспомнить лучшие моменты жизни',
      nextText: 7
    }]
  }, {
    id: 24,
    text: ' Пызы.'
  }, {
    id: 25,
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
