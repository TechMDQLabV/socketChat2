var params = new URLSearchParams(window.location.search);

const name = params.get('name');
const room = params.get('room');

var divUsers = $('#divUsers');
var formSend = $('#formSend');
var txtMsg = $('#txtMsg');
var divChatbox = $('#divChatbox');

function renderUsers( persons ) {
    console.log(persons);
    var html = '';
    html += '<li>';
    html +=     '<a href="javascript:void(0)" class="active"> Chat de <span> '+ params.get('room') +'</span></a>';
    html += '</li>';

    for(var i = 0; i<persons.length; i++){
        html += '<li>';
        html +=     '<a data-id="'+persons[i].id+'" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>'+ persons[i].name +'<small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsers.html(html); 
}

function renderMsgs(data, me){
    var html = '';
    var date = new Date(data.date);
    var hour = date.getHours() + ':' + date.getMinutes();
    var adminClass = 'info';
    if(data.name === 'Administrator'){
        adminClass = 'danger';
    }

    if( me ){
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>'+ data.name +'</h5>';
        html += '        <div class="box bg-light-inverse">'+ data.msg +'</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">'+ hour +'</div>';
        html += '</li>';
    }else{
        html += '<li class="animated fadeIn">';
        if( data.name !== 'Administrator' ){
            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html += '    <div class="chat-content">';
        html += '        <h5>'+ data.name +'</h5>';
        html += '        <div class="box bg-light-'+ adminClass +'">'+ data.msg +'</div>';
        html += '    </div>';
        html += '    <div class="chat-time">'+ hour +'</div>';
        html += '</li>';
    }

    divChatbox.append(html);
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

divUsers.on('click', 'a', function(){
    var id = $(this).data('id');
    if( id ){

    }
});

formSend.on('submit', function(e){
    e.preventDefault();
    if(txtMsg.val().trim().length === 0 ){
        return;
    }
    socket.emit('createMsg', {
        name: name,
        msg: txtMsg.val()
    }, function(msg) {
        txtMsg.val('').focus();
        renderMsgs(msg, true);
        scrollBottom();
    });
});
