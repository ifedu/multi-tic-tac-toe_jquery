$('[play]').on('click', () => {
    $('.user').addClass('view-none')
    $('.scenario').removeClass('view-none')
})

$('[type="submit"]').on('click', () => {
    let src = $('[type="file"]').val()
    src = src.split('\\').pop()
    let user = $('.login input').val()
    src = `assets/${user}/${src}`

    $('.img-upload')
    .attr('src', src)
    .removeClass('view-hidden')
})