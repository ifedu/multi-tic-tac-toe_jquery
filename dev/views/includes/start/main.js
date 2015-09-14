window.MTTT = {
    o: 'assets/o.png',
    x: 'assets/x.png'
}

const actionsUser = {
    check(dataUser) {
        $('.load').removeClass('view-none')

        $.ajax({
            data: dataUser,
            dataType: 'jsonp',
            url: 'http://127.0.0.1:80/multi-tic-tac-toe_php/index.php',

            success(data) {
                sessionStorage.setItem('user', dataUser.user)
                sessionStorage.setItem('pass', dataUser.pass)

                actionsUser[data.action](data)

                $('[name="user"]').val(dataUser.user)
                $('.name-user').text(dataUser.user)

                $('.load').addClass('view-none')
            }
        })
    },

    insert() {
        $('.modal').removeClass('view-none')
    },

    login(data) {
        if (data.login === 'ok') {
            $('.start').addClass('view-none')
            $('.user').removeClass('view-none')
        } else {
            $('.notice')
            .removeClass('view-none')
            .text('Password incorrecto')
        }

        if (data.img !== '') {
            $('.img-upload')
            .attr('src', `http://127.0.0.1:80/multi-tic-tac-toe_php/${data.img}`)
            .removeClass('view-hidden')
        }
    }
}

// LOGIN
$('[login]').on('click', () => {
    if ($('.login input').val() === '' || $('.pass input').val() === '') {
        $('.notice')
        .removeClass('view-none')
        .text('Rellena los campos')

        return
    }

    actionsUser.check({
        code: 'checkUser',
        pass: $('.pass input').val(),
        user: $('.login input').val()
    })
})

// MODAL
$('.confirm').on('click', () => {
    actionsUser.check({
        code: 'insert',
        pass: $('.pass input').val(),
        user: $('.login input').val()
    })
})

$('.close').on('click', () => {
    $('.modal').addClass('view-none')
})

if (sessionStorage.getItem('user') !== null) {
    $('.login input').val(sessionStorage.getItem('user'))
    $('.pass input').val(sessionStorage.getItem('pass'))

    $('[login]').trigger('click')
}