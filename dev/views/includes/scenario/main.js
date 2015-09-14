$('[config]').on('click', () => {
    $('.scenario').addClass('view-none')
    $('.user').removeClass('view-none')
})


// const NUM = $('.row').length
// let end = false

// // CHECK WIN
// const checkWin = (type, attr, val) => {
//     const $pushed = $(`.pushed[pushed='${type}'][${attr}='${val}']`)

//     if ($pushed.length === NUM) {
//         $('.column').addClass('lost')
//         $pushed.addClass('win')

//         end = true
//     }
// }

let select = 'x'

const markSquare = ($this) => {
    if ($(this).hasClass('pushed') === false && window.MTTT.pushed === false) {
        $this
        .addClass(`pushed border-${select}`)
        .attr('pushed', select)

        $this.children()
        .attr('src', img[select])
        .removeClass('view-none')

        select = (select === 'x') ? 'o' : 'x'

        window.MTTT.pushed = true
    }
}

$('.column').on('mousedown', function () {
    // if (end === false) {
        // return
    // }
    // PUSHED
    markSquare($(this))

    //     // CHECK WINNER
    //     let x = 0
    //     let y = 0

    //     checkWin('x', 'is-diagonal', 'true')
    //     checkWin('o', 'is-diagonal', 'true')

    //     checkWin('x', 'is-reverse-diagonal', 'true')
    //     checkWin('o', 'is-reverse-diagonal', 'true')

    //     $('.row').each(function (i) {
    //         checkWin('x', 'column-num', i)
    //         checkWin('o', 'column-num', i)

    //         checkWin('x', 'row-num', i)
    //         checkWin('o', 'row-num', i)
    //     })
})

// // CAMBIA IMG X
// $('.playerX').children().on('change', function() {
//     img.x = $(this).val()

//     $('[pushed="x"]').children().attr('src', img.x)
// })

// // CAMBIA IMG O
// $('.playerO').children().on('change', function() {
//     img.o = $(this).val()

//     $('[pushed="o"]').children().attr('src', img.o)
// })