'use strict'

// NOTE: This is a global used only in the controller
var gLastQuest = null
$(document).ready(init)

function init() {
  $('.btn-start').click(onStartGuessing)
  $('.btn-yes').click({ ans: 'yes' }, onUserResponse)
  $('.btn-no').click({ ans: 'no' }, onUserResponse)
  $('.btn-add-guess').click(onAddGuess)

  $('.home-link').click(function () {
    window.location.replace("http://127.0.0.1:5501/index.html")
  })
  $('.about-link').click(function () {
    window.location.replace("http://127.0.0.1:5501/about.html")
  })
  $('.contact-link').click(function () {
    window.location.replace("http://127.0.0.1:5501/contact.html")
  })

  $('.win-modal').children().click(function () {
    onCloseModal('win')
  })
  $('.lose-modal').children().click(function () {
    onCloseModal('lose')
  })

  createQuestsTree()
}

function onStartGuessing() {
  // DONE: hide the game-start section
  $('.game-start').hide()
  // DONE: show the quest section
  renderQuest()
  $('.quest').show()
}

function renderQuest() {
  // DONE: select the <h2> inside quest and update
  // its text by the currQuest text
  $('.quest-txt').text(`${getCurrQuest().txt}`)
}

function onUserResponse(ev) {
  var res = ev.data.ans
  // If this node has no children
  if (isChildless(getCurrQuest())) {

    if (res === 'yes') {
      // TODO: improve UX
      $('.win-modal').show()
      $('.quest').hide()
      $('.game-start').show()
      gLastQuest = null
      onRestartGame()
    } else {
      $('.lose-modal').show()
      // DONE: hide and show new-quest section
      // TODO: update the lastQuest global var
      if (res === 'no') gLastQuest = getCurrQuest()
      $('.quest').hide()
      $('.new-quest').show()
    }

  } else {
    moveToNextQuest(res)
    renderQuest()
  }
}

function onAddGuess(ev) {
  // DONE: Get the inputs' values
  // DONE: Call the service addGuess
  ev.preventDefault()
  var $newGuess = $('#newGuess')
  var $newQuest = $('#newQuest')
  addGuess($newQuest.val(), $newGuess.val(), gLastQuest)
  $newGuess.val('')
  $newQuest.val('')
  onRestartGame()
}

function onRestartGame() {
  $('.new-quest').hide()
  $('.game-start').show()
  gLastQuest = null
  createQuestsTree()
}

function onCloseModal(gameState) {
  $(`.${gameState}-modal`).hide()
}

// .home-link - should send href to home page
// .contact-link - should send href to contact us page
// .about-link - should send href to about page
// .win-modal - should get display block when guessed right
// .close-win-modal - should close .win-modal