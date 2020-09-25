const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

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

  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
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

function changeState(textNode) {}


const textNodes = [{
      id: 1,
      text: 'Вы вор Владислав. Вы забрались в квартиру своего дяди в шабанах и стоите в прихожей.',
      setState: {
        prihod: true
      },
      options: [{
          text: 'Осмотреться',
          nextText:
        },
        {
          text: 'Зал',
          nextText:
        },
        {
          text: 'Туалет',
          nextText:
        }
      ]
    },
    {
      id: 2,
      text: 'Вы все еще вор Владислав и стоите в прихожей своего дяди. В шабанах.',
      options: [{
          text: 'Осмотреться',
          nextText:
        },
        {
          text: 'Зал',
          nextText:
        },
        {
          text: 'Туалет',
          nextText:
        }
      ]
    },
    {
      id: 3,
      text: 'Перестань осматриваться, действуй.',
      options: [{
          text: 'Пойти в туалет',
          nextText:
        },
        {
          text: 'Пойти в зал',
          nextText:
        }
      ]
    },
    {
      id: 4,
      text: 'Только вы приблизились к двери, как услышали за ней подозрительный шорох. Возможно это ваш дядя и если он вас увидит, то вам несдобровать.',
      options: [{
          text: 'Рискнуть и зайти в туалет',
          setState: {
            goldenKey: true,
            checkWC: true
          },
          nextText:
        },
        {
          text: 'Вернуться в прихожую',
          nextText: 2
        }
      ]
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
      id: 9,
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
        makeBed: 1
      },
      options: [{
          text: 'Отойти от постели',
          nextText: //zal tut nado
        },
        {
          text: 'Расстелить обратно',
          nextText: //rasstilka posteli
        }
      ]
    }, {
      id: 11,
      text: 'Молодец. Вы застелили дядину постель. А на полу нашли ржавый ключ.',
      setState: {
        rustyKey: true,
        makeBed: 1
      },
      options: [{
          text: 'Отойти от постели',
          nextText: //zal tut nado
        },
        {
          text: 'Расстелить обратно',
          nextText: //rasstilka posteli
        }
      }

    ]
  },
  {
    id: 12,
    text: 'Вы тихо зашли в зал. Окна завешаны. Постель не заправлена. Дяди нет.',
    options: [{
        text: 'Пойти на кухню',
        nextText:
      },
      {
        text: 'Застелить постель',
        nextText:
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
        nextText:
      },
      {
        text: 'Бегом на кухню',
        nextText:
      }
    ]
  }, {
    id: 14,
    text: 'Вы тихо зашли в зал. Окна завешаны. Постель заправлена. Дяди нет.',
    options: [{
      text: 'Пойти на кухню',
      nextText:
    }, {
      text: 'Расстелить постель',
      nextText:
    }, {
      text: 'Вернуться в прихожую',
      nextText: 2
    }]
  }, {
    id: 15,
    text: 'Вы вернули постель в прежнее состояние. ',
    setState: {
      makeBed: 0
    }
    options: [{
        text: 'Снова застелить постель',
        nextText: //zastilka posteil fatal
      },
      {
        text: 'Отойти от постели',
        nextText: //zal
      }
    ]
  }, {
    id: 16,
    text: 'Только вы подровнаяли уголки одеяла, как вдруг услышали шум из прихожей. ',
    options: [{
        text: 'Выпрыгнуть в окно',
        nextText:
      },
      {
        text: 'Бегом в прихожую',
        nextText:
      }
    ]
  }, {
    id: 17,
    text: 'Теперь он вас точно заметил. Браво!',
    options: [{
        text: 'Убежать в зал',
        nextText: //zal
      },
      {
        text: 'Убежать в туалет',
        nextText: //tupikowyi_tualet
      },
      {
        text: 'Бросить в дядю ржавым ключом и убежать в тулет',
        requiredState: (currentState) => currentState.rustyKey,
        nextText: //tupikowyi_tualet
      },
      {
        text: 'Бросить в дядю золотым ключом и убежать в тулет ',
        requiredState: (currentState) => currentState.goldenKey,
        nextText: //tupikowyi_tualet
      }
    ]
  }
]

startGame()
