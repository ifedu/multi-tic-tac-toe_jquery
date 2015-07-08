let select = 'X'

$('.column').on('mousedown', function () {
    $(this).text(select)

    select = (select === 'X') ? 'O' : 'X'
})