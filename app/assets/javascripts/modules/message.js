$(function(){
  function buildHTML(message){
    if ( message.image ){
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

  $('.new-message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.message-list').append(html);
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      $('.new-message')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('.submit-btn').prop("disabled", false)
    });
  });
});