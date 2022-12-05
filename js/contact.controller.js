'use strict'

$(document).ready(init)


function init() {
    console.log('hey')
    $('.call-btn').click(function () {
        $('.call-modal').show()
    })
    $('.call-modal').children().click(function () {

        $('.call-modal').hide()
    })

}