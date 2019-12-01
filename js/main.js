const colors = ['#FBD600', '#F43807', '#000000', '#875F00', '#1063E6', '#258117']
var current_height = $('.card_back').height()
var col_pair = []
var rotated_col_list = []

// $(document).ready( function(){
//     $('#start').attr('disabled', false)
// })

$(window).resize( function(){
    current_height = $('.card_back').height()
    $('.card_back, .card_front').css('line-height', current_height + "px")
    // console.log(current_height)
}) // for line height

function get_child_random_num() {
    let radonm_num = Math.round(Math.random()*11) + 1
    return radonm_num
}

function random_child_list() {
    let child_list = []
    while (child_list.length < 12) {
        let random_num = get_child_random_num()
        if (child_list.includes(random_num) == false) {
            child_list.push(random_num)
        }
    }
    return child_list
}

function col_to_random_card() {
    let child_list = random_child_list()
    for (i = 0; i < colors.length; i++) {
        let i_child_1 = i * 2
        let i_child_2 = i * 2 + 1
        let nth_1 = child_list[i_child_1]
        let nth_2 = child_list[i_child_2]
        let card_child_nth_1 = '.card:nth-child(' + nth_1 + ') .card_inner .card_back'
        let card_child_nth_2 = '.card:nth-child(' + nth_2 + ') .card_inner .card_back'
        $(card_child_nth_1).css('background-color', colors[i])
        $(card_child_nth_2).css('background-color', colors[i])
        // console.log(nth_1, nth_2)
    }
    // console.log('new col')
}

function test_two_col() {
    if (col_pair.length == 2) {
        if (col_pair[0] != col_pair[1]) {
            let time = 1
            let x = setInterval( function() {
                time -= 1
                if (time < 0) {                
                    clearInterval(x)
                    $('.card_inner').filter( function(){
                        let bg_col = $(this).find('.card_back').css('background-color')
                        return bg_col === col_pair[0]
                    }).css({
                        'transform': 'none',
                    })
                    $('.card_inner').filter( function(){
                        let bg_col = $(this).find('.card_back').css('background-color')
                        return bg_col === col_pair[1]
                    }).css({
                        'transform': 'none',
                    })
                }
            }, 600)
            let y = setInterval( function() {
                time -= 1
                if (time < 0) {                
                    clearInterval(y)
                    col_pair = []
                    $('.card_front').attr('disabled', false)
                    // console.log('reset')
                }
            }, 1800)
        } else if ((col_pair[0] == col_pair[1])){
            let time_3 = 1
            let z = setInterval( function() {
                time_3 -= 1
                if (time_3 < 0) {                
                    clearInterval(z)
                    col_pair = []
                    $('.card_front').attr('disabled', false)
                    // console.log('reset')
                }
            }, 1000)
            rotated_col_list.push(col_pair[0])
            $('.card_inner').filter( function(){
                let bg_col = $(this).find('.card_back').css('background-color')
                return bg_col === col_pair[0]
            }).find('img').css({
                'visibility': 'visible',
            })
            $('.card_inner').filter( function(){
                let bg_col = $(this).find('.card_back').css('background-color')
                return bg_col === col_pair[0]
            }).find('.card_back').css({
                'box-shadow': '0px 2px 6px rgb(0, 0, 0, 0%)',
            })
            // console.log(rotated_col_list)
        }
    }
}

function test_all_card() {
    if (rotated_col_list.length == 6) {
        rotated_col_list = []
        let time = 1
        let x = setInterval( function() {
            time -= 1
            if (time < 0) {                
                clearInterval(x)
                $('#title').html('Pika Pika!')
                $('#description').html('You found all the Pikachus. Great job!')
                $('#title').css({
                    'text-shadow': '2px 2px 0px #FBD600',
                    'font-size': '32px'
                })
            }
        }, 800)
        // console.log('all turned')
    } else {
        // pass
        // console.log('not yet')
    }
}

function test_disable(i) {
    if ($(i).attr('disabled') == 'disabled') {
        return true
    } else {
        return false
    }
}

$('.card_front').mousedown( function(){    
    switch (event.which) {
        case 1:
            if (col_pair.length < 2 && !($('#start').attr('disabled'))) {
                $(this).css('background-color', '#f2f2f2')
            }    
            break;
        case 2:
            break;
        case 3:
            break;
        default:
            break;
    }
})

$('.card_front').mouseup( function(){
    switch (event.which) {
        case 1:
            if (col_pair.length < 2 && !($('#start').attr('disabled'))) {
                $(this).css('background-color', '#fff')
            }        
            break;
        case 2:
            break;
        case 3:
            break;
        default:
            break;
    }
})

