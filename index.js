import { encrypt, decrypt } from './crypto.js'
const textareaEl = document.querySelector('textarea')
const formEl = document.querySelector('form')
const submitEl = document.querySelector('input[type=submit]')
const passwordEl = document.querySelector('input[type=password]')
const errorEl = document.querySelector('.error')

const sep = '|=|'

const getMsg = (textareaValue) => {
  const splittedValue = textareaValue.split(sep)

  if (splittedValue.length === 3) {
    const [salt, iv, encryptedMsg] = splittedValue
    return { salt, iv, encryptedMsg }
  } else {
    return { clearMsg: textareaValue }
  }
}

const pauseButton = () => {
  submitEl.disabled = true
}

const unpauseButton = () => {
  submitEl.disabled = false
}

const switchButton = (encrypted) => {
  submitEl.disabled = false
  submitEl.value = encrypted ? 'decrypt' : 'encrypt'
}

let errorTimeout

const displayError = () => {
  errorEl.style.display = 'block'
  clearTimeout(errorTimeout)
  errorTimeout = setTimeout(() => {
    errorEl.style.display = ''
    unpauseButton()
  }, 2000)
}

const encryptOrDecrypt = () =>
  Promise.resolve()
    .then(() => {
      pauseButton()
      const passwordValue = passwordEl.value
      const msg = getMsg(textareaEl.value)

      if (msg.salt && msg.iv && msg.encryptedMsg) {
        return decrypt(passwordValue, msg.salt, msg.iv, msg.encryptedMsg).then(
          (msg) => {
            textareaEl.value = msg
            switchButton(false)
          }
        )
      } else {
        return encrypt(passwordValue, msg.clearMsg).then((encryptedMsg) => {
          const { content, salt, iv } = encryptedMsg
          textareaEl.value = salt + sep + iv + sep + content
          switchButton(true)
        })
      }
    })
    .catch((e) => {
      console.error(e)
      displayError()
    })

formEl.addEventListener(
  'submit',
  (e) => {
    e.stopPropagation()
    e.preventDefault()
    encryptOrDecrypt()
  },
  false
)

textareaEl.addEventListener(
  'keydown',
  (e) => {
    if (e.ctrlKey && e.key === 'Enter' && formEl.checkValidity()) {
      e.preventDefault()
      e.stopPropagation()
      encryptOrDecrypt()
    }
  },
  false
)

textareaEl.addEventListener(
  'keyup',
  () => {
    if (textareaEl.value === '') switchButton(false)
  },
  false
)

textareaEl.addEventListener(
  'paste',
  (e) => {
    const pastedText = (e.clipboardData || window.clipboardData).getData('text')
    const msg = getMsg(pastedText)
    switchButton(msg.encryptedMsg)
  },
  false
)
