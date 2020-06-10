$(function(){
  function buildHTML(message){
    if ( message.image) {
      let html = 
        `<div class="message-list__box">
            <div class="message-list__box__user" data-message-id=${message.id}>
              <div class="message-list__box__user__name">
                ${message.user_name}
              </div>
              <div class="message-list__box__user__time">
                ${message.created_at}
              </div>
            </div>
            <div class="message-list__box__message">
              <p class="message-list__box__message__content">
                ${message.content}
              </p>
              <img class="message-list__box__message__image" src="${message.image}">
            </div>
          </div>`
      return html;
    } else {
      let html =
      `<div class="message-list__box">
        <div class="message-list__box__user" data-message-id=${message.id}>
          <div class="message-list__box__user__name">
            ${message.user_name}
          </div>
          <div class="message-list__box__user__time">
            ${message.created_at}
          </div>
        </div>
        <div class="message-list__box__message">
          <p class="message-list__box__message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
      };
    }

    let reloadMessages = function(){
      let last_message_id = $('.message-list__box__user:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages){
        if (messages.length !== 0){
          let insertHTML = ''
          $.each(messages, function(i,message){
            insertHTML += buildHTML(message)
          });
          $('.message-list').append(insertHTML);
          $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
        }
      })
      .fail(function(){
        alert('error');
      });
    }
    setInterval(reloadMessages, 7000);
  });