$('.card_front').hover( function(){
    if (col_pair.length < 2 && !($('#start').attr('disabled'))) {
        $(this).css({
            'border': '2px solid #FBD600',
            'box-shadow': '0px 2px 10px rgb(0, 0, 0, 15%)',
        })
        $(this).find('p').css({
            'opacity': '100%'
        })
    }
}, function(){
    if (col_pair.length < 2 && !($('#start').attr('disabled'))) {
        $(this).css({
            'border': '2px solid #e6e6e6',
            'box-shadow': '0px 2px 10px rgb(0, 0, 0, 0%)',
        })
        $(this).find('p').css({
            'opacity': '50%'
        })
    }
})

$('.card_front').on('mousemove', function(){
    if (col_pair.length < 2 && !($('#start').attr('disabled'))) {
        $(this).css({
            'border': '2px solid #FBD600',
            'box-shadow': '0px 2px 10px rgb(0, 0, 0, 15%)',
        })
        $(this).find('p').css({
            'opacity': '100%'
        })
    }
})

$('.card').hover( function(){
    $(this).css({
        'cursor': 'pointer'
    })
})

$('.card_back').hover( function(){
    $(this).css({
        'cursor': 'auto'
    })
})

$('#start').hover( function(){    
    $(this).css({
        'background-color': '#D69700',
        'cursor': 'pointer',
        'box-shadow': '0px 2px 4px rgb(0, 0, 0, 35%)'
    })
}, function(){
    $(this).css({
        'background-color': '#FBD600',
        'cursor': 'pointer',
        'box-shadow': '0px 2px 4px rgb(0, 0, 0, 0%)'
    })
})

$('#start').mousedown( function(){
    switch (event.which) {
        case 1:
            $(this).css({
                'background-color': '#875F00',
            })
            break;
        case 2:
            break;
        case 3:
            break;
        default:
            break;
    }
})

$('#start').mouseup( function(){
    switch (event.which) {
        case 1:
            $(this).css('background-color', '#FBD600')
            break;
        case 2:
            break;
        case 3:
            break;
        default:
            break;
    }
})


$('.card_front').click( function(){
    if ((col_pair.length < 2) && !($('#start').attr('disabled'))) {
        $(this).css({
            'border': '2px solid #e6e6e6',
            'box-shadow': '0px 2px 10px rgb(0, 0, 0, 0%)',
        })
        $(this).find('p').css({
            'opacity': '50%'
        })
        $(this).parent().css('transform', 'rotateY(180deg)')
        let click_back_col = $(this).parent().find('.card_back').css('background-color')
        col_pair.push(click_back_col)
        test_two_col()
        test_all_card()
    }
})

// start a new game start
$('#start').click( function(){
        col_pair = []
        rotated_col_list = []
        $(this).attr('disabled', true)
        $(this).css({
            'background-color': '#FBD600',
            'box-shadow': '0px 2px 4px rgb(0, 0, 0, 0%)'
        })
        if (test_disable('#start')) {
            $('#start').css('opacity', '40%')
        }
        $('#title').html('Pick Card Pick Card')
        $('#title').css({
            'text-shadow': 'none',
            'font-size': '24px'
        })
        $('#description').html("Click the Start button, remember cards' position, and pick the cards with same color until you find all the Pikachus.")
        $('#container').css('display', 'block')
        $('.card_inner').find('.card_back').css({
            'box-shadow': '0px 2px 6px rgb(0, 0, 0, 25%)',
        })
        $('.card_inner').css('transform', 'none')
        $('.card_inner').find('img').css({
            'visibility': 'hidden',
        })
        let time_1 = 1
        let x = setInterval( function() {
            time_1 -= 1
            if (time_1 < 0) {                
                clearInterval(x)
                col_to_random_card()
                // console.log('new col')
            }
        }, 200) // change color after the rotate complete
        let time_2 = 5
        let y = setInterval( function() {
            $('.card_inner').css('transform', 'rotateY(180deg)')
            // console.log('back')
            $('#countdown').css('opacity', '100')
            $('#sec').html(time_2)
            time_2 -= 1
            if (time_2 < 0) {                
                clearInterval(y)
                $('#start').attr('disabled', false)
                if (!(test_disable('#start'))) {
                    $('#start').css('opacity', '100%')
                }
                $('#countdown').css({
                    'opacity': '0',
                    '-webkit-transition-delay': '1s',
                    'transition-delay': '1s'
                })
                $('.card_inner').css({
                    'transform': 'none'
                })
                // console.log('front')
            }
        }, 1000)
        current_height = $('.card_back').height() // for line height
        $('.card_back, .card_front').css('line-height', current_height + "px")
    }
)
// start a new game end