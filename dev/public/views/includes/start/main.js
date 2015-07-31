$('[login]').on('click', () => {
    const VALUE_LOGIN = $('.login input').val()
    const VALUE_PASS = $('.pass input').val()

    if (VALUE_LOGIN !== '' && VALUE_PASS !== '') {
        $('.load').removeClass('view-none')

        const DATA = {
            pass: VALUE_PASS,
            user: VALUE_LOGIN
        }

        $.post('http://127.0.0.1:80/multi-tic-tac-toe_php/?code=checkUser', DATA, (data) => {
            $('[name="user"]').val(VALUE_LOGIN)

            switch (data) {
                case 'login':
                    $('.start').addClass('view-none')
                    $('.user').removeClass('view-none')

                    break;

                case 'insert':
                    $('.modal').removeClass('view-none')

                    break;
            }

            $('.load').addClass('view-none')
        })
    }
})

$('.close').on('click', () => {
    $('.modal').addClass('view-none')
})

$('.confirm').on('click', () => {
    $('.load').removeClass('view-none')

    const VALUE_LOGIN = $('.login input').val()
    const VALUE_PASS = $('.pass input').val()

    const DATA = {
        pass: VALUE_PASS,
        user: VALUE_LOGIN
    }

    $.post('http://127.0.0.1:80/multi-tic-tac-toe_php/?code=insert', DATA, (data) => {
        $('.start').addClass('view-none')
        $('.user').removeClass('view-none')

        $('.modal').addClass('view-none')
        $('.load').addClass('view-none')
    })
})