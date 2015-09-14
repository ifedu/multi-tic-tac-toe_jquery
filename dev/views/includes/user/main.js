$('[play]').on('click', () => {
    const dataUser = {
        user: $('[user-val]').val()
    }

    $.post('http://127.0.0.1:80/multi-tic-tac-toe_php/index.php?code=challenge-checkUser', dataUser, (data) => {
        data = JSON.parse(data)

        if (data.user === true) {
            const X = $('.name-user').text()
            const O = dataUser.user

            window.MTTT.pushed = false

            $('.playerX').text(`X - ${X}`)
            $('.playerO').text(`${O} - O`)

            $('.user').addClass('view-none')
            $('.scenario').removeClass('view-none')
        } else {
            $('.challenge-user').removeClass('view-hidden')
        }
    })
})

$('#iframe-upload').on('load', () => {
    let src = $('[type="file"]').val()
    src = src.split('\\').pop()

    let user = $('.login input').val()
    src = `assets/${user}/${src}`

    $('.img-upload')
    .attr('src', `${src}`)
    .removeClass('view-hidden')

    window.MTTT.x = src
})