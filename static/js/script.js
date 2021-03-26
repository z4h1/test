function ajaxRequest(_url, _formElem, isJSON, _cb, _err){
    var sendData, toSend;
    if(typeof(_formElem.tagName) == 'undefined'){
        sendData = new FormData();
        for(let f in _formElem) sendData.append(f, _formElem[f]);
    }
    else sendData = new FormData(_formElem);
    toSend = { url:  _url, type: "POST", data: sendData, contentType: false, processData: false, xhrFields: {withCredentials: true } };
    if(isJSON == true) { toSend['contentType'] = "application/json; charset=utf-8"; toSend['dataType'] = "json"; toSend['data'] = JSON.stringify(_formElem);}
    $.ajax(toSend).done(function(_data){ (typeof(_cb) == 'function') ? _cb(_data) : console.log(_url, ' SUCCESS ', _data); $el_loader.hide(); })
        .fail(function(data){ (typeof(_err) == 'function') ? _err(data) :  console.log(_url, ' FAILED ', data); $el_loader.hide(); });
}

var $el_loader = $('#loader').hide();

var toDoList = {
    check: function(e){
       if(['li','span'].indexOf(e.target.tagName.toLowerCase()) > -1){
           let item = e.target.tagName.toLowerCase() == 'span' ? e.target.parentNode : e.target, isDone = item.getAttribute('data-done') == 'true';
           ajaxRequest('toDoList/update', { id: item.getAttribute('data-id'), done: !isDone }, true, function(){
              $(item).attr('data-done', !isDone).insertBefore($('#toDoList li[data-done="' + !isDone + '"]').eq(0) || $('#toDoList li:' + (!isDone ? 'eq(0)' : 'last-of-type')));
           });
       }
    },
    add: function(){
        let newItem = window.prompt("new item","stuff to do..");
        if(newItem != null) ajaxRequest('toDoList/add', { text: encodeURIComponent(newItem) }, true, this.view);
    },
    remove: function(el){
        let item = el.parentNode, list = document.getElementById('toDoList');
        ajaxRequest('toDoList/remove', { id: item.getAttribute('data-id') }, true, function(){
            $(item).remove();
            if(list.children.length == 0) list.innerHTML = '<li class="empty">no items</li>';
        });
    },
    view: function(){
        ajaxRequest('toDoList/view', {}, true, function(data){
            let addItem, list = document.getElementById('toDoList'), items = data.data;
            if(items.length > 0) $('.empty').remove();
            else if(items.length == 0 && document.querySelector('.empty') == null) list.innerHTML = '<li class="empty">no items</li>';

            for(let i in items){
                if(document.querySelector('[data-id="' + items[i]['id'] +'"]') == null){
                    addItem = document.createElement('li');
                    addItem.innerHTML = '<span>' + decodeURIComponent(items[i]['text']) + '</span><button onclick="toDoList.remove(this)">✕</button>';
                    addItem.setAttribute('data-id', items[i]['id']);
                    addItem.setAttribute('data-done', 'false');
                    addItem.setAttribute('onclick', 'toDoList.check(event)');
                    list.appendChild(addItem);
                }
            }
        });
    }
};

document.querySelector('#toDoListActions button').addEventListener('click', function (e) {
   toDoList[e.target.getAttribute('data-action')](e.target);
});