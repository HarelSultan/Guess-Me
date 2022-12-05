'use strict'

const STORAGE_KEY = 'questDB'

var gQuestsTree
var gCurrQuest
var gPrevQuest = null

function createQuestsTree() {
  gQuestsTree = loadFromStorage(STORAGE_KEY)
  if (!gQuestsTree) {
    gQuestsTree = createQuest('Male?')
    gQuestsTree.yes = createQuest('Gandhi')
    gQuestsTree.no = createQuest('Margol')
  }
  gCurrQuest = gQuestsTree
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  // DONE: gCurrQuest global vars
  gCurrQuest = gCurrQuest[res]
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // DONE: Create and Connect the 2 Quests to the quetsions tree
  lastRes.no = createQuest(lastRes.txt)
  lastRes.txt = newQuestTxt
  lastRes.yes = createQuest(newGuessTxt)
  _saveQuestionsToStorage()
}

function getCurrQuest() {
  return gCurrQuest
}

function _saveQuestionsToStorage() {
  saveToStorage(STORAGE_KEY, gQuestsTree)
}